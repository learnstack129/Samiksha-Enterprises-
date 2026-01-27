"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const navigation = [
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

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Admin redirect function on double click
  const handleAdminAccess = () => {
    router.push("/admin/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      {/* Top bar for contact info - hidden on scroll for cleaner look */}
      {!scrolled && (
        <div className="container mx-auto px-4 mb-2 hidden lg:flex justify-end gap-6 text-sm font-medium text-primary/80">
          <a href="tel:+919822012345" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-3 w-3" /> +91 98220 12345
          </a>
          <a href="mailto:info@samikshaenterprises.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-3 w-3" /> info@samikshaenterprises.com
          </a>
        </div>
      )}

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo Section with Hidden Admin Trigger */}
          <div 
            onDoubleClick={handleAdminAccess}
            className="cursor-pointer select-none"
            title="Double click for admin access"
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link href="#contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border animate-in fade-in slide-in-from-top-5">
            <div className="flex flex-col p-4 gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-border/50 last:border-0"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2">Get a Quote</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
