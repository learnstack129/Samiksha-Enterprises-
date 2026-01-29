'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  service: z.string().min(3),
  phone: z.string().min(10),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(data: ContactFormValues) {
  // Validate data on server side
  const result = contactFormSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: 'Invalid data' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Inquiry" <${process.env.GMAIL_USER}>`,
      to: 'satishj429@gmail.com', 
      replyTo: data.name + ' <' + process.env.GMAIL_USER + '>', // Fallback reply-to
      subject: `New Inquiry: ${data.service} - ${data.name}`,
      text: `Name: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nCompany: ${data.company}\nMessage: ${data.message}`,
      html: `
        <h3>New Website Lead</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <div style="margin-top: 10px; padding: 10px; background-color: #f4f4f4; border-radius: 5px;">
          <strong>Message:</strong><br/>
          ${data.message || 'No message provided.'}
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}