import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    const fullName = `${firstName} ${lastName}`.trim(); // avoid "undefined"

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${process.env.SENDER_EMAIL}>`, // shows sender name
      replyTo: email, // reply goes directly to user's email
      to: process.env.SENDER_EMAIL, // your own email inbox
      subject: `Portfolio Contact: ${subject || "No Subject"}`,
      text: `Name: ${fullName}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
