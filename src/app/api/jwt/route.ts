import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Your Google Apps Script Webhook URL:
const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbzVxNoLwmWqkwnEMByMqrqFlTzuiM_PhDg2shqkVaUn04unbKHKLAE9DOFxUBgXbejYCQ/exec"; // <--- Replace with your real URL

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile } = await req.json();
    if (!name || !email || !mobile) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Generate JWT coupon token
    const payload = { name, email, mobile, ts: Date.now() };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "10m" });

    // Send info to Google Sheets via webhook
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

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", detail: (err as Error).message },
      { status: 500 }
    );
  }
}
