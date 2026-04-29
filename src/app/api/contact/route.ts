import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = (await request.json()) as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Nova Sigil <onboarding@resend.dev>",
    to: "hello@novasigil.com",
    replyTo: email,
    subject: `New inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
