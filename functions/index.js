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
            service, date, time, urgency,
            firstName, lastName, email, phone, pref,
            street, suburb, propState, postcode, notes, submittedAt,
        } = req.body;

        if (!firstName || !email || !service) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        if (!BREVO_API_KEY) {
            return res.status(500).json({ error: "Missing API key" });
        }

        const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#e8291c;padding:24px 32px;border-radius:10px 10px 0 0">
          <h1 style="color:#fff;margin:0;font-size:1.3rem">New Booking Request</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:.9rem">iLovah Cleaning Services</p>
        </div>
        <div style="background:#f9f9f9;padding:24px 32px;border-radius:0 0 10px 10px;border:1px solid #e8e8e8;border-top:none">

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Service Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Service</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${service}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Date</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${date}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Time</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${time}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Urgency</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${urgency}</td></tr>
          </table>

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Contact Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Name</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${firstName} ${lastName}</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Email</td><td style="padding:10px 14px;font-size:.88rem"><a href="mailto:${email}" style="color:#e8291c;font-weight:600">${email}</a></td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Phone</td><td style="padding:10px 14px;font-size:.88rem"><a href="tel:${phone}" style="color:#e8291c;font-weight:600">${phone}</a></td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Preferred contact</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${pref}</td></tr>
          </table>

          <h3 style="color:#e8291c;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px">Property Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            <tr><td style="padding:10px 14px;color:#6b6b6b;width:38%;font-size:.88rem">Address</td><td style="padding:10px 14px;font-weight:600;font-size:.88rem">${street}, ${suburb} ${propState} ${postcode}, Australia</td></tr>
            <tr style="border-top:1px solid #f0f0f0"><td style="padding:10px 14px;color:#6b6b6b;font-size:.88rem">Notes</td><td style="padding:10px 14px;font-size:.88rem">${notes || "None"}</td></tr>
          </table>

          <p style="font-size:.72rem;color:#bbb;margin:0;border-top:1px solid #ebebeb;padding-top:14px">
            Submitted: ${submittedAt} &middot; iLovah Cleaning Services
          </p>
        </div>
      </div>
    `;

        try {
            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": BREVO_API_KEY,
                },
                body: JSON.stringify({
                    // ⚠️ sender email MUST be verified in your Brevo account
                    // Go to Brevo → Senders & IPs → Senders → add & verify your email
                    sender: { name: "iLovah Booking System", email: "ilovahcleaning@gmail.com" },
                    to: [{ email: "ilovahcleaning@gmail.com", name: "iLovah Cleaning Services" }],
                    replyTo: { email: email, name: `${firstName} ${lastName}` },
                    subject: `New Booking - ${service} on ${date}`,
                    htmlContent: htmlBody,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                console.error("Brevo error:", JSON.stringify(err));
                return res.status(500).json({ error: "Failed to send email", detail: err });
            }

            return res.status(200).json({ success: true });
        } catch (err) {
            console.error("Unexpected error:", err.message);
            return res.status(500).json({ error: "Unexpected server error" });
        }
    }
);