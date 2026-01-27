"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdminRedirect = () => {
    router.push("/admin/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      {/* Top Bar - Hidden on Mobile & Scrolled */}
      {!scrolled && (
        <div className="hidden lg:block border-b border-white/10 pb-4 mb-4">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <a href="tel:+919822012345" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={14} /> +91 98220 12345
              </a>
              <a href="mailto:info@samiksha.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={14} /> info@samiksha.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Pune, Maharashtra
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo with Secret Admin Trigger */}
          <div 
            onDoubleClick={handleAdminRedirect}
            className="cursor-default select-none"
            title="Double click for admin access"
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            <a href="#contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get a Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground">
                Get a Quote
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
