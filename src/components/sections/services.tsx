import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { serviceData } from '@/lib/services';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Providing end-to-end solutions with a commitment to quality and timeliness.
          </p>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((category, index) => (
            <AnimateOnScroll key={category.category} animation="slide-in-up" delay={`${index * 100}ms`}>
              <Card className="h-full shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <category.icon className="w-10 h-10 text-accent" />
                  <CardTitle className="text-xl text-primary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.services.map((service) => (
                      <li key={service.title} className="flex items-center gap-3">
                        <service.icon className="w-5 h-5 text-primary/70 flex-shrink-0" />
                        <span className="text-muted-foreground">{service.title}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Conditional Button for Trading & Supply */}
                  {category.category === 'Trading & Supply' && (
                    <div className="mt-8">
                      <Button asChild className="w-full">
                        <Link href="/materials">View Material List</Link>
                      </Button>
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
