import { Bookmark, Clock, Play, Users } from "lucide-react";
import { useState } from "react";
import { LearningItem } from "@/types";

interface LearningContentProps {
  content: LearningItem[];
}

// Helper to get content type badge color
const getTypeColor = (type: string): string => {
  switch (type) {
    case "video": return "bg-primary/80";
    case "article": return "bg-secondary/80";
    case "exercise": return "bg-tertiary/80";
    case "podcast": return "bg-[#FFD166]/80";
    default: return "bg-neutral-700/80";
  }
};

// Helper to get category badge color
const getCategoryColor = (category: string): string => {
  switch (category) {
    case "self-awareness": return "bg-primary/10 text-primary";
    case "self-regulation": return "bg-secondary/10 text-secondary";
    case "motivation": return "bg-[#FFD166]/10 text-[#FFD166]";
    case "empathy": return "bg-tertiary/10 text-tertiary";
    case "social-skills": return "bg-primary/10 text-primary";
    default: return "bg-neutral-100 text-neutral-700";
  }
};

// Helper to get category display name
const getCategoryDisplayName = (category: string): string => {
  switch (category) {
    case "self-awareness": return "Self-Awareness";
    case "self-regulation": return "Self-Regulation";
    case "motivation": return "Motivation";
    case "empathy": return "Empathy";
    case "social-skills": return "Social Skills";
    default: return "General";
  }
};

export default function LearningContent({ content }: LearningContentProps) {
  const [savedItems, setSavedItems] = useState<string[]>([]);
  
  const toggleSaveItem = (id: string) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(item => item !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };
  
  if (content.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow-sm">
        <div className="text-neutral-400 text-4xl mb-3">📚</div>
        <h3 className="text-lg font-medium mb-1">No content matches your filters</h3>
        <p className="text-neutral-600">Try adjusting your filters to see more content</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {content.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title} 
              className="h-40 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div className={`text-white text-xs px-2 py-1 ${getTypeColor(item.type)} rounded-full`}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className={`text-xs ${getCategoryColor(item.category)} rounded-full px-2.5 py-1 w-fit mb-2`}>
              {getCategoryDisplayName(item.category)}
            </div>
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center">
                {item.type === "video" && <Play className="h-3 w-3 mr-1" />}
                {item.type === "article" && <Clock className="h-3 w-3 mr-1" />}
                {item.type === "exercise" && <Users className="h-3 w-3 mr-1" />}
                {item.type === "podcast" && <Play className="h-3 w-3 mr-1" />}
                
                {item.type === "exercise" 
                  ? "Group activity" 
                  : `${item.duration} min ${item.type}`
                }
              </div>
              <button 
                className={savedItems.includes(item.id) ? "text-primary" : "text-neutral-500 hover:text-primary"}
                onClick={() => toggleSaveItem(item.id)}
              >
                <Bookmark className="h-4 w-4" fill={savedItems.includes(item.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
