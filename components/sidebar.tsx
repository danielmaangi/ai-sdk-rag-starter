'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface SidebarProps {
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="flex flex-col h-full">
          <div className="px-4 py-6">
            <h2 className="text-lg font-semibold">RAG Chatbot</h2>
            <p className="text-sm text-gray-500 mt-1">
              Your personal knowledge base
            </p>
          </div>
          <div className="flex-1 px-4">
            {children || (
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">How to use</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Add information with statements</li>
                    <li>• Ask questions about what you've added</li>
                    <li>• Build your knowledge base over time</li>
                  </ul>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Example</h3>
                  <p className="mt-2 text-sm">
                    Try saying: "The capital of France is Paris."
                  </p>
                  <p className="mt-2 text-sm">
                    Then ask: "What is the capital of France?"
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-6 border-t">
            <p className="text-xs text-gray-500">
              Built with Vercel AI SDK and OpenAI
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
