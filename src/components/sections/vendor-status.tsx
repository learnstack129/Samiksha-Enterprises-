'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ShieldX } from 'lucide-react';

export default function VendorStatus() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: 'Error',
        description: 'Please enter a verification code.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Dummy verification logic
      if (code.toLowerCase() === 'samiksha2024') {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" /> Verified
            </div>
          ),
          description: 'Samiksha Enterprises is a registered and compliant vendor.',
        });
      } else {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <ShieldX className="h-5 w-5 text-red-500" /> Not Verified
            </div>
          ),
          description: 'The provided code is invalid. Please check and try again.',
          variant: 'destructive',
        });
      }
      setLoading(false);
      setCode('');
    }, 1500);
  };

  return (
    <section id="vendor-status" className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-accent p-3 rounded-full mb-4">
            <ShieldCheck className="h-8 w-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">Registered Vendor for Corporate Audits</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            We are a fully compliant and registered vendor, specializing in meeting the strict requirements for corporate industrial audits. Verify our status below.
          </p>
          <Card className="mt-8 bg-background/10 border-primary-foreground/20">
            <CardContent className="p-6">
              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="text"
                  placeholder="Enter Vendor Code..."
                  className="flex-grow text-foreground"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Status'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
