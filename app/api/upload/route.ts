import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "ebooks-private";
    const folder = (formData.get("folder") as string) || "pdfs";

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const storagePath = `${folder}/${Date.now()}-${sanitizedFileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    const publicUrl = publicUrlData?.publicUrl || `${supabaseUrl}/storage/v1/object/public/${bucket}/${data.path}`;

    return NextResponse.json({
      success: true,
      filePath: `${bucket}/${data.path}`,
      publicUrl,
      fileName: file.name,
    });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
