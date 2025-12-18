// src/components/sections/testimonials.tsx
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Star, Quote } from 'lucide-react';

// Updated reviews covering Civil, Fabrication, Painting, Plumbing, etc.
const testimonials = [
  {
    id: 1,
    name: "Ramesh Pawar",
    role: "Site Engineer, Omega Constructions",
    content: "Samiksha Enterprises handled the complete Civil Work and Fabrication for our new warehouse extension. The structural integrity and finish quality were top-notch. Delivered right on schedule.",
    rating: 5,
    initials: "RP"
  },
  {
    id: 2,
    name: "Suresh Gupta",
    role: "Facility Manager, TechPark Towers",
    content: "We hired them for Aluminium and Glass Work for our office partitions. The craftsmanship is excellent, and they also managed the POP work and Painting seamlessly. A one-stop solution.",
    rating: 5,
    initials: "SG"
  },
  {
    id: 3,
    name: "Anil Deshmukh",
    role: "Procurement Head, City Infra",
    content: "For Material Supply and Trading, Samiksha Enterprises is our go-to vendor. Whether it's hardware or raw construction material, their pricing is competitive and delivery is always timely.",
    rating: 4,
    initials: "AD"
  },
  {
    id: 4,
    name: "Vikas Malhotra",
    role: "Maintenance Lead, Star Hotels",
    content: "Their team fixed a critical issue with our central Plumbing system that others couldn't resolve. We also used their Printing services for our safety signage, which was high quality.",
    rating: 5,
    initials: "VM"
  },
  {
    id: 5,
    name: "Deepak Verma",
    role: "Contractor",
    content: "I have worked with many vendors for Fabrication and heavy structural work, but Samiksha Enterprises stands out for their precision and safety standards. Highly recommended for industrial projects.",
    rating: 5,
    initials: "DV"
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Interior Designer",
    content: "The POP work and Painting finish they delivered for my commercial project was flawless. It is rare to find a team that handles both civil repairs and aesthetic finishing so well.",
    rating: 5,
    initials: "PS"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Client Feedback</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by clients for our Civil, Fabrication, and Supply services.
          </p>
        </AnimateOnScroll>

        {/* Testimonials Carousel */}
        <AnimateOnScroll animation="slide-in-up" delay="200ms">
          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full p-1">
                      <Card className="h-full flex flex-col relative border-none shadow-md hover:shadow-lg transition-shadow bg-card">
                        <CardContent className="flex-grow pt-10 pb-6 px-6">
                          
                          {/* Quote Icon */}
                          <div className="absolute top-4 right-6 text-muted-foreground/10">
                            <Quote size={48} fill="currentColor" />
                          </div>

                          {/* Rating Stars */}
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? "text-accent fill-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Review Text */}
                          <p className="text-muted-foreground mb-6 leading-relaxed italic">
                            "{testimonial.content}"
                          </p>

                          {/* User Info */}
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                            <Avatar className="h-10 w-10 border border-primary/10">
                              <AvatarFallback className="bg-primary/5 text-primary font-bold">
                                {testimonial.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
