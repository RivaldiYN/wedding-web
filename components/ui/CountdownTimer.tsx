"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  if (time.total <= 0) {
    return (
      <div className="text-center py-3">
        <p className="font-serif text-[#9E7B35] text-xl font-light">
          ✨ The Joyous Day Has Arrived ✨
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4" role="timer" aria-label="Wedding Countdown">
      {units.map((unit, idx) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            {/* Pill Container */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-wedding-card flex items-center justify-center border border-[#C5A869]/35 shadow-md">
              <span className="font-serif text-[#2C251E] text-xl sm:text-2xl font-normal tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-1.5 text-[10px] text-[#8E8272] font-sans uppercase tracking-[0.2em] font-medium">
              {unit.label}
            </span>
          </div>

          {/* Elegant Dot Separator */}
          {idx < units.length - 1 && (
            <span className="text-[#9E7B35]/40 text-sm font-serif mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
