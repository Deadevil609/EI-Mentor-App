import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { MoodType } from "@/types";

const moods: Array<{ type: MoodType; emoji: string; label: string }> = [
  { type: "happy", emoji: "😊", label: "Happy" },
  { type: "sad", emoji: "😔", label: "Sad" },
  { type: "angry", emoji: "😠", label: "Angry" },
  { type: "anxious", emoji: "😰", label: "Anxious" },
  { type: "calm", emoji: "😌", label: "Calm" }
];

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  intensity: number;
  onMoodSelect: (mood: MoodType) => void;
  onIntensityChange: (value: number) => void;
}

export default function MoodSelector({ 
  selectedMood, 
  intensity, 
  onMoodSelect, 
  onIntensityChange 
}: MoodSelectorProps) {
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h2 className="font-semibold mb-4">How are you feeling right now?</h2>
      
      <div className="grid grid-cols-5 gap-2 mb-5">
        {moods.map((mood) => (
          <button 
            key={mood.type}
            className={cn(
              "mood-emoji flex flex-col items-center p-3",
              selectedMood === mood.type && "border-2 border-primary rounded-lg"
            )}
            onClick={() => onMoodSelect(mood.type)}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <span className="text-sm">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Intensity</label>
        <Slider 
          value={[intensity]} 
          min={1} 
          max={10} 
          step={1}
          onValueChange={(value) => onIntensityChange(value[0])}
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>Mild</span>
          <span>Moderate</span>
          <span>Strong</span>
        </div>
      </div>
    </div>
  );
}
