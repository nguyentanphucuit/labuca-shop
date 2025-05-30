// /src/app/api/send-email/route.ts
// WARNING: Using NEXT_PUBLIC_ prefix for email credentials is not recommended for security reasons
// These credentials will be exposed to the client-side
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { to, subject, text, html } = await req.json();

  // Log environment variables (without password for security)
  console.log("Email user:", process.env.NEXT_PUBLIC_EMAIL_USER ? "Set" : "Not set");
  console.log("Email pass:", process.env.NEXT_PUBLIC_EMAIL_PASS ? "Set" : "Not set");

  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_PASS) {
    console.error("Email configuration missing. Please check your environment variables.");
    return NextResponse.json(
      {
        success: false,
        error: "Email configuration is missing. Please contact the administrator.",
        details: {
          userSet: !!process.env.NEXT_PUBLIC_EMAIL_USER,
          passSet: !!process.env.NEXT_PUBLIC_EMAIL_PASS,
        },
      },
      { status: 500 }
    );
  }

  // Validate required fields
  if (!to || !subject || !text) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: to, subject, or text",
        details: { to: !!to, subject: !!subject, text: !!text },
      },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
    debug: true, // Enable debug logging
  });

  try {
    console.log("Attempting to send email...");
    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    });
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("Email sending failed. Full error:", error);

    // Handle specific error cases
    if (error.code === "EAUTH") {
      return NextResponse.json(
        {
          success: false,
          error: "Email authentication failed. Please check your email credentials.",
          details: {
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again later.",
        details: {
          code: error.code,
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
}
