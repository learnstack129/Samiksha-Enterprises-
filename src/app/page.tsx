// src/app/page.tsx
import Header from '@/components/site/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Gallery from '@/components/sections/gallery';
import Clients from '@/components/sections/clients';
import Team from '@/components/sections/team'; // 1. Import Team
import Contact from '@/components/sections/contact';
import Footer from '@/components/site/footer';
import Testimonials from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Team /> {/* 2. Place it here */}
        <Services />
        <Gallery />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
