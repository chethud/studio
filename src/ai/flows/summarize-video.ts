// SummarizeVideo story implementation.
'use server';
/**
 * @fileOverview Summarizes video content to provide main points.
 *
 * - summarizeVideo - A function that summarizes video content.
 * - SummarizeVideoInput - The input type for the summarizeVideo function.
 * - SummarizeVideoOutput - The return type for the summarizeVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      'The video file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* Suppress newline */
    ),
});
export type SummarizeVideoInput = z.infer<typeof SummarizeVideoInputSchema>;

const SummarizeVideoOutputSchema = z.object({
  summary: z.string().describe('A summary of the video content.'),
});
export type SummarizeVideoOutput = z.infer<typeof SummarizeVideoOutputSchema>;

export async function summarizeVideo(input: SummarizeVideoInput): Promise<SummarizeVideoOutput> {
  return summarizeVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeVideoPrompt',
  input: {schema: SummarizeVideoInputSchema},
  output: {schema: SummarizeVideoOutputSchema},
  prompt: `You are an expert summarizer of video content.  You will watch the video provided, and provide a summary of the contents. Use the following as the primary source of information about the video.

Video: {{media url=videoDataUri}}

Summary:`, /* Suppress newline */
});

const summarizeVideoFlow = ai.defineFlow(
  {
    name: 'summarizeVideoFlow',
    inputSchema: SummarizeVideoInputSchema,
    outputSchema: SummarizeVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
