"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: Readonly<CountdownTimerProps>) {
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
      <div className="text-center py-3" role="status">
        <p className="font-serif text-[#7A5E24] text-xl font-medium">
          ✨ The Joyous Day Has Arrived ✨
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 sm:gap-4"
      role="timer"
      aria-label={`Wedding Countdown: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
    >
      {units.map((unit, idx) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            {/* Box Container */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-wedding-card flex items-center justify-center border border-[#7A5E24]/35 shadow-md">
              <span className="font-serif text-[#2C251E] text-xl sm:text-2xl font-bold tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-1.5 text-[11px] text-[#594E3F] font-sans uppercase tracking-[0.2em] font-bold">
              {unit.label}
            </span>
          </div>

          {/* Dot Separator */}
          {idx < units.length - 1 && (
            <span className="text-[#7A5E24]/60 text-sm font-serif mb-4" aria-hidden="true">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
