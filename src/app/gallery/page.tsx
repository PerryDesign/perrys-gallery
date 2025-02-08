"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Helper function to get image dimensions
const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = src;
  });
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesData, setImagesData] = useState<
    Array<{ src: string; width: number; height: number }>
  >([]);

  // Image paths - we'll structure this to make it easy to switch to a CDN later
  const imagePaths = [
    "/images/art/440361850_10225716641767570_7823235742098171186_n.jpg",
    "/images/art/440372452_10225774318689457_6921967732278113113_n.jpg",
    "/images/art/441241522_10225751692243810_2827100941203716009_n.jpg",
    "/images/art/441497433_10225834792361261_4947024508211522838_n.jpg",
    "/images/art/449474610_10226111769845525_1766409968721785311_n.jpg",
    "/images/art/451199894_10226191900488741_2530104696006113561_n.jpg",
    "/images/art/453042595_10232807387955299_8230215630404295688_n.jpg",
    "/images/art/453046128_10232807388435311_7961866984272212277_n.jpg",
    "/images/art/453092127_10226275505418812_4091625101921462714_n.jpg",
    "/images/art/454849265_10226409750414853_5951029729455374895_n.jpg",
    "/images/art/456140244_10226493448227246_6523168001274328973_n.jpg",
    "/images/art/456965793_10226568718148947_5829198765247136802_n.jpg",
    "/images/art/457224970_10226591309553718_716578712840558932_n.jpg",
    "/images/art/462507478_10226993450486990_9021793672251423864_n.jpg",
    "/images/art/467165009_10227626637196262_3132792772318363089_n.jpg",
    "/images/art/467697223_10227721654571637_6950305874783681372_n.jpg",
    "/images/art/468216619_10227993345563742_2910841215644840579_n.jpg",
    "/images/art/470061672_10228064404020159_9165124480421971509_n.jpg",
    "/images/art/470146258_10228069774194410_4887530909484041029_n.jpg",
    "/images/art/471811464_10228174301327523_7428278817677013545_n.jpg",
    "/images/art/474067145_10228286603455006_1969892781616711645_n.jpg",
    "/images/art/474477919_10228275532418237_7200724339404183706_n.jpg",
  ];

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imagePaths.map(async (src) => {
          const dimensions = await getImageDimensions(src);
          return { src, ...dimensions };
        })
      );
      setImagesData(loadedImages);
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Intro Section */}
      <motion.div
        className="container mx-auto px-4 py-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Art Gallery
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A collection of original artwork showcasing creativity and passion
        </p>
        <div className="w-24 h-1 bg-white/20 mx-auto mt-8 rounded-full"></div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {imagesData.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={`Artwork ${index + 1}`}
                  width={800}
                  height={(800 * image.height) / image.width}
                  className="w-full h-auto hover:opacity-90 transition-opacity"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshGxsdIR0hHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-7xl max-h-[90vh]"
          >
            <Image
              src={selectedImage}
              alt="Selected artwork"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
