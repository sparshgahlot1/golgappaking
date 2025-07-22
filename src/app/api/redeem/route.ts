import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import jwt from "jsonwebtoken";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Strictly type the payload
interface CouponPayload {
  name: string;
  email: string;
  mobile: string;
  ts: number;
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as CouponPayload;
    const { email, ts } = data;

    // Prevent double-redeem using a unique key per coupon
    const couponKey = `coupon:redeemed:${email}:${ts}`;
    const alreadyUsed = await redis.get(couponKey);

    if (alreadyUsed) {
      return NextResponse.json({
        success: false,
        message: "Coupon already redeemed!",
        details: data,
      });
    }

    // Mark this coupon as redeemed (for auditing)
    await redis.set(couponKey, Date.now());

    // DELETE the active coupon key so it cannot be used again!
    await redis.del(`coupon:active:${email}`);

    return NextResponse.json({
      success: true,
      message: "Coupon valid & redeemed!",
      details: data,
    });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid or expired coupon!" });
  }
}
