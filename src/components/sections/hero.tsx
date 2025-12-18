// src/components/sections/hero.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';

export default function Hero() {
  return (
    <section id="home" className="relative h-[70vh] min-h-[500px] lg:h-screen flex items-center justify-center text-white">
      {/* Updated to use the specific hero.png image */}
      <Image
        src="/images/gallery/hero.png" 
        alt="Samiksha Enterprises Industrial Services"
        fill
        className="object-cover"
        priority
      />
      
      {/* Dark Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-4">
        <AnimateOnScroll animation="slide-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Trusted Partner for Comprehensive
            <br />
            <span className="text-accent">Civil & Industrial Solutions</span>
          </h1>
        </AnimateOnScroll>
        
        <AnimateOnScroll animation="slide-in-up" delay="200ms">
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Specializing in Fabrication, POP Work, Painting, and Corporate Material Supply in Pune.
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll animation="slide-in-up" delay="400ms">
          <a href="#portfolio" className="mt-8 inline-block">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 h-auto">
              View Our Projects
            </Button>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
