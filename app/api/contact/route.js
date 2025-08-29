import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fromName, fromEmail, message } = body || {};

    if (!fromEmail || !message) {
      return NextResponse.json(
        { error: "Missing required fields: fromEmail and message" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || smtpUser;
    const fromDisplayName = process.env.CONTACT_FROM_NAME || "Portfolio Contact";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Server email is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `Portfolio Contact: ${fromName || "Visitor"}`;

    const text = [
      fromName ? `Name: ${fromName}` : null,
      `Email: ${fromEmail}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">New message from your portfolio</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${fromName || "-"}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${fromEmail}</p>
        <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${message}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: {
        name: fromDisplayName,
        address: smtpUser,
      },
      sender: smtpUser,
      replyTo: { name: fromName || "Visitor", address: fromEmail },
      to: toEmail,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/contact error", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

