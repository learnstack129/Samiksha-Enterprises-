import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <section id="home" className="relative h-[70vh] min-h-[500px] lg:h-screen flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 text-center px-4">
        <AnimateOnScroll animation="slide-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Trusted Partner for Comprehensive
            <br />
            <span className="text-accent">Civil & Industrial Solutions</span>
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll animation="slide-in-up" delay="200ms">
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Specializing in Fabrication, POP Work, Painting, and Corporate Material Supply in Pune.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="slide-in-up" delay="400ms">
          <a href="#portfolio" className="mt-8 inline-block">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
              View Our Work
            </Button>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
