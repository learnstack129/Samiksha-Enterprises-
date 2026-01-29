'use client';

import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceData } from '@/lib/services'; // Corrected import name
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Our Services</h2>
          <div className="mt-2 h-1 w-20 bg-accent mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive industrial solutions tailored to meet your specific requirements.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((category, index) => (
            <AnimateOnScroll
              key={category.category}
              animation="slide-in-up"
              delay={`${index * 100}ms`}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 group bg-card flex flex-col">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <category.icon size={24} />
                  </div>
                  {/* Changed .title to .category to match your lib file */}
                  <CardTitle className="text-xl mb-2">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <ul className="space-y-2">
                    {category.services.map((service) => (
                      <li key={service.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {service.title}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Redirect button specifically for Trading & Supply category */}
                  {category.category === "Trading & Supply" && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <Link href="/materials">
                        <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-all">
                          View Material List
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
