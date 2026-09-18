"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, imageSrc, imageAlt, children }: Readonly<ModalProps>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={imageAlt || "Modal Dialog"}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1A1612]/90 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-4xl w-full max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/90 hover:text-white transition-colors text-2xl font-light z-10 focus-visible:ring-2 focus-visible:ring-[#7A5E24] rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {imageSrc ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#7A5E24]/30 shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt || "Modal preview"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            ) : (
              <div className="bg-[#FAF7F2] border border-[#7A5E24]/30 rounded-2xl p-6 shadow-2xl text-[#2C251E]">
                {children}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
