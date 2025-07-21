import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";

// 1. Setup Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 2. Setup Gmail SMTP via Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// 3. Handle OTP send (POST)
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis (expire in 5 min)
  await redis.setex(`coupon:otp:${email}`, 300, otp);

  // Send OTP to user via email
  await transporter.sendMail({
    from: `"GolGappaKing" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });

  // For debugging, you can uncomment the line below to see the OTP in your Vercel logs
  // console.log(`Sent OTP ${otp} to ${email}`);

  return NextResponse.json({ sent: true });
}

// 4. Handle OTP verify (PUT)
export async function PUT(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });

  // Fetch OTP from Redis
  const stored = await redis.get(`coupon:otp:${email}`);

  // Debug log
  console.log(`Verifying OTP for ${email}: input=${otp}, stored=${stored}`);

  // Always compare as strings
  const valid = stored && stored.toString() === otp.toString();

  if (valid) await redis.del(`coupon:otp:${email}`); // Invalidate OTP after use

  return NextResponse.json({ valid });
}
