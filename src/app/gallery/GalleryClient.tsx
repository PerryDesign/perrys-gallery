"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type ImageData = {
  url: string;
  name: string;
  width?: number;
  height?: number;
};

type GalleryClientProps = {
  initialImages: ImageData[];
};

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

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  // Initialize imagesData with initialImages to show content immediately
  const [imagesData, setImagesData] = useState<ImageData[]>(initialImages);

  // Load image dimensions on mount
  useEffect(() => {
    console.log("Initial images received:", initialImages);

    const loadImageDimensions = async () => {
      try {
        const loadedImages = await Promise.all(
          initialImages.map(async (image) => {
            try {
              const dimensions = await getImageDimensions(image.url);
              return { ...image, ...dimensions };
            } catch (error) {
              console.error(
                `Error loading dimensions for image ${image.url}:`,
                error
              );
              return image; // Return original image if dimensions fail to load
            }
          })
        );
        console.log("Images with dimensions:", loadedImages);
        setImagesData(loadedImages);
      } catch (error) {
        console.error("Error loading image dimensions:", error);
        // Fallback to initial images if dimension loading fails
        setImagesData(initialImages);
      }
    };

    loadImageDimensions();
  }, [initialImages]);

  if (!imagesData.length) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <p className="text-white text-xl">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
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
              key={image.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={`Artwork - ${image.name}`}
                  width={800}
                  height={
                    image.height ? (800 * image.height) / image.width! : 800
                  }
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
              src={selectedImage.url}
              alt={`Selected artwork - ${selectedImage.name}`}
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
