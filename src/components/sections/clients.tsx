'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { Loader2 } from 'lucide-react';

interface ClientLogo {
  id: string;
  imageUrl: string;
  name: string;
}

export default function Clients() {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Query the 'clients' collection created by your Admin Dashboard
        const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedClients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ClientLogo[];
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error fetching client logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section id="clients" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            Valued Customers
          </h2>
          <div className="mt-2 h-1 w-20 bg-accent mx-auto" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations across Maharashtra for quality industrial and fabrication services.
          </p>
        </AnimateOnScroll>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading customer logos...</p>
          </div>
        ) : clients.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center">
            {clients.map((client) => (
              <AnimateOnScroll
                key={client.id}
                animation="fade-in"
                className="w-full group"
              >
                <div className="relative h-24 w-full bg-card rounded-xl border border-border/50 shadow-sm p-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-md hover:border-primary/20">
                  <div className="relative h-full w-full">
                    <Image
                      src={client.imageUrl}
                      alt={client.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                  </div>
                  {/* Tooltip for Company Name */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                    {client.name}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-card rounded-xl border border-dashed">
            <p className="text-muted-foreground">No customer logos uploaded yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
