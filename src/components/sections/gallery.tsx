'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

// Define the shape of our image object
interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
}

interface GalleryProps {
  folderImages?: string[]; // Accept a list of file paths from the page
}

export default function Gallery({ folderImages = [] }: GalleryProps) {
  // Convert the file paths (strings) into the object format our gallery needs
  const imagesToDisplay: GalleryImage[] = folderImages.length > 0
    ? folderImages.map((path, index) => ({
        id: `local-image-${index}`,
        imageUrl: path,
        description: `Project Photo ${index + 1}`
      }))
    : [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  // Initialize Autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <>
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fade-in" className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">Our Portfolio</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into the quality and diversity of our completed projects.
            </p>
          </AnimateOnScroll>
          
          {/* Carousel Section */}
          <AnimateOnScroll animation="slide-in-up">
            <div className="relative max-w-6xl mx-auto">
                {imagesToDisplay.length > 0 ? (
                  <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent className="-ml-4">
                      {imagesToDisplay.map((image) => (
                        <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <div className="p-1">
                            <Card 
                                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onClick={() => openLightbox(image)}
                            >
                              <CardContent className="p-0 relative aspect-[4/3]">
                                <Image
                                  src={image.imageUrl}
                                  alt={image.description}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <p className="text-white font-medium tracking-wide">View Project</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12" />
                    <CarouselNext className="hidden md:flex -right-12 h-12 w-12" />
                  </Carousel>
                ) : (
                  <div className="text-center p-10 text-gray-500 bg-muted/20 rounded-lg">
                     No images found in /public/images/gallery/
                  </div>
                )}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in" delay="300ms" className="text-center mt-12">
            <a href="#contact">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Inquire About a Project
              </Button>
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none shadow-none overflow-hidden outline-none" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Project Preview</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged view of the selected project photo.
          </DialogDescription>

          {selectedImage && (
            <div className="relative w-full h-[80vh] flex items-center justify-center pointer-events-none">
                {/* Image Wrapper to allow interaction */}
                <div className="relative w-full h-full pointer-events-auto">
                    <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    fill
                    className="object-contain"
                    />
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}