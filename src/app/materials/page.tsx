'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Material {
  id: string;
  imageUrl: string;
  name: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Fetching from 'materials' collection
        const q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Material[];
        setMaterials(fetchedMaterials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <main className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link href="/#services">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Button>
          </Link>
          <AnimateOnScroll animation="fade-in" className="text-center md:text-right">
            <h1 className="text-3xl lg:text-5xl font-bold text-primary">Material List</h1>
            <p className="mt-2 text-muted-foreground">High-quality industrial materials for all your requirements.</p>
          </AnimateOnScroll>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading materials...</p>
          </div>
        ) : materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {materials.map((material) => (
              <AnimateOnScroll key={material.id} animation="slide-in-up">
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={material.imageUrl} // Fetched from Firebase
                        alt={material.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4 bg-card border-t">
                      <h3 className="font-bold text-lg text-primary truncate">{material.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center p-20 bg-muted/20 rounded-2xl border-2 border-dashed">
            <p className="text-xl text-muted-foreground">No materials found in the database.</p>
          </div>
        )}
      </div>
    </main>
  );
}
