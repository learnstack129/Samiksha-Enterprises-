import fs from 'fs';
import path from 'path';
import Header from '@/components/site/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Gallery from '@/components/sections/gallery';
import VendorStatus from '@/components/sections/vendor-status';
import Contact from '@/components/sections/contact';
import Footer from '@/components/site/footer';
import Testimonials from '@/components/sections/testimonials';

// This function runs on the server to get file names
async function getGalleryImages() {
  try {
    // 1. Find the folder path
    const galleryDirectory = path.join(process.cwd(), 'public/images/gallery');
    
    // 2. Read all files inside it
    const files = await fs.promises.readdir(galleryDirectory);
    
    // 3. Filter to keep only images (jpg, png, etc.)
    const imageFiles = files.filter((file) => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );

    // 4. Return the public URL paths (encoding handles spaces in "WhatsApp Image...")
    return imageFiles.map((file) => `/images/gallery/${encodeURIComponent(file)}`);
  } catch (error) {
    console.error("Error reading gallery images:", error);
    return []; // Return empty array if folder doesn't exist
  }
}

export default async function Home() {
  // Fetch images before rendering the page
  const galleryImages = await getGalleryImages();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        {/* Pass the found images to the Gallery component */}
        <Gallery folderImages={galleryImages} />
        <Testimonials />
        <VendorStatus />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}