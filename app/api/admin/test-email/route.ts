import { NextResponse } from "next/server";
import { sendAdminAlertEmail } from "@/lib/email";

export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || "info@findingyourspotlight.com";

    const testLead = {
      id: "test-system-id",
      full_name: "Test Client Enquiry",
      email: "test.client@example.com",
      phone: "+27 82 123 4567",
      preferred_format: "1-on-1 Executive Coaching",
      message: "This is a test notification email dispatched from your Admin Portal System Status page.",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const success = await sendAdminAlertEmail(testLead);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to dispatch test email via Resend API." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      recipient: adminEmail,
    });
  } catch (err: any) {
    console.error("Test email route error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
