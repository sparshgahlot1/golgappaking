import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const verify = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await verify.json();
  return NextResponse.json({ success: data.success });
}
