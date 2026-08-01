/**
 * Finding Your Spotlight - Official HTML Email Templates
 * 100% Free of Beefree branding.
 * Includes official Facebook & Instagram social icons.
 */

type BookingEmailData = {
  fullName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  message?: string | null;
  submittedAt?: string;
};

// 1. Client Booking Confirmation HTML Email Template
export function getClientConfirmationEmailHtml(data: BookingEmailData): string {
  const formattedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-ZA");

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
	<title>Booking Confirmation - Finding Your Spotlight</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" type="text/css">
	<style>
		* { box-sizing: border-box; }
		body { margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; background-color: #ffffff; font-family: 'Inter', Helvetica, Arial, sans-serif; }
		a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
		#MessageViewBody a { color: inherit; text-decoration: none; }
		p { line-height: 1.6; margin: 0 0 12px 0; }
		@media (max-width: 720px) {
			.row-content { width: 100% !important; }
			.col-pad { padding: 24px 16px !important; }
		}
		@media (prefers-color-scheme: dark) {
			.email-card { background-color: #f5f5f7 !important; color: #040b22 !important; }
		}
	</style>
</head>
<body class="body" style="margin: 0; padding: 0; background-color: #ffffff;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; padding: 10px 5px 40px 5px; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td>
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tbody>
															<tr>
																<td class="column column-1 email-card" width="100%" style="font-weight: 400; text-align: left; background-color: #f5f5f7; vertical-align: middle; border-radius: 24px;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																		<tr>
																			<td class="col-pad" style="padding-bottom:32px;padding-left:32px;padding-right:32px;padding-top:40px;">
																				
																				<!-- Logo Block -->
																				<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td class="pad" style="width:100%;" align="center">
																							<div style="max-width: 160px;">
																								<a href="https://findingyourspotlight.com" target="_blank">
																									<img src="https://0a981888ea.imgdist.com/pub/bfra/dmqa1vfg/0w9/wa9/7lm/Finding%20Your%20Spotlight%20New%20Logo%20-%20blk%404x.png" style="display: block; height: auto; border: 0; width: 100%;" width="160" alt="Finding Your Spotlight Logo" title="Finding Your Spotlight™">
																								</a>
																							</div>
																						</td>
																					</tr>
																				</table>

																				<!-- Divider -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="padding-top:24px;padding-bottom:24px;" align="center">
																							<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																								<tr>
																									<td style="font-size: 1px; line-height: 1px; border-top: 1px solid #d9d9d9;"><span>&#8202;</span></td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>

																				<!-- Heading 1 -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="width:100%;padding-bottom:8px;" align="left">
																							<h1 style="margin: 0; color: #040b22; font-family: 'Inter', Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -1px; line-height: 1.2;">
																								Booking Request Received!
																							</h1>
																						</td>
																					</tr>
																				</table>

																				<!-- Intro Paragraph -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="padding-bottom: 16px;">
																							<div style="color:#4a4f5f; font-family:'Inter', Helvetica, sans-serif; font-size:16px; font-weight:400; line-height:1.6;">
																								<p style="margin: 0 0 8px 0;">Dear <strong>${data.fullName}</strong>,</p>
																								<p style="margin: 0;">Thank you for getting in touch with <strong>Finding Your Spotlight</strong>. We have received your request for a <strong>${data.serviceRequested}</strong>. Jennis will review your enquiry and reach out to you shortly to confirm session scheduling.</p>
																							</div>
																						</td>
																					</tr>
																				</table>

																				<!-- Divider -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="padding-top:16px;padding-bottom:24px;" align="center">
																							<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																								<tr>
																									<td style="font-size: 1px; line-height: 1px; border-top: 1px solid #d9d9d9;"><span>&#8202;</span></td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>

																				<!-- H3 Heading: Booking Summary -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="width:100%;padding-bottom:12px;" align="left">
																							<h3 style="margin: 0; color: #efb400; font-family: 'Inter', Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
																								Your Session Details
																							</h3>
																						</td>
																					</tr>
																				</table>

																				<!-- Summary Table -->
																				<table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e2e8; font-size: 14px; color: #333333; margin-bottom: 24px;">
																					<tr>
																						<td width="35%" style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Full Name:</td>
																						<td style="font-weight: 600; color: #040b22; border-bottom: 1px solid #eeeeee;">${data.fullName}</td>
																					</tr>
																					<tr>
																						<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Email Address:</td>
																						<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">${data.email}</td>
																					</tr>
																					<tr>
																						<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Phone Number:</td>
																						<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">${data.phone}</td>
																					</tr>
																					<tr>
																						<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Session Format:</td>
																						<td style="font-weight: 700; color: #efb400; border-bottom: 1px solid #eeeeee;">${data.serviceRequested}</td>
																					</tr>
																					<tr>
																						<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Submitted On:</td>
																						<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">${formattedDate}</td>
																					</tr>
																					<tr>
																						<td style="font-weight: 600; color: #666666; vertical-align: top;">Your Message:</td>
																						<td style="font-weight: 400; color: #444444; vertical-align: top; white-space: pre-wrap;">${data.message || "No message provided."}</td>
																					</tr>
																				</table>

																				<!-- Divider -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td style="padding-top:16px;padding-bottom:24px;" align="center">
																							<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																								<tr>
																									<td style="font-size: 1px; line-height: 1px; border-top: 1px solid #d9d9d9;"><span>&#8202;</span></td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>

																				<!-- Wordmark Footer -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td align="center" style="padding-top:12px;padding-bottom:8px;">
																							<div style="color:#040b22; font-family:'Inter', Helvetica, sans-serif; font-size:17px; font-weight:700;">
																								Finding Your Spotlight™
																							</div>
																						</td>
																					</tr>
																				</table>

																				<!-- Social Media Links (Facebook & Instagram) -->
																				<table class="social_block block-16" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
																					<tr>
																						<td align="center">
																							<table class="social-table" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display: inline-block;">
																								<tr>
																									<td style="padding:0 8px 0 0px;">
																										<a href="https://www.facebook.com/findingyourspotlight" target="_blank">
																											<img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" width="32" height="32" alt="Facebook" title="Facebook" style="display: block; border: 0;">
																										</a>
																									</td>
																									<td style="padding:0 0 0 8px;">
																										<a href="https://www.instagram.com/findingyourspotlight/" target="_blank">
																											<img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; border: 0;">
																										</a>
																									</td>
																								</tr>
																							</table>
																						</td>
																					</tr>
																				</table>

																				<!-- Confidentiality Note -->
																				<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
																					<tr>
																						<td align="center" style="padding-top:16px;">
																							<div style="color:#888888; font-family:'Inter', Helvetica, sans-serif; font-size:11px; font-weight:400; line-height:1.5; text-align:center;">
																								The contents of this email, and any attachments, are confidential. They are intended for the named recipient(s) only.
																							</div>
																						</td>
																					</tr>
																				</table>

																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>`;
}

// 2. Admin Alert HTML Email Template (Sent to Jennis with ALL fields)
export function getAdminAlertEmailHtml(data: BookingEmailData): string {
  const formattedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-ZA");

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
	<title>New Booking Request Alert</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" type="text/css">
	<style>
		* { box-sizing: border-box; }
		body { margin: 0; padding: 0; background-color: #ffffff; font-family: 'Inter', Helvetica, Arial, sans-serif; }
		p { line-height: 1.6; margin: 0 0 12px 0; }
	</style>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
		<tbody>
			<tr>
				<td>
					<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; padding: 10px 5px 40px 5px; width: 700px; margin: 0 auto;" width="700">
						<tbody>
							<tr>
								<td>
									<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
										<tbody>
											<tr>
												<td width="100%" style="font-weight: 400; text-align: left; background-color: #f5f5f7; vertical-align: middle; border-radius: 24px; padding: 40px 32px;">
													
													<!-- Logo Block -->
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
														<tr>
															<td align="center" style="padding-bottom: 24px;">
																<a href="https://findingyourspotlight.com" target="_blank">
																	<img src="https://0a981888ea.imgdist.com/pub/bfra/dmqa1vfg/0w9/wa9/7lm/Finding%20Your%20Spotlight%20New%20Logo%20-%20blk%404x.png" style="display: block; height: auto; border: 0; width: 160px;" width="160" alt="Logo">
																</a>
															</td>
														</tr>
													</table>

													<div style="border-top: 1px solid #d9d9d9; margin-bottom: 24px;"></div>

													<h1 style="margin: 0 0 8px 0; color: #040b22; font-size: 26px; font-weight: 700; text-align: left;">
														🔔 New Consultation Enquiry Received!
													</h1>
													<p style="margin: 0 0 24px 0; color: #4a4f5f; font-size: 15px;">
														A new client has submitted a booking request on the website. Here are the complete details:
													</p>

													<table width="100%" border="0" cellpadding="12" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e2e8; font-size: 14px; color: #333333; margin-bottom: 24px;">
														<tr>
															<td width="35%" style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Client Name:</td>
															<td style="font-weight: 700; color: #040b22; border-bottom: 1px solid #eeeeee;">${data.fullName}</td>
														</tr>
														<tr>
															<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Email Address:</td>
															<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">
																<a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
															</td>
														</tr>
														<tr>
															<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Phone Number:</td>
															<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">
																<a href="tel:${data.phone}" style="color: #0066cc; text-decoration: none;">${data.phone}</a>
															</td>
														</tr>
														<tr>
															<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Meeting Format:</td>
															<td style="font-weight: 700; color: #efb400; border-bottom: 1px solid #eeeeee;">${data.serviceRequested}</td>
														</tr>
														<tr>
															<td style="font-weight: 600; color: #666666; border-bottom: 1px solid #eeeeee;">Received At:</td>
															<td style="font-weight: 500; border-bottom: 1px solid #eeeeee;">${formattedDate}</td>
														</tr>
														<tr>
															<td style="font-weight: 600; color: #666666; vertical-align: top;">Client Message:</td>
															<td style="font-weight: 400; color: #444444; vertical-align: top; white-space: pre-wrap;">${data.message || "No message provided."}</td>
														</tr>
													</table>

													<div style="text-align: center; margin-bottom: 24px;">
														<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${data.fullName}, this is Jennis from Finding Your Spotlight.`)}" style="background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; font-size: 14px;">
															💬 Reply via WhatsApp
														</a>
													</div>

													<div style="border-top: 1px solid #d9d9d9; margin-bottom: 16px;"></div>
													<p style="margin: 0; color: #888888; font-size: 12px; text-align: center;">
														Admin Portal Alert — Finding Your Spotlight™
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>`;
}
