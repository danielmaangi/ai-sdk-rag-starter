'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: string;
  content: string;
  toolInvocations?: any[];
}

export function ChatMessage({ role, content, toolInvocations }: ChatMessageProps) {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex items-start gap-4 py-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-lg px-4 py-2 max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {content.length > 0 ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <p className="italic font-light">
            {'calling tool: ' + toolInvocations?.[0]?.toolName}
          </p>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-muted">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
