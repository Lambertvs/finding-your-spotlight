import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { sendEbookReceiptEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const body = await request.json();
    const { token, amountInCents, ebookId, buyerEmail, buyerName } = body;

    if (!token || !ebookId || !buyerEmail) {
      return NextResponse.json(
        { error: "Missing required checkout parameters (token, ebookId, buyerEmail)." },
        { status: 400 }
      );
    }

    const yocoSecretKey = process.env.YOCO_SECRET_KEY;
    if (!yocoSecretKey) {
      return NextResponse.json(
        { error: "Yoco Secret Key is not configured on the server." },
        { status: 500 }
      );
    }

    // 1. Charge Yoco Token via Online Yoco Charges API
    const yocoRes = await fetch("https://online.yoco.com/v1/charges/", {
      method: "POST",
      headers: {
        "X-Auth-Secret-Key": yocoSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        amountInCents: amountInCents || 49000,
        currency: "ZAR",
      }),
    });

    const yocoData = await yocoRes.json();

    if (!yocoRes.ok || yocoData.errorType) {
      console.error("Yoco charge error:", yocoData);
      return NextResponse.json(
        { error: yocoData.errorMessage || yocoData.displayMessage || "Yoco card payment failed." },
        { status: 400 }
      );
    }

    // 2. Fetch eBook details from Supabase
    const { data: ebook } = await supabase
      .from("ebooks")
      .select("*")
      .eq("id", ebookId)
      .single();

    const ebookTitle = ebook?.title || "Finding Your Spotlight eBook";
    const filePath = ebook?.file_path || "pdfs/finding-your-spotlight.pdf";
    const amountZar = (Number(amountInCents || 49000) / 100).toFixed(2);

    // 3. Generate Signed 24-Hour Download Link from Supabase Storage (ebooks-private)
    const relativePath = filePath.startsWith("ebooks-private/")
      ? filePath.replace("ebooks-private/", "")
      : filePath;

    const { data: signedData } = await supabase.storage
      .from("ebooks-private")
      .createSignedUrl(relativePath, 86400); // 24 hours expiry

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const downloadUrl = signedData?.signedUrl || `${supabaseUrl}/storage/v1/object/public/ebooks-private/${relativePath}`;

    // 4. Save Order Record in Supabase
    const orderNumber = `FYS-${Math.floor(100000 + Math.random() * 900000)}`;
    await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        buyer_name: buyerName || "Customer",
        buyer_email: buyerEmail,
        ebook_id: ebookId,
        amount_zar: parseFloat(amountZar),
        payment_status: "completed",
        yoco_charge_id: yocoData.id || "yoco-live-charge",
      },
    ]);

    // 5. Send Client Receipt & Download Link via Resend
    await sendEbookReceiptEmail({
      buyerName: buyerName || "Valued Client",
      buyerEmail,
      ebookTitle,
      amountZar,
      downloadUrl,
      orderNumber,
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      downloadUrl,
      ebookTitle,
      amountZar,
      chargeId: yocoData.id,
    });
  } catch (err: any) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ error: err.message || "Internal checkout server error" }, { status: 500 });
  }
}
