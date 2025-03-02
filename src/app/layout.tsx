import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perry's Gallery",
  description: "A unique space where art meets community in Park Ridge, IL",
};

// Use a static year to prevent hydration mismatch
const CURRENT_YEAR = new Date().getFullYear();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Perry&apos;s Gallery</h3>
                <p className="text-gray-400">
                  A space for art, community, and culture in Park Ridge, IL.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Hours</h3>
                <p className="text-gray-400">
                  Tuesday - Saturday: 10:00 AM - 6:00 PM
                  <br />
                  Sunday: 12:00 PM - 4:00 PM
                  <br />
                  Monday: Closed
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-gray-400">
                  1314 West Touhy Ave
                  <br />
                  Park Ridge, IL 60068
                  <br />
                  info@perrysgallery.com
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>
                &copy; {CURRENT_YEAR} Perry&apos;s Gallery. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
