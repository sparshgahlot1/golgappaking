import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import jwt from "jsonwebtoken";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { email, mobile, ts } = data;
    const couponKey = `coupon:redeemed:${email}:${ts}`;
    const alreadyUsed = await redis.get(couponKey);

    if (alreadyUsed) {
      return NextResponse.json({
        success: false,
        message: "Coupon already redeemed!",
        details: data,
      });
    }

    await redis.set(couponKey, Date.now());
    return NextResponse.json({
      success: true,
      message: "Coupon valid & redeemed!",
      details: data,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Invalid or expired coupon!" });
  }
}
