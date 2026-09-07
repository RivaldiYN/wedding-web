import { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitRecord>();

// Periodic cleanup of expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
  prefix?: string;
}

export function checkRateLimit(
  req: NextRequest,
  options: RateLimitOptions
): { success: boolean; remaining: number; resetTime: number } {
  const ip = getClientIp(req);
  const prefix = options.prefix || "global";
  const key = `${prefix}:${ip}`;
  const now = Date.now();

  const current = store.get(key);

  if (!current || now > current.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    store.set(key, newRecord);
    return {
      success: true,
      remaining: options.limit - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (current.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: current.resetTime,
    };
  }

  current.count += 1;
  return {
    success: true,
    remaining: options.limit - current.count,
    resetTime: current.resetTime,
  };
}
