"use client";

import { useState } from "react";
import CoverGate from "@/components/sections/CoverGate";
import Hero from "@/components/sections/Hero";
import CoupleProfile from "@/components/sections/CoupleProfile";
import LoveStory from "@/components/sections/LoveStory";
import SketchbookJourney from "@/components/sections/SketchbookJourney";
import EventDetails from "@/components/sections/EventDetails";
import BentoGallery from "@/components/sections/BentoGallery";
import RSVPForm from "@/components/sections/RSVPForm";
import Wishes from "@/components/sections/Wishes";
import GiftRegistry from "@/components/sections/GiftRegistry";
import AudioPlayer from "@/components/ui/AudioPlayer";
import FloatingNav from "@/components/ui/FloatingNav";
import ThreeBackground from "@/components/three/ThreeBackground";
import { COUPLE, WEDDING } from "@/lib/dummy-data";

interface InvitationExperienceProps {
  guestName: string;
  slug: string;
}

export default function InvitationExperience({
  guestName,
  slug,
}: Readonly<InvitationExperienceProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Play audio
    const audio = document.querySelector("audio") as HTMLAudioElement | null;
    if (audio) {
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBF8F3] text-[#2C251E] overflow-x-hidden bg-wedding-paper">
      {/* 3D Romantic Falling Rose Petals & Gold Dust */}
      <ThreeBackground />

      {/* Royal Cover Gate with Calligraphy & Botanical Sketches */}
      <CoverGate guestName={guestName} isOpen={isOpen} onOpen={handleOpen} />

      {/* Main Wedding Invitation Content */}
      <main
        id="main-content"
        className={`relative z-10 ${!isOpen ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-700"}`}
      >
        <Hero guestName={guestName} />
        <CoupleProfile />
        <EventDetails />
        <LoveStory />
        <SketchbookJourney />
        <BentoGallery />
        <RSVPForm guestName={guestName} slug={slug} />
        <Wishes />
        <GiftRegistry />

        {/* Footer */}
        <footer className="relative py-16 px-4 text-center border-t border-[#7A5E24]/20 bg-[#FAF7F2]/90 backdrop-blur-md">
          <div className="max-w-md mx-auto space-y-3">
            <div className="h-px w-24 bg-[#7A5E24]/40 mx-auto" />
            <h3 className="font-script text-4xl text-[#7A5E24] font-normal">
              {COUPLE.groomName.split(" ")[0]} &amp; {COUPLE.brideName.split(" ")[0]}
            </h3>
            <p className="font-serif text-[#594E3F] text-xs tracking-widest uppercase font-medium">
              {WEDDING.displayDate}
            </p>
            <p className="font-sans text-[#594E3F] text-xs italic pt-2 font-normal">
              &ldquo;It is our utmost joy and privilege to celebrate our holy union in the presence of those we hold dear.&rdquo;
            </p>
            <div className="pt-3 text-[#7A5E24]/70 text-xs" aria-hidden="true">✦ ✦ ✦</div>
          </div>
        </footer>

        {/* Floating Dock Navigation */}
        <FloatingNav isVisible={isOpen} />

        {/* Floating Audio Player */}
        <AudioPlayer />
      </main>
    </div>
  );
}
