'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';

export default function Gallery() {
  const galleryImages = PlaceHolderImages.filter((img) => img.id.startsWith('gallery-'));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  const openLightbox = (image: ImagePlaceholder) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <>
      <section id="portfolio" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-in" className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">Our Portfolio</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the quality and diversity of our completed projects.
            </p>
          </AnimateOnScroll>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <AnimateOnScroll
                key={image.id}
                animation="slide-in-up"
                delay={`${(index % 4) * 100}ms`}
                className="break-inside-avoid"
              >
                <div
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center p-4">{image.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll animation="fade-in" delay="500ms" className="text-center mt-12">
            <a href="#contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Inquire About a Project
              </Button>
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-2 bg-transparent border-none shadow-none">
          {selectedImage && (
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.description}
              data-ai-hint={selectedImage.imageHint}
              width={1920}
              height={1080}
              className="rounded-lg object-contain w-full h-full max-h-[80vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
