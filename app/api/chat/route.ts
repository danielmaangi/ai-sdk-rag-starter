import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are a helpful assistant with access to a knowledge base.
    For EVERY question, you MUST first call the getInformation tool to retrieve relevant information.
    
    Always follow this process:
    1. When user asks a question, call getInformation with their question
    2. Review the returned information in the 'information' field of the response
    3. If information is available, answer based ONLY on that information
    4. If the response indicates no information is available, suggest that the user add information using the addResource tool
    
    When responding:
    - Be helpful and concise
    - Use ONLY the information provided in the getInformation response
    - Do not make up information or use your general knowledge
    - If the user is adding information with statements rather than questions, use the addResource tool to store it`,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `Use this tool to search your knowledge base for information relevant to the user's question.
        You MUST call this tool for EVERY question before attempting to answer.
        This tool will return the most relevant information from your knowledge base.`,
        parameters: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
