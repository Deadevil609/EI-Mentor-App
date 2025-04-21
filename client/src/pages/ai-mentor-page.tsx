import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import ChatHeader from "@/components/ai-mentor/chat-header";
import ChatMessages from "@/components/ai-mentor/chat-messages";
import ChatSuggestions from "@/components/ai-mentor/chat-suggestions";
import { useState } from "react";
import { Message } from "@/types";

export default function AImentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your EI Mentor. How can I help you today?"
    }
  ]);

  const addMessage = (newMessage: Omit<Message, "id">) => {
    const id = Date.now().toString();
    setMessages((prev) => [...prev, { ...newMessage, id }]);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="ai-mentor" />
      
      <main className="flex-1 h-screen flex flex-col">
        <ChatHeader />
        <ChatMessages messages={messages} />
        <ChatSuggestions onSendMessage={addMessage} />
      </main>
      
      <MobileNavigation activePage="ai-mentor" />
    </div>
  );
}
