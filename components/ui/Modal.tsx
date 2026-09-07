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

export default function Modal({ isOpen, onClose, imageSrc, imageAlt, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
          aria-label={imageAlt || "Modal"}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-md" onClick={onClose} />

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
              onClick={onClose}
              className="absolute -top-10 right-0 text-pearl/70 hover:text-gold transition-colors text-3xl font-light z-10 focus:outline-none focus:ring-2 focus:ring-gold rounded"
              aria-label="Tutup modal"
            >
              ×
            </button>

            {imageSrc ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/10">
                <Image
                  src={imageSrc}
                  alt={imageAlt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            ) : (
              <div className="bg-charcoal border border-gold/20 rounded-xl p-6 shadow-2xl">
                {children}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
