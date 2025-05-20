# Vercel AI SDK RAG Guide Starter Project

This is the starter project for the Vercel AI SDK [Retrieval-Augmented Generation (RAG) guide](https://sdk.vercel.ai/docs/guides/rag-chatbot).

In this project, you will build a chatbot that will only respond with information that it has within its knowledge base. The chatbot will be able to both store and retrieve information. This project has many interesting use cases from customer support through to building your own second brain!

## Tech Stack

- [Next.js](https://nextjs.org) 14 (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI](https://openai.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org/) with [ pgvector ](https://github.com/pgvector/pgvector)
- [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env` and set your database connection string
3. Run database migrations with `pnpm db:migrate`
4. Start the development server with `pnpm dev`

## Key Implementation Details

This project implements a RAG (Retrieval-Augmented Generation) system with the following components:

### Database Structure

- **Resources Table**: Stores the original content
- **Embeddings Table**: Stores vector embeddings of content chunks with a reference to the original resource

### RAG Implementation

1. **Content Storage**:
   - Content is added via the `addResource` tool
   - Content is chunked and embedded using OpenAI's embedding model
   - Embeddings are stored in the database

2. **Content Retrieval**:
   - The `getInformation` tool retrieves relevant content based on query similarity
   - Uses cosine similarity to find the most relevant content chunks

## Important Optimizations

The following optimizations have been made to improve the RAG implementation:

### 1. Enhanced Similarity Search

In `lib/ai/embedding.ts`:

```typescript
// Lowered similarity threshold for better matches
.where(gt(similarity, 0.3))

// Improved response format
return {
  results: similarGuides,
  message: `Found ${similarGuides.length} relevant pieces of information:`,
  information: similarGuides.map(guide => guide.name).join('\n\n')
};
```

### 2. Improved Model Instructions

In `app/api/chat/route.ts`:

```typescript
system: `You are a helpful assistant with access to a knowledge base.
For EVERY question, you MUST first call the getInformation tool to retrieve relevant information.

Always follow this process:
1. When user asks a question, call getInformation with their question
2. Review the returned information in the 'information' field of the response
3. If information is available, answer based ONLY on that information
4. If the response indicates no information is available, suggest that the user add information using the addResource tool
`
```

## How to Use the Chatbot

1. **First, add some information** to the knowledge base by making statements:
   ```
   The capital of France is Paris.
   ```

2. **Then ask questions** related to the information you've added:
   ```
   What is the capital of France?
   ```

3. **Build your knowledge base** by continuing to add information:
   ```
   Artificial intelligence is a field of computer science focused on creating machines that can perform tasks that typically require human intelligence.
   ```

The chatbot will:
- Store your information using the `addResource` tool
- Retrieve relevant information using the `getInformation` tool
- Provide responses based ONLY on the stored information
- Suggest adding information when nothing relevant is found
