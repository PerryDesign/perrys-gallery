"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Remove the hardcoded imagePaths array since we'll get it from props
type HeroProps = {
  imagePaths: { url: string; name: string }[];
};

export default function Hero({ imagePaths }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is Tailwind's sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse movement to show/hide content
  useEffect(() => {
    if (isMobile) return; // Don't run on mobile

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    timeoutId = setTimeout(() => setIsActive(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Auto advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100svh]">
      {/* Slideshow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full flex items-center justify-center p-8">
            <div className="relative h-[75vh] flex items-center justify-center">
              <div className="relative h-full drop-shadow-xl shadow-2xl  shadow-neutral-900/50">
                <Image
                  src={imagePaths[currentImageIndex]?.url || ""}
                  alt={`Gallery artwork - ${
                    imagePaths[currentImageIndex]?.name || ""
                  }`}
                  width={1200}
                  height={800}
                  className="h-full w-auto max-w-[90vw] rounded-lg hover:opacity-90 transition-opacity object-contain drop-shadow-lg shadow-neutral-900"
                  priority
                  sizes="(max-width: 1024px) 90vw, 1024px"
                />
                {/* Animated overlays */}
                <motion.div
                  initial={{ opacity: isMobile ? 1 : 0 }}
                  animate={{ opacity: isMobile || isActive ? 1 : 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent rounded-lg" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: isMobile ? 1 : 0 }}
        animate={{ opacity: isMobile || isActive ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative h-full container mx-auto px-4 sm:px-8 lg:px-12"
      >
        {/* Bottom left content */}
        <div className="absolute bottom-[10vh] sm:bottom-[15vh] md:bottom-[20vh] left-0 right-0 sm:left-8 lg:left-12 max-w-3xl px-4 sm:px-0">
          <motion.div
            initial={isMobile ? "visible" : "hidden"}
            animate={isMobile || isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 0.1, 0, 1],
                  },
                },
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-4 sm:mb-6 md:mb-8 tracking-tight text-neutral-900"
            >
              Perry&apos;s Gallery
            </motion.h1>
            <motion.p
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 0.1, 0, 1],
                  },
                },
              }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 font-light text-neutral-700 leading-relaxed max-w-2xl"
            >
              A timeless destination for art and community, carrying forward a
              legacy of excellence since 1974
            </motion.p>
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    ease: [0.25, 0.1, 0, 1],
                  },
                },
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
            >
              <Link
                href="/gallery"
                className="group w-full sm:w-auto text-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 transition-all duration-500 rounded-full text-sm sm:text-base md:text-lg font-medium text-white shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/30 transform hover:-translate-y-0.5"
              >
                <span className="relative">Explore Gallery</span>
              </Link>
              <Link
                href="/events"
                className="group w-full sm:w-auto text-center bg-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border border-neutral-400 hover:border-neutral-600 text-neutral-900 transition-all duration-500 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-neutral-50 active:bg-neutral-100 transform hover:-translate-y-0.5"
              >
                <span className="relative">View Events</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
