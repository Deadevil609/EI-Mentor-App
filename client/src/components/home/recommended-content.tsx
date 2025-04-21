import { Link } from "wouter";
import { Clock, Play } from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  duration: number;
};

// Sample recommended content
const content: ContentItem[] = [
  {
    id: "1",
    title: "Understanding Your Emotional Triggers",
    description: "Learn to identify what causes your emotional reactions",
    category: "Self-Awareness",
    type: "article",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    duration: 8
  },
  {
    id: "2",
    title: "Managing Stress in the Workplace",
    description: "Practical techniques for handling work pressure",
    category: "Self-Regulation",
    type: "video",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    duration: 12
  },
  {
    id: "3",
    title: "Developing Empathy Through Active Listening",
    description: "Strengthen your connections with better listening skills",
    category: "Empathy",
    type: "podcast",
    image: "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    duration: 18
  }
];

// Helper function to get the background color based on category
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    "Self-Awareness": "bg-primary/10 text-primary",
    "Self-Regulation": "bg-secondary/10 text-secondary",
    "Empathy": "bg-tertiary/10 text-tertiary",
    "Motivation": "bg-[#FFD166]/10 text-[#FFD166]",
    "Social Skills": "bg-neutral-100 text-neutral-700"
  };
  
  return colors[category] || "bg-neutral-100 text-neutral-700";
};

export default function RecommendedContent() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recommended Learning</h2>
        <Link href="/learning-hub">
          <a className="text-primary text-sm">View all</a>
        </Link>
      </div>
      
      <div className="hide-scroll overflow-x-auto -mx-4 px-4">
        <div className="flex space-x-4" style={{ width: "fit-content" }}>
          {content.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm w-64 flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title} 
                className="h-32 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className={`text-xs ${getCategoryColor(item.category)} rounded-full px-2.5 py-1 w-fit mb-2`}>
                  {item.category}
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600 mb-3">{item.description}</p>
                <div className="flex items-center text-xs text-neutral-500">
                  {item.type === "video" ? (
                    <>
                      <Play className="h-3 w-3 mr-1" /> {item.duration} min video
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" /> {item.duration} min {item.type}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
