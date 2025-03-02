"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigationLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-sm bg-white/95 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative w-32 h-12">
            <Image
              src="/images/PerrysLogo.svg"
              alt="Perry's Gallery"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/80 hover:text-[#ED1C24] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="text-black/80 hover:text-[#ED1C24] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-gray-200"
              aria-describedby="navigation-sheet-description"
            >
              <SheetTitle className="text-black/80 font-serif text-xl">
                Menu
              </SheetTitle>
              <div id="navigation-sheet-description" className="sr-only">
                Main navigation menu for Perry&apos;s Gallery website
              </div>
              <div className="flex flex-col space-y-6 mt-8">
                {navigationLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-black/80 hover:text-[#ED1C24] transition-colors text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
