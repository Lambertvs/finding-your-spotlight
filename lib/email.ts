import {
  getClientConfirmationEmailHtml,
  getAdminAlertEmailHtml,
  getEbookReceiptEmailHtml,
} from "./email-templates";

type SendBookingEmailParams = {
  fullName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  message?: string | null;
  submittedAt?: string;
};

export async function sendBookingEmails(params: SendBookingEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "developer@findingyourspotlight.com";
  const fromEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";

  const clientHtml = getClientConfirmationEmailHtml(params);
  const adminHtml = getAdminAlertEmailHtml(params);

  if (resendApiKey) {
    try {
      // 1. Send confirmation email to Client (or test email)
      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Finding Your Spotlight <${fromEmail}>`,
          to: [params.email],
          subject: "Your Consultation Booking Confirmation — Finding Your Spotlight",
          html: clientHtml,
        }),
      });

      const clientData = await clientRes.json();
      if (!clientRes.ok) {
        console.warn("Resend client email notice:", clientData.message || clientData.name);
      } else {
        console.log("✅ Live Resend client confirmation sent:", clientData.id);
      }

      // 2. Send full alert email to Admin (Jennis / Developer)
      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `FYS Booking Alert <${fromEmail}>`,
          to: [adminEmail],
          subject: `🔔 New Booking Request from ${params.fullName}`,
          html: adminHtml,
        }),
      });

      const adminData = await adminRes.json();
      if (!adminRes.ok) {
        console.warn("Resend admin alert notice:", adminData.message || adminData.message);
      } else {
        console.log("✅ Live Resend admin alert sent:", adminData.id);
      }
    } catch (err) {
      console.error("Error sending emails via Resend:", err);
    }
  } else {
    console.log("ℹ️ RESEND_API_KEY not configured.");
  }
}

export async function sendEbookReceiptEmail(data: {
  buyerName: string;
  buyerEmail: string;
  ebookTitle: string;
  amountZar: string;
  downloadUrl: string;
  orderNumber: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";
  const html = getEbookReceiptEmailHtml(data);

  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Finding Your Spotlight <${fromEmail}>`,
          to: [data.buyerEmail],
          subject: `Order Receipt & Download: ${data.ebookTitle}`,
          html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log("✅ Live Resend eBook receipt sent:", resData.id);
      }
    } catch (err) {
      console.error("Error sending eBook receipt email:", err);
    }
  }
}

export async function sendAdminAlertEmail(leadData: any) {
  const params: SendBookingEmailParams = {
    fullName: leadData.full_name,
    email: leadData.email,
    phone: leadData.phone,
    serviceRequested: leadData.preferred_format,
    message: leadData.message,
    submittedAt: leadData.created_at,
  };

  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || "info@findingyourspotlight.com";
  const fromEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";
  const adminHtml = getAdminAlertEmailHtml(params);

  if (!resendApiKey) return false;

  try {
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `FYS System Alert <${fromEmail}>`,
        to: [adminEmail],
        subject: `🔔 Test Admin Alert: ${params.fullName}`,
        html: adminHtml,
      }),
    });

    return adminRes.ok;
  } catch (err) {
    console.error("Error sending admin alert email:", err);
    return false;
  }
}
