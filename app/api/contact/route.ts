import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBookingEmails } from "@/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, message, meeting_format } = body;

    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, Email, and Phone are required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name,
          email,
          phone,
          message: message || null,
          service_requested: meeting_format === "in-person" ? "In-Person Session" : "Online Strategy Session",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting lead into Supabase:", error);
      return NextResponse.json(
        { error: "Failed to submit booking enquiry. Please try again." },
        { status: 500 }
      );
    }

    const newLead = data?.[0];

    // Trigger automated HTML confirmation & admin alert emails
    if (newLead) {
      sendBookingEmails({
        fullName: newLead.full_name,
        email: newLead.email,
        phone: newLead.phone,
        serviceRequested: newLead.service_requested,
        message: newLead.message,
        submittedAt: newLead.created_at,
      }).catch((err) => console.error("Async email dispatch error:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Booking enquiry received successfully.",
      lead: newLead,
    });
  } catch (err) {
    console.error("API error in /api/contact:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
