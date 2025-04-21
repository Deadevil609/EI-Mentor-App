import { useRef, useEffect } from "react";
import { Message } from "@/types";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "chat-bubble p-3",
                message.role === "user" 
                  ? "chat-bubble-user self-end bg-primary text-white rounded-2xl rounded-br-none" 
                  : "chat-bubble-ai self-start bg-neutral-200 text-neutral-900 rounded-2xl rounded-bl-none"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
