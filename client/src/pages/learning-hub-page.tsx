import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import LearningHeader from "@/components/learning/learning-header";
import LearningTabs from "@/components/learning/learning-tabs";
import LearningFilters from "@/components/learning/learning-filters";
import LearningContent from "@/components/learning/learning-content";
import { ContentType, LearningItem } from "@/types";

// Sample content data
const sampleContent: LearningItem[] = [
  {
    id: "1",
    title: "Building Better Conversations: Active Listening Workshop",
    description: "Learn powerful techniques to become a better listener and communicator",
    category: "social-skills", 
    type: "video",
    duration: 18,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: "2",
    title: "Managing Difficult Emotions in the Workplace",
    description: "Strategies for handling frustration, anger, and anxiety in professional settings",
    category: "self-regulation",
    type: "article",
    duration: 10,
    image: "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"
  },
  {
    id: "3",
    title: "Team Empathy Exercise: Walking in Someone Else's Shoes",
    description: "Interactive exercise to develop deeper understanding of others' perspectives",
    category: "empathy",
    type: "exercise",
    duration: 15,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: "4",
    title: "The Science of Emotional Intelligence",
    description: "Latest research on how emotional intelligence affects personal and professional success",
    category: "self-awareness",
    type: "podcast",
    duration: 25,
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "5",
    title: "Motivating Yourself and Others: The EI Approach",
    description: "How to use emotional intelligence to stay motivated and inspire your team",
    category: "motivation",
    type: "article",
    duration: 12,
    image: "https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
  },
  {
    id: "6",
    title: "Reading Nonverbal Cues: A Visual Guide",
    description: "Learn to identify and interpret body language, facial expressions and more",
    category: "empathy",
    type: "video",
    duration: 15,
    image: "https://images.unsplash.com/photo-1572878298551-2ed1c605898f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

export default function LearningHubPage() {
  const [activeTab, setActiveTab] = useState<ContentType | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevant");
  const [durationFilter, setDurationFilter] = useState<string>("any");
  
  // Apply filters to content
  const filteredContent = sampleContent.filter(item => {
    // Filter by type
    if (activeTab !== "all" && item.type !== activeTab) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    
    // Filter by duration
    if (durationFilter === "short" && item.duration >= 5) {
      return false;
    } else if (durationFilter === "medium" && (item.duration < 5 || item.duration > 15)) {
      return false;
    } else if (durationFilter === "long" && item.duration <= 15) {
      return false;
    }
    
    return true;
  });
  
  // Sort content
  const sortedContent = [...filteredContent].sort((a, b) => {
    if (sortBy === "newest") {
      return parseInt(b.id) - parseInt(a.id); // Using ID as proxy for date in this example
    } else if (sortBy === "popular") {
      return b.duration - a.duration; // Using duration as proxy for popularity in this example
    }
    return 0; // Default to original order for "relevant"
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="learning-hub" />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 py-6 lg:p-8 max-w-5xl mx-auto">
          <LearningHeader />
          
          <LearningTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <LearningFilters
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            durationFilter={durationFilter}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
            onDurationChange={setDurationFilter}
          />
          
          <LearningContent content={sortedContent} />
        </div>
      </main>
      
      <MobileNavigation activePage="learning-hub" />
    </div>
  );
}
