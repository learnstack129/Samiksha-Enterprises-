'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, MapPin, User } from 'lucide-react';
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
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', company: '', service: '', phone: '', message: '' },
  });

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
                <p className="text-muted-foreground">Sr.No.15/2/1/4, A - 204, Venkatesh classic, Near JSPM College, Handewadi Road, Pune - 411028</p>
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
                <p className="text-muted-foreground">satishj429@gmail.com</p>
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
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                suppressHydrationWarning 
                              />
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
                              <Input 
                                placeholder="Your Company Inc." 
                                {...field} 
                                suppressHydrationWarning 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                              suppressHydrationWarning
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 12345 67890" 
                              {...field} 
                              suppressHydrationWarning 
                            />
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
                            <Textarea 
                              placeholder="Additional details about your project..." 
                              {...field} 
                              suppressHydrationWarning 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      suppressHydrationWarning
                    >
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
