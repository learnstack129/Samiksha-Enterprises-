'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
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
import { Loader2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch from 'portfolio' collection created by your Admin Dashboard
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryImage[];
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

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
          
          <AnimateOnScroll animation="slide-in-up">
            <div className="relative max-w-6xl mx-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Loading projects...</p>
                  </div>
                ) : images.length > 0 ? (
                  <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{ align: "start", loop: true }}
                  >
                    <CarouselContent className="-ml-4">
                      {images.map((image) => (
                        <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <Card 
                            className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
                            onClick={() => openLightbox(image)}
                          >
                            <CardContent className="p-0 relative aspect-[4/3]">
                              <Image
                                src={image.imageUrl}
                                alt={image.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            </CardContent>
                            <div className="p-3 text-center bg-card border-t">
                              <p className="font-semibold text-sm truncate">{image.name}</p>
                            </div>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12" />
                    <CarouselNext className="hidden md:flex -right-12" />
                  </Carousel>
                ) : (
                  <div className="text-center p-20 text-gray-500 bg-muted/20 rounded-lg">
                     No images found. Please upload images via the Admin Dashboard.
                  </div>
                )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Lightbox remains the same, updated to use image.imageUrl and image.name */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-transparent border-none" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Project Preview</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-[80vh] flex flex-col items-center justify-center">
              <div className="relative w-full h-full">
                <Image src={selectedImage.imageUrl} alt={selectedImage.name} fill className="object-contain" />
              </div>
              <div className="mt-4 bg-black/50 px-4 py-2 rounded text-white">{selectedImage.name}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
