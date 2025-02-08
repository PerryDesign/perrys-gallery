import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/family.jpg"
            alt="Perry's Gallery Interior"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full container mx-auto px-6 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-serif mb-6 text-white">
              About the Gallery
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              A sanctuary for artists and art lovers in Park Ridge
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p className="text-xl leading-relaxed text-neutral-700">
              Perry&apos;s Gallery stands as a testament to the enduring spirit
              of artistic expression in Park Ridge. What began as a family
              legacy has evolved into a vibrant space where artists from all
              walks of life come together to share their stories through art.
            </p>

            <p className="text-xl leading-relaxed text-neutral-700">
              Our walls showcase a carefully curated collection of works from
              both emerging and established artists. Each piece contributes to
              the ongoing dialogue between creativity and community that defines
              our space.
            </p>
          </div>
        </div>
      </section>

      {/* Tim's Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/art/453042595_10232807387955299_8230215630404295688_n.jpg"
                alt="Tim Perry"
                fill
                className="object-cover"
              />
            </div>
            <div className="prose prose-lg">
              <h2 className="text-3xl font-serif mb-6">The Gallery Owner</h2>
              <p className="text-neutral-700">
                Tim Perry&apos;s journey as an artist and gallery owner is
                rooted in a deep appreciation for both tradition and innovation.
                His vision has transformed this historic space into a haven
                where art finds its voice and artists find their community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-8">Visit Us</h2>
          <p className="text-xl mb-2 text-neutral-700">1314 West Touhy Ave</p>
          <p className="text-xl mb-12 text-neutral-700">Park Ridge, IL 60068</p>
          <Link
            href="https://maps.google.com"
            className="inline-block px-12 py-4 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300 rounded text-lg text-white"
          >
            Get Directions
          </Link>
        </div>
      </section>
    </div>
  );
}
