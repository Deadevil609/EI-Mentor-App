import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import MoodTrackerHeader from "@/components/mood-journal/mood-tracker-header";
import MoodSelector from "@/components/mood-journal/mood-selector";
import JournalEntry from "@/components/mood-journal/journal-entry";
import MoodTimeline from "@/components/mood-journal/mood-timeline";
import { useState } from "react";
import { MoodType } from "@/types";

export default function MoodJournalPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [journalText, setJournalText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
  };

  const handleJournalTextChange = (text: string) => {
    setJournalText(text);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveEntry = () => {
    if (!selectedMood) return;
    
    // In a real app, this would save to the backend
    console.log("Saving entry:", {
      mood: selectedMood,
      intensity,
      journalText,
      tags: selectedTags,
      date: new Date()
    });
    
    // Reset form
    setJournalText("");
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="mood-journal" />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 py-6 lg:p-8 max-w-5xl mx-auto">
          <MoodTrackerHeader />
          
          <MoodSelector 
            selectedMood={selectedMood} 
            intensity={intensity}
            onMoodSelect={handleMoodSelect}
            onIntensityChange={handleIntensityChange}
          />
          
          <JournalEntry 
            journalText={journalText}
            selectedTags={selectedTags}
            onJournalTextChange={handleJournalTextChange}
            onTagToggle={handleTagToggle}
            onSaveEntry={handleSaveEntry}
          />
          
          <MoodTimeline />
        </div>
      </main>
      
      <MobileNavigation activePage="mood-journal" />
    </div>
  );
}
