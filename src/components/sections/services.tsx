'use client';

import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardHat, Wrench, Factory, Truck, PipetteIcon as Pipe, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Precision Fabrication',
    description: 'Custom metal fabrication services including cutting, bending, and assembly of complex structures.',
    icon: Factory,
  },
  {
    title: 'Industrial Piping',
    description: 'Expert installation and maintenance of high-pressure industrial piping systems.',
    icon: Pipe,
  },
  {
    title: 'Structural Engineering',
    description: 'Design and construction of robust steel structures for industrial applications.',
    icon: HardHat,
  },
  {
    title: 'Maintenance Services',
    description: 'Comprehensive annual maintenance contracts (AMC) for plant machinery and equipment.',
    icon: Wrench,
  },
  {
    title: 'Trading & Supply',
    description: 'Quality industrial materials and equipment supply with reliable distribution.',
    icon: Truck,
    showMaterialsBtn: true, // Special flag for the supply service
  },
  {
    title: 'Quality Inspection',
    description: 'Rigorous third-party inspection services ensuring compliance with international standards.',
    icon: ClipboardCheck,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary italic">Professional Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive industrial solutions tailored to meet the highest engineering standards.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll
              key={index}
              animation="slide-in-up"
              delay={`${index * 100}ms`}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 group flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <service.icon size={24} className="text-primary group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl italic">{service.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </div>
                
                {/* Button added only for Trading & Supply */}
                {service.showMaterialsBtn && (
                  <CardContent className="pt-0 pb-6 mt-auto">
                    <Link href="/materials">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                        View Available Materials
                      </Button>
                    </Link>
                  </CardContent>
                )}
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
