import Hero from "./components/Hero";
import Link from "next/link";
import { getGalleryImages } from "@/lib/getImages";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-[#ED1C24]/20 selection:text-[#ED1C24]">
      {/* Hero Section */}
      <Hero imagePaths={images} />

      {/* Featured Section */}
      <section className="py-24 sm:py-32 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#ED1C24]/5 via-amber-50/10 to-transparent" />
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-24 text-center text-neutral-900">
            Featured Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <div className="group p-8 sm:p-10 rounded-2xl bg-white hover:bg-neutral-50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ED1C24]/5 transform hover:-translate-y-2 border border-neutral-100">
              <div className="h-1 w-12 bg-[#ED1C24] rounded-full mb-8 transition-all duration-500 group-hover:w-24 opacity-70" />
              <h3 className="text-2xl sm:text-3xl font-serif mb-5 text-neutral-900 group-hover:text-[#ED1C24] transition-colors">
                Wine & Art
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base sm:text-lg">
                An exclusive evening of curated wines paired with artistic
                masterpieces.
              </p>
            </div>
            <div className="group p-8 sm:p-10 rounded-2xl bg-white hover:bg-neutral-50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ED1C24]/5 transform hover:-translate-y-2 border border-neutral-100">
              <div className="h-1 w-12 bg-[#ED1C24] rounded-full mb-8 transition-all duration-500 group-hover:w-24 opacity-70" />
              <h3 className="text-2xl sm:text-3xl font-serif mb-5 text-neutral-900 group-hover:text-[#ED1C24] transition-colors">
                Private Showings
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base sm:text-lg">
                Intimate gallery experiences tailored to your artistic
                preferences.
              </p>
            </div>
            <div className="group p-8 sm:p-10 rounded-2xl bg-white hover:bg-neutral-50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ED1C24]/5 transform hover:-translate-y-2 border border-neutral-100">
              <div className="h-1 w-12 bg-[#ED1C24] rounded-full mb-8 transition-all duration-500 group-hover:w-24 opacity-70" />
              <h3 className="text-2xl sm:text-3xl font-serif mb-5 text-neutral-900 group-hover:text-[#ED1C24] transition-colors">
                Artist Soirées
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base sm:text-lg">
                Meet the visionaries behind our carefully curated collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 sm:py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ED1C24]/5 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-50/50 via-white to-white" />
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif mb-8 sm:mb-12 text-neutral-900">
            Visit Our Gallery
          </h2>
          <p className="text-lg sm:text-2xl mb-2 sm:mb-3 font-light text-neutral-700">
            1314 West Touhy Ave
          </p>
          <p className="text-lg sm:text-2xl mb-12 sm:mb-16 font-light text-neutral-700">
            Park Ridge, IL 60068
          </p>
          <Link
            href="https://maps.google.com"
            className="group inline-flex justify-center w-auto max-w-[200px] sm:max-w-none sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-[#ED1C24] hover:bg-[#ED1C24]/90 active:bg-[#ED1C24]/80 transition-all duration-500 rounded-full text-base sm:text-lg font-medium text-white shadow-lg shadow-[#ED1C24]/10 hover:shadow-xl hover:shadow-[#ED1C24]/20 transform hover:-translate-y-0.5 relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative">Get Directions</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
