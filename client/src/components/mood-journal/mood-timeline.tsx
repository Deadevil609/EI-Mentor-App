import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for visualization
const moodData = [
  { day: "Mon", mood: "happy", intensity: 70 },
  { day: "Tue", mood: "happy", intensity: 55 },
  { day: "Wed", mood: "anxious", intensity: 85 },
  { day: "Thu", mood: "calm", intensity: 40 },
  { day: "Fri", mood: "calm", intensity: 30 },
  { day: "Sat", mood: "happy", intensity: 60 },
  { day: "Sun", mood: "calm", intensity: 45 }
];

// Helper to get the color class based on mood
const getMoodColor = (mood: string): string => {
  switch (mood) {
    case "happy": return "bg-[#FFD166]";
    case "sad": return "bg-[#3F88C5]";
    case "anxious": return "bg-[#E65F5C]";
    case "angry": return "bg-[#E53935]";
    case "calm": return "bg-[#1EA896]";
    default: return "bg-[#9CA3AF]";
  }
};

export default function MoodTimeline() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Your Mood Timeline</h2>
        <Select defaultValue="week">
          <SelectTrigger className="w-[130px] text-sm">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="3months">Past 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-52 flex items-end mb-2">
        <div className="w-full h-full flex items-end justify-between">
          {moodData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`${getMoodColor(day.mood)} w-10 rounded-t-lg`} 
                style={{ height: `${day.intensity}%` }}
              />
              <div className="text-xs text-neutral-500 mt-1">{day.day}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-sm text-neutral-600">
        <p>Your mood has been mostly <strong>positive</strong> this week!</p>
      </div>
    </div>
  );
}
