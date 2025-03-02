"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Remove the hardcoded imagePaths array since we'll get it from props
type HeroProps = {
  imagePaths: { url: string; name: string }[];
};

export default function Hero({ imagePaths }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  // Auto advance slideshow with a slower interval for a more natural walking pace
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
    }, 5000 + Math.random() * 2000); // 5-7 seconds with randomness for more natural walking pace
    return () => clearInterval(interval);
  }, [imagePaths.length]);

  // Calculate the next and previous indices
  const nextImageIndex = (currentImageIndex + 1) % imagePaths.length;
  const prevImageIndex =
    (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;

  return (
    <div className="relative h-[100svh] overflow-hidden bg-white">
      {/* Gallery Slideshow - Using a different animation approach */}
      <div
        ref={galleryRef}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <div className="relative h-[75vh] w-full max-w-[1400px] mx-auto">
          {/* We'll use absolute positioning for all images and animate them */}
          <div className="relative h-full w-full">
            {imagePaths.map((image, index) => {
              // Determine if this image is current, next, or previous
              const isCurrent = index === currentImageIndex;
              const isNext = index === nextImageIndex;
              const isPrev = index === prevImageIndex;

              // Only render current, next, and previous images for performance
              if (!isCurrent && !isNext && !isPrev) return null;

              return (
                <motion.div
                  key={index}
                  initial={{
                    x: isNext ? "100%" : isPrev ? "-100%" : "0%",
                    opacity: isCurrent ? 1 : 0.5,
                    scale: isCurrent ? 1 : 0.95,
                  }}
                  animate={{
                    x: isCurrent ? "0%" : isNext ? "100%" : "-100%",
                    opacity: isCurrent ? 1 : 0.5,
                    scale: isCurrent ? 1 : 0.95,
                  }}
                  exit={{
                    x: "-100%",
                    opacity: 0.5,
                    scale: 0.95,
                  }}
                  transition={{
                    x: {
                      duration: 1.8,
                      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for a more natural walking pace
                      // Add slight randomness to make it feel more human
                      delay: isCurrent ? 0 : Math.random() * 0.2,
                    },
                    opacity: {
                      duration: 1.5,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 1.8,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Elegant frame with proper padding and shadow */}
                  <div className="relative bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[90%] mx-auto">
                    {/* Inner frame with border */}
                    <div className="relative p-4 md:p-8 border-2 border-neutral-100 rounded-lg overflow-hidden">
                      {/* Image container with fixed dimensions instead of aspect ratio */}
                      <div className="relative w-full h-[50vh] md:h-[60vh]">
                        <Image
                          src={image.url || ""}
                          alt={`Gallery artwork - ${image.name || ""}`}
                          width={1200}
                          height={800}
                          className="object-contain w-full h-full"
                          priority={isCurrent}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* White gradient overlay - appears when content is visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobile || isActive ? 0.85 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobile || isActive ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative h-full container mx-auto px-4 sm:px-8 lg:px-12 z-30"
      >
        {/* Bottom left content */}
        <div className="absolute bottom-[10vh] sm:bottom-[15vh] md:bottom-[20vh] left-0 right-0 sm:left-8 lg:left-12 max-w-3xl px-4 sm:px-0">
          <motion.div
            initial="hidden"
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
                className="group w-auto mx-auto sm:mx-0 text-center px-8 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 transition-all duration-500 rounded-full text-sm sm:text-base md:text-lg font-medium text-white shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/30 transform hover:-translate-y-0.5"
              >
                <span className="relative">Explore Gallery</span>
              </Link>
              <Link
                href="/events"
                className="group w-auto mx-auto sm:mx-0 text-center bg-white px-8 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border border-neutral-400 hover:border-neutral-600 text-neutral-900 transition-all duration-500 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-neutral-50 active:bg-neutral-100 transform hover:-translate-y-0.5"
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
