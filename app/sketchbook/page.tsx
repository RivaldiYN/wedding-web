"use client";

import Link from "next/link";
import { MengToSketchbookLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export default function SketchbookPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#2b2721] flex flex-col items-center justify-center">
      {/* Floating Back Navigation Button */}
      <div className="fixed top-5 left-5 z-50">
        <Link
          href="/"
          className="btn-wedding-gold px-5 py-2.5 rounded-full text-xs font-sans font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
        >
          <span>←</span>
          <span>Back to Invitation</span>
        </Link>
      </div>

      <div className="w-full h-screen shader-frame">
        <MengToSketchbookLandingPage
          headingFont="instrument-serif"
          bodyFont="newsreader"
          headingWeight="400"
          bodyWeight="400"
          primaryColor="#2b2721"
          headingSize={30}
          bodySize={20}
          headingLetterSpacing={0.01}
        />
      </div>
    </main>
  );
}
