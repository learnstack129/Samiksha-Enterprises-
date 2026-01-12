// src/components/sections/clients.tsx
import Image from 'next/image';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';

// We use Clearbit's Logo API where possible for official logos.
// For local Pune businesses without a global domain, we use a placeholder or specific URL.
const clients = [
  // Honeywell Group
  { name: 'Honeywell Automation', domain: 'honeywell.com' },
  { name: 'Honeywell Universal Mfg', domain: 'honeywell.com' }, // Same logo
  { name: 'Honeywell International', domain: 'honeywell.com' }, // Same logo
  
  // Major MNCs
  { name: 'Fuji Electric', domain: 'fujielectric.com' },
  { name: 'Emerson Innovation Center', domain: 'emerson.com' },
  { name: 'Envision Energy', domain: 'envision-group.com' },
  { name: 'MacDermid Enthone', domain: 'macdermidenthone.com' },
  { name: 'Keolis India', domain: 'keolis.com' },
  { name: 'MUPRO India', domain: 'muepro.com' },
  
  // Industrial & Technical
  { name: 'Bombay Fluid Systems (Swagelok)', domain: 'swagelok.com' },
  { name: 'Baker Gauges India', domain: 'bakergauges.com' },
  { name: 'Eclipse Combustion', domain: 'honeywell.com' }, // Acquired by Honeywell
  { name: 'Amperehour Solar', domain: 'amperehourenergy.com' },
  { name: 'SBEM Pvt Ltd', domain: 'sbem.in' },
  
  // Local Pune Brands (Logos might need manual upload if not found, using high-quality placeholders)
  { name: 'Chitale Bandhu Mithaiwale', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chitale_Bandhu_Mithaiwale_logo.svg/512px-Chitale_Bandhu_Mithaiwale_logo.svg.png' },
  { name: 'Venus Traders', fallback: 'VT' },
  { name: 'Jay Engineering', fallback: 'JE' },
];

export default function Clients() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Our Valued Customers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are honored to be the trusted partner for industry leaders in Pune and across the globe.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="slide-in-up" delay="100ms">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clients.map((client, index) => {
              // Construct Logo URL
              const logoUrl = client.logo 
                ? client.logo 
                : client.domain 
                  ? `https://logo.clearbit.com/${client.domain}?size=200` 
                  : `https://placehold.co/200x80/f3f4f6/1f2937?text=${client.fallback || client.name}`;

              return (
                <div 
                  key={index} 
                  className="w-full h-32 flex flex-col items-center justify-center p-6 bg-white border border-border/50 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                  title={client.name}
                >
                  <div className="relative w-full h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100">
                    <Image
                      src={logoUrl}
                      alt={`${client.name} Logo`}
                      width={160}
                      height={60}
                      className="object-contain max-h-full max-w-full"
                      onError={(e) => {
                        // Fallback if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.innerHTML = `<span class="text-xs font-bold text-muted-foreground text-center">${client.name}</span>`;
                      }}
                    />
                  </div>
                  {/* Optional: Show name on hover for clarity */}
                  <span className="mt-3 text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}