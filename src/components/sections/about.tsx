import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Corporate Projects' },
  { value: 'GST', label: 'Registered' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll animation="slide-in-left" className="w-full max-w-md mx-auto">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/gallery/team.jpg" // <--- FIXED PATH
                alt="Mr. Satish Jagadale and Team - Samiksha Enterprises"
                fill
                className="rounded-lg shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateOnScroll>
          <div className="flex flex-col gap-8">
            <AnimateOnScroll animation="slide-in-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">About Samiksha Enterprises</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Under the leadership of Mr. Satish Jagadale, Samiksha Enterprises has grown into a premier vendor for major corporate clients in Pune. We hold valid VendorShip licenses and specialize in passing strict industrial audits for large-scale projects.
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {stats.map((stat, index) => (
                <AnimateOnScroll key={stat.label} animation="slide-in-up" delay={`${index * 100}ms`}>
                  <Card className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                    <p className="text-4xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm font-medium text-muted-foreground mt-2">{stat.label}</p>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}