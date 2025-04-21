import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types";

const moods: Array<{ type: MoodType; emoji: string; label: string }> = [
  { type: "happy", emoji: "😊", label: "Happy" },
  { type: "sad", emoji: "😔", label: "Sad" },
  { type: "angry", emoji: "😠", label: "Angry" },
  { type: "anxious", emoji: "😰", label: "Anxious" },
  { type: "calm", emoji: "😌", label: "Calm" }
];

export default function QuickMoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const { toast } = useToast();
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    // In a real app, this would save to the backend
    toast({
      title: "Mood tracked!",
      description: `You're feeling ${mood} today.`,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <h2 className="font-semibold mb-3 text-lg">Track your mood</h2>
      <div className="flex justify-between">
        {moods.map((mood) => (
          <button 
            key={mood.type}
            className="mood-emoji flex flex-col items-center p-2"
            onClick={() => handleMoodSelect(mood.type)}
          >
            <div className="text-3xl mb-1">{mood.emoji}</div>
            <span className="text-xs text-neutral-600">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
