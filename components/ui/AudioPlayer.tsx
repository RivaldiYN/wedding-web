"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GONDANG_MUSIC_PATH } from "@/lib/dummy-data";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.loop = true;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.warn("Audio playback issue:", err);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={GONDANG_MUSIC_PATH} type="audio/mpeg" />
      </audio>

      <motion.div
        className="fixed bottom-18 right-4 sm:bottom-6 sm:right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <button
          onClick={toggle}
          className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-[#1A1612]/95 border border-[#7A5E24]/60 backdrop-blur-md shadow-2xl hover:border-[#7A5E24] hover:scale-105 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7A5E24] focus-visible:ring-offset-2"
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          title={isPlaying ? "Pause background music" : "Play background music"}
        >
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[#7A5E24]/40"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <div
            className={`w-full h-full rounded-full flex items-center justify-center p-1 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full bg-[#13141A] border border-[#7A5E24]/25 flex items-center justify-center relative shadow-inner">
              <div className="w-6 h-6 rounded-full border border-[#7A5E24]/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-champagne-gold" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full" aria-hidden="true">
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 h-3 bg-[#EBD8B0] rounded-full animate-pulse" />
                <span className="w-1 h-2 bg-[#7A5E24] rounded-full animate-pulse delay-75" />
                <span className="w-1 h-3 bg-[#EBD8B0] rounded-full animate-pulse delay-150" />
              </div>
            ) : (
              <span className="text-[#EBD8B0] text-xs font-bold ml-0.5">▶</span>
            )}
          </div>
        </button>
      </motion.div>
    </>
  );
}
