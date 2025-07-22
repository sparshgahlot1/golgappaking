import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// This function will be called when user tries to start the coupon flow
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // The keys we'll use
  const couponKey = `coupon:active:${email}`; // stores the current coupon JWT if not redeemed
  const weekKey = `coupon:week:${email}`; // just for blocking, set when a new coupon is created

  // Check for existing active coupon
  const activeCoupon = await redis.get<string>(couponKey);

  if (activeCoupon) {
    // If not redeemed, return it
    return NextResponse.json({
      allowed: false,
      reason: "active_coupon",
      coupon: activeCoupon,
    });
  }

  // If no active coupon, check if they are blocked by 7-day rule
  const blocked = await redis.get(weekKey);
  if (blocked) {
    return NextResponse.json({
      allowed: false,
      reason: "already_claimed",
    });
  }

  // If no active and not blocked, allow new coupon generation
  return NextResponse.json({ allowed: true });
}
