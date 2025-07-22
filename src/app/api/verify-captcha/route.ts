import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  const googleRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await googleRes.json();

  return NextResponse.json({
    success: data.success,
    score: data.score,
    action: data.action,
  });
}
