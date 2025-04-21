import { apiRequest } from "./queryClient";
import { Message } from "@/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

// System prompt that defines the AI Mentor's personality and capabilities
const SYSTEM_PROMPT = `
You are an Emotional Intelligence (EI) Mentor, designed to help users improve their emotional intelligence skills. 
Your purpose is to provide guidance, support, and practical advice in these key areas:

1. Self-awareness: Helping users identify and understand their emotions
2. Self-regulation: Assisting users in managing their emotions effectively
3. Motivation: Supporting users in finding intrinsic motivation
4. Empathy: Helping users understand and relate to others' emotions
5. Social skills: Providing guidance on interpersonal communication and relationship building

Your tone should be supportive, empathetic, and professional. You should ask thoughtful questions to deepen the user's 
self-reflection and provide evidence-based techniques for developing emotional intelligence.

When appropriate, you should:
- Acknowledge the user's emotions
- Provide specific, actionable advice
- Suggest relevant exercises or practices
- Reference established EI concepts and techniques

Keep your responses concise and focused on the user's needs. Avoid generic platitudes and focus on personalized guidance.
`;

/**
 * Sends a message to the AI Mentor and returns the response
 * 
 * @param messages Previous conversation messages
 * @param newMessage The new user message to send
 * @returns Promise with the AI response message
 */
export async function sendMessageToAIMentor(
  messages: Message[],
  newMessage: string
): Promise<Message> {
  try {
    // Format messages for the API
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: newMessage }
    ];

    // Call our backend API that will handle the OpenAI request
    const response = await apiRequest("POST", "/api/ai-mentor/chat", {
      messages: formattedMessages,
      model: MODEL
    });
    
    const data = await response.json();
    
    // Return the assistant's response message
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: data.content
    };
  } catch (error) {
    console.error("Error sending message to AI Mentor:", error);
    throw new Error("Failed to get a response from the AI Mentor. Please try again.");
  }
}

/**
 * Analyzes the sentiment of journal entry text
 * 
 * @param text Journal entry text to analyze
 * @returns Promise with sentiment analysis result
 */
export async function analyzeSentiment(text: string): Promise<{
  mood: MoodType;
  intensity: number;
  summary: string;
}> {
  try {
    const response = await apiRequest("POST", "/api/ai-mentor/analyze", { text });
    return await response.json();
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Failed to analyze your journal entry. Please try again.");
  }
}

/**
 * Gets a daily EI challenge recommendation
 * 
 * @param category Optional category to focus on
 * @returns Promise with challenge data
 */
export async function getDailyChallenge(category?: AssessmentCategory): Promise<{
  text: string;
  category: AssessmentCategory;
}> {
  try {
    const response = await apiRequest("GET", `/api/ai-mentor/challenge${category ? `?category=${category}` : ''}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting daily challenge:", error);
    throw new Error("Failed to get your daily challenge. Please try again.");
  }
}
