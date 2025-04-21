import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Message } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Common queries that users might want to ask
const suggestionQueries = [
  "How to manage anxiety?",
  "Teach me active listening",
  "Help with conflict resolution",
  "Improve empathy"
];

interface ChatSuggestionsProps {
  onSendMessage: (message: Omit<Message, "id">) => void;
}

export default function ChatSuggestions({ onSendMessage }: ChatSuggestionsProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    onSendMessage({
      role: "user",
      content: inputValue
    });
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a delay and response
      setTimeout(() => {
        onSendMessage({
          role: "assistant",
          content: getSimulatedResponse(inputValue)
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
    
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage({
      role: "user",
      content: suggestion
    });
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      onSendMessage({
        role: "assistant",
        content: getSimulatedResponse(suggestion)
      });
      setIsLoading(false);
    }, 1000);
  };

  // This is a temporary simulation - in the real app this would be replaced with the actual AI response
  const getSimulatedResponse = (query: string): string => {
    if (query.toLowerCase().includes("anxiety")) {
      return "Managing anxiety is about developing healthy coping mechanisms. Here are some techniques:\n\n1. Deep breathing exercises\n2. Progressive muscle relaxation\n3. Mindfulness meditation\n4. Physical exercise\n5. Identifying and challenging anxious thoughts\n\nWould you like me to explain any of these in more detail?";
    } else if (query.toLowerCase().includes("listening")) {
      return "Active listening is a key skill for emotional intelligence. Here's how to practice it:\n\n• Focus fully on the speaker\n• Avoid planning your response while they speak\n• Ask clarifying questions\n• Paraphrase to confirm understanding\n• Pay attention to non-verbal cues\n\nWould you like to try a quick active listening exercise?";
    } else if (query.toLowerCase().includes("conflict")) {
      return "Conflict resolution skills help maintain healthy relationships. Try this approach:\n\n1. Choose the right time and place\n2. Use 'I' statements to express feelings\n3. Listen to understand, not to respond\n4. Focus on the specific issue, not personality\n5. Look for compromise and common ground\n\nDo you have a specific conflict situation you'd like help with?";
    } else if (query.toLowerCase().includes("empathy")) {
      return "Empathy is the ability to understand others' emotions and perspectives. To improve:\n\n• Practice active listening\n• Ask open questions about others' experiences\n• Imagine yourself in their situation\n• Notice non-verbal cues\n• Validate others' feelings even when you disagree\n\nWould you like to discuss a specific situation where you want to show more empathy?";
    } else {
      return "That's an interesting question about emotional intelligence. Would you like to explore this topic together? I can help with understanding emotions, improving self-awareness, building better relationships, or managing emotional challenges.";
    }
  };

  return (
    <div className="bg-white p-3 border-t border-neutral-200">
      <div className="hide-scroll overflow-x-auto -mx-2 px-2 mb-3">
        <div className="flex space-x-2" style={{ width: "fit-content" }}>
          {suggestionQueries.map((suggestion, index) => (
            <button 
              key={index} 
              className="text-sm bg-neutral-100 hover:bg-neutral-200 rounded-full px-4 py-2 whitespace-nowrap"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center bg-neutral-100 rounded-full p-1 pl-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..." 
          className="flex-1 bg-transparent outline-none text-neutral-700" 
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50"
          disabled={!inputValue.trim() || isLoading}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
