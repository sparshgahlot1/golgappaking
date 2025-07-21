import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const key = `coupon:ratelimit:${email}`;
  const count = (await redis.incr(key)) as number;
  if (count === 1) await redis.expire(key, 600); // 10min
  if (count > 3) return NextResponse.json({ allowed: false });
  return NextResponse.json({ allowed: true });
}
