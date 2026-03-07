// src/components/sections/team.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Briefcase } from 'lucide-react';

const team = [
  {
    name: "Mr. Satish Jagadale",
    role: "Founder & Proprietor",
    image: "/gallery/team/WhatsApp Image 2026-03-07 at 3.58.55 PM.jpeg", // Recommended: Use a professional portrait here
    bio: "Driving the vision of Samiksha Enterprises with over 15 years of industry expertise."
  },
  {
    name: "Ajay Sawant",
    role: "Project Manager",
    image: "/gallery/team/IMG_6765.JPG.jpeg", // Placeholder
    bio: "Ensures timely delivery and strict quality control across all industrial sites."
  },
  {
    name: "Ajay Jadhav",
    role: "Supervisor",
    image: "/gallery/team/IMG_6781.JPG.jpeg", // Placeholder
    bio: "Specialist in structural fabrication and complex civil engineering solutions."
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Meet Our Leadership</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            The dedicated professionals behind our successful corporate partnerships in Pune.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <AnimateOnScroll 
              key={member.name} 
              animation="slide-in-up" 
              delay={`${index * 150}ms`}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group bg-card">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm italic">{member.bio}</p>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2 text-primary">
                    <Briefcase size={16} />
                    <span className="text-sm font-medium uppercase tracking-wider">{member.role}</span>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
