'use client';

import { useChat } from '@ai-sdk/react';
import { Sidebar } from '@/components/sidebar';
import { ChatMessage } from '@/components/chat-message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
  });
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-screen">
        <header className="sticky top-0 z-10 border-b bg-background p-4">
          <h1 className="text-xl font-semibold text-center">RAG Chatbot</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-2xl mx-auto space-y-4 pt-4 pb-24">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-lg font-medium">Welcome to your RAG Chatbot!</h2>
                <p className="text-muted-foreground mt-2">
                  Start by adding some information to your knowledge base.
                </p>
              </div>
            ) : (
              messages.map(m => (
                <ChatMessage 
                  key={m.id} 
                  role={m.role} 
                  content={m.content} 
                  toolInvocations={m.toolInvocations} 
                />
              ))
            )}
          </div>
        </main>
        
        <footer className="sticky bottom-0 border-t bg-background p-4">
          <form 
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question or add information..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
