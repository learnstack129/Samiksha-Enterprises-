'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useTransition, useRef, useEffect } from 'react';
import { getServiceSuggestions } from '@/ai/flows/contact-form-suggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, MapPin, User } from 'lucide-react';
import { AnimateOnScroll } from '../motion/AnimateOnScroll';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().optional(),
  service: z.string().min(3, 'Please specify the service you require.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', company: '', service: '', phone: '', message: '' },
  });

  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue('service', value);
    if (value.length > 2) {
      setShowSuggestions(true);
      startTransition(async () => {
        const result = await getServiceSuggestions({ userInput: value });
        setSuggestions(result.suggestions);
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('service', suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const onSubmit = (data: ContactFormValues) => {
    console.log(data); // Placeholder for form submission logic
    toast({
      title: 'Message Sent!',
      description: 'Thank you for your inquiry. We will get back to you shortly.',
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-in" className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Contact us today for a consultation.
          </p>
        </AnimateOnScroll>
        <div className="grid lg:grid-cols-5 gap-12">
          <AnimateOnScroll animation="slide-in-left" className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Address</h3>
                <p className="text-muted-foreground">Pune, Maharashtra</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <User className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Contact Person</h3>
                <p className="text-muted-foreground">Satish Jagadale</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@samiksha.com (example)</p>
              </div>
            </div>
            <div className="mt-8 rounded-lg bg-muted h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Google Maps Placeholder</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-in-right" className="lg:col-span-3">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="relative" ref={suggestionsRef}>
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Required</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Fabrication, POP..."
                                {...field}
                                onChange={handleServiceInputChange}
                                onFocus={() => value.length > 2 && setShowSuggestions(true)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {showSuggestions && (isPending || suggestions.length > 0) && (
                        <Card className="absolute z-10 w-full mt-1 shadow-lg">
                          <CardContent className="p-2">
                            {isPending ? (
                              <div className="flex items-center justify-center p-2">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                              </div>
                            ) : (
                              <ul className="space-y-1">
                                {suggestions.map((suggestion) => (
                                  <li
                                    key={suggestion}
                                    className="px-3 py-2 rounded-md hover:bg-muted cursor-pointer text-sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 12345 67890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Additional details about your project..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Submit Inquiry
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
