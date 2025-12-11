import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, mobile, message, type } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

  console.info("Contact form submitted:", { name, email, mobile, type });

  // If SMTP is configured, try to send an email
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS && EMAIL_TO) {
    try {
      const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT || 587),
        secure: Number(EMAIL_PORT || 587) === 465,
        auth: { user: EMAIL_USER, pass: EMAIL_PASS }
      });

      const subject = `Website message from ${name} (${type || "contact"})`;
      const body = `Name: ${name}\nEmail: ${email}\nMobile: ${mobile || "N/A"}\n\nMessage:\n${message}`;

      await transporter.sendMail({
        from: `"Ani Website" <${EMAIL_USER}>`,
        to: EMAIL_TO,
        subject,
        text: body
      });

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Email error:", err);
      return res.status(500).json({ error: "Failed to send email" });
    }
  }

  // otherwise, just acknowledge
  return res.status(200).json({ ok: true, info: "No SMTP configured; data logged on server." });
}
