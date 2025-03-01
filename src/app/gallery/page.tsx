import { getGalleryImages } from "@/lib/getImages";
import GalleryClient from "./GalleryClient";

export const revalidate = 3600; // Revalidate every hour

export default async function GalleryPage() {
  const images = await getGalleryImages();

  if (!images || images.length === 0) {
    console.log("No images found or error fetching images");
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <p className="text-white text-xl">No images found in the gallery.</p>
      </div>
    );
  }

  console.log("Fetched images:", images);
  return <GalleryClient initialImages={images} />;
}
