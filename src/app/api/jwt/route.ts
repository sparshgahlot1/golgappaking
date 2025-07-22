import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Redis } from "@upstash/redis";

// Your Google Apps Script Webhook URL:
const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbzVxNoLwmWqkwnEMByMqrqFlTzuiM_PhDg2shqkVaUn04unbKHKLAE9DOFxUBgXbejYCQ/exec"; // <--- Replace with your real URL

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile } = await req.json();
    if (!name || !email || !mobile) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const couponKey = `coupon:active:${email}`;
    const weekKey = `coupon:week:${email}`;

    // Step 1: Check if a not-redeemed coupon already exists for this email
    const existingCoupon = await redis.get<string>(couponKey);

    if (existingCoupon) {
      // User already has an active, not-redeemed coupon
      return NextResponse.json({ token: existingCoupon, alreadyIssued: true });
    }

    // Step 2: Generate JWT coupon token
    const payload = { name, email, mobile, ts: Date.now() };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10m" });

    // Step 3: Save the coupon as "active" (not yet redeemed) and set a 7-day lock
    await redis.set(couponKey, token, { ex: 60 * 60 * 24 * 7 }); // 7 days
    await redis.set(weekKey, "1", { ex: 60 * 60 * 24 * 7 });     // 7 days

    // Step 4: Send info to Google Sheets via webhook (fire and forget)
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          mobile,
          couponToken: token,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      // Optional: log the error but still issue the coupon
      console.error("Failed to save to Google Sheets:", e);
    }

    // Step 5: Return the new coupon
    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", detail: (err as Error).message },
      { status: 500 }
    );
  }
}
