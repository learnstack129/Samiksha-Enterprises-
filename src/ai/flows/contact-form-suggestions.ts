'use server';

/**
 * @fileOverview A Genkit flow to provide AI-powered suggestions for the 'Service Required' field in the contact form.
 *
 * - getServiceSuggestions - A function that takes user input and suggests relevant services.
 * - ServiceSuggestionsInput - The input type for the getServiceSuggestions function.
 * - ServiceSuggestionsOutput - The return type for the getServiceSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ServiceSuggestionsInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input in the service required field.'),
});
export type ServiceSuggestionsInput = z.infer<typeof ServiceSuggestionsInputSchema>;

const ServiceSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested services based on the user input.'),
});
export type ServiceSuggestionsOutput = z.infer<typeof ServiceSuggestionsOutputSchema>;

export async function getServiceSuggestions(
  input: ServiceSuggestionsInput
): Promise<ServiceSuggestionsOutput> {
  return serviceSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'serviceSuggestionsPrompt',
  input: {schema: ServiceSuggestionsInputSchema},
  output: {schema: ServiceSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping users fill out a contact form on a civil and industrial contractor's website.
  The user is currently typing what services they require, and you will provide suggestions based on their input.
  The available services are:
  - POP Work (Plaster of Paris)
  - Painting & Commercial Polishing
  - Plumbing & Waterproofing
  - Aluminium & Glass Work
  - Industrial Sheds & Roofing
  - Heavy Structural Fabrication
  - Gates, Grills & Railings
  - Industrial Material Supply (Trading)
  - Corporate Printing Services

  Based on the user's input, suggest the 3 most relevant services from the list above.  Return the suggestions as an array of strings.

  User Input: {{{userInput}}}
  `,
});

const serviceSuggestionsFlow = ai.defineFlow(
  {
    name: 'serviceSuggestionsFlow',
    inputSchema: ServiceSuggestionsInputSchema,
    outputSchema: ServiceSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
