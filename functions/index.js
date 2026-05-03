const { onRequest } = require("firebase-functions/v2/https");

exports.sendBookingEmail = onRequest(
  { cors: true },
  async (req, res) => {

    // Handle CORS preflight
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      type,
      // Booking fields
      service, date, time, urgency,
      firstName, lastName, email, phone, pref,
      street, suburb, propState, postcode, notes, submittedAt,
      // Quote-only fields
      address,
    } = req.body;

    if (!firstName || !email || !service) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const isQuote = type === "quote";

    // Safe fallbacks — nothing ever renders as "undefined"
    const safeName = [firstName, lastName].filter(Boolean).join(" ") || "—";
    const safeService = service || "—";
    const safeDate = date || "—";
    const safeTime = time || "—";
    const safeUrgency = urgency || "—";
    const safePhone = phone || "—";
    const safePref = pref || "—";
    const safeAddress = address || [street, suburb, propState, postcode].filter(Boolean).join(", ") || "Not provided";
    const safeNotes = notes || "None";
    const safeSubmitted = submittedAt || new Date().toLocaleString("en-AU");
    const safeFullAddr = [street, suburb, propState, postcode].filter(Boolean).join(", ") + ", Australia";

    // ── QUOTE email template (blue) ──────────────────────────────────────
    const quoteHtmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:linear-gradient(135deg,#2B8FD4,#4AABDB);padding:24px 32px;border-radius:10px 10px 0 0">
          <h1 style="color:#fff;margin:0;font-size:1.3rem">&#x1F4AC; New Quote Request</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:.9rem">iLovah Cleaning &amp; Rest In Pest — Free Quote</p>
        </div>
        <div style="background:#f9f9f9;padding:24px 32px;border-radius:0 0 10px 10px;border:1px solid #e8e8e8;border-top:none">

          <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:.87rem;color:#856404">
            &#x26A1; This is a <strong>quote request only</strong> — no booking confirmed yet. Please respond within 1 hour.
          </div>

          <h3 style="color:#2B8FD4;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Service Requested</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Service</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeService}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Property Address</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeAddress}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Additional Notes</td><td style="padding:10px 14px;font-size:.88rem">${safeNotes}</td></tr>
          </table>

          <h3 style="color:#2B8FD4;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Contact Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Name</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeName}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Email</td><td style="padding:10px 14px;font-size:.88rem"><a href="mailto:${email}" style="color:#2B8FD4;font-weight:600">${email}</a></td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Phone</td><td style="padding:10px 14px;font-size:.88rem"><a href="tel:${safePhone}" style="color:#2B8FD4;font-weight:600">${safePhone}</a></td></tr>
          </table>

          <div style="background:#e8f4fd;border-radius:8px;padding:14px 16px;margin-bottom:20px;font-size:.87rem;color:#1a5276">
            &#x1F4A1; <strong>Next step:</strong> Call/SMS <a href="tel:${safePhone}" style="color:#2B8FD4;font-weight:600">${safePhone}</a> or reply to <a href="mailto:${email}" style="color:#2B8FD4;font-weight:600">${email}</a> with a tailored quote.
          </div>

          <p style="font-size:.72rem;color:#bbb;margin:0;border-top:1px solid #ebebeb;padding-top:14px">
            Submitted: ${safeSubmitted} &middot; iLovah Cleaning Services &amp; Rest In Pest
          </p>
        </div>
      </div>
    `;

    // ── BOOKING email template (red) ──────────────────────────────────────
    const bookingHtmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#e8291c;padding:24px 32px;border-radius:10px 10px 0 0">
          <h1 style="color:#fff;margin:0;font-size:1.3rem">&#x1F4C5; New Booking Request</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:.9rem">iLovah Cleaning Services</p>
        </div>
        <div style="background:#f9f9f9;padding:24px 32px;border-radius:0 0 10px 10px;border:1px solid #e8e8e8;border-top:none">

          <div style="background:#fdecea;border:1px solid rgba(232,35,42,0.3);border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:.87rem;color:#b01018">
            &#x2705; <strong>Confirmed booking request</strong> — the customer selected a date and time. Please confirm within 2 hours.
          </div>

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Service Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Service</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeService}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Date</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeDate}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Time</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeTime}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Urgency</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeUrgency}</td></tr>
          </table>

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Contact Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Name</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeName}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Email</td><td style="padding:10px 14px;font-size:.88rem"><a href="mailto:${email}" style="color:#e8291c;font-weight:600">${email}</a></td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Phone</td><td style="padding:10px 14px;font-size:.88rem"><a href="tel:${safePhone}" style="color:#e8291c;font-weight:600">${safePhone}</a></td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Preferred contact</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safePref}</td></tr>
          </table>

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Property Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Address</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${safeFullAddr}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Notes</td><td style="padding:10px 14px;font-size:.88rem">${safeNotes}</td></tr>
          </table>

          <p style="font-size:.72rem;color:#bbb;margin:0;border-top:1px solid #ebebeb;padding-top:14px">
            Submitted: ${safeSubmitted} &middot; iLovah Cleaning Services
          </p>
        </div>
      </div>
    `;

    const htmlBody = isQuote ? quoteHtmlBody : bookingHtmlBody;
    const subject = isQuote
      ? `Quote Request - ${safeService} from ${firstName}`
      : `New Booking - ${safeService} on ${safeDate}`;

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "iLovah Booking System", email: "ilovahclean@gmail.com" },
          to: [{ email: "ilovahclean@gmail.com", name: "iLovah Cleaning Services" }],
          replyTo: { email: email, name: safeName },
          subject,
          htmlContent: htmlBody,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Brevo error:", JSON.stringify(err));
        console.error("Request type was:", type, "| Subject:", subject);
        return res.status(500).json({ error: "Failed to send email", detail: err });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Unexpected error:", err.message);
      return res.status(500).json({ error: "Unexpected server error" });
    }
  }
);