// src/components/sections/testimonials.tsx
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Star, Quote } from 'lucide-react';

// Mock data - You can move this to a separate file like src/lib/data.ts later
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Factory Manager",
    content: "Samiksha Solutions transformed our production line with their automation tools. The efficiency has increased by 40% within just two months. Highly recommended!",
    rating: 5,
    initials: "RK"
  },
  {
    id: 2,
    name: "Priya Desai",
    role: "Operations Head",
    content: "The CCTV and security systems installation was seamless. Their team is professional, punctual, and the after-sales support is excellent.",
    rating: 5,
    initials: "PD"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "IT Director",
    content: "We sourced our industrial networking equipment from them. Great pricing and genuine products. Will definitely continue this partnership.",
    rating: 4,
    initials: "AP"
  },
  {
    id: 4,
    name: "Suresh Reddy",
    role: "Plant Supervisor",
    content: "Their sensor solutions helped us solve a critical quality control issue we had been facing for years. The technical expertise they bring is unmatched.",
    rating: 5,
    initials: "SR"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses across the industry. Here are some of their experiences working with us.
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
                      <Card className="h-full flex flex-col relative border-none shadow-md hover:shadow-lg transition-shadow">
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
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Review Text */}
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            "{testimonial.content}"
                          </p>

                          {/* User Info */}
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                            <Avatar className="h-10 w-10 border border-primary/10">
                              <AvatarImage src={`/images/avatars/${testimonial.id}.png`} alt={testimonial.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium">
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