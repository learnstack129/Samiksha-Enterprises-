import Header from '@/components/site/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Gallery from '@/components/sections/gallery';
import VendorStatus from '@/components/sections/vendor-status';
import Contact from '@/components/sections/contact';
import Footer from '@/components/site/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <VendorStatus />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
