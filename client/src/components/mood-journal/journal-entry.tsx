import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Available tags for journal entries
const availableTags = [
  "Work",
  "Family",
  "Relationships",
  "Health",
  "Friends",
  "School",
  "Personal Growth",
  "Hobbies"
];

interface JournalEntryProps {
  journalText: string;
  selectedTags: string[];
  onJournalTextChange: (text: string) => void;
  onTagToggle: (tag: string) => void;
  onSaveEntry: () => void;
}

export default function JournalEntry({
  journalText,
  selectedTags,
  onJournalTextChange,
  onTagToggle,
  onSaveEntry
}: JournalEntryProps) {
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  
  const handleAddNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag) && !selectedTags.includes(newTag)) {
      onTagToggle(newTag);
      setNewTag("");
      setShowAddTag(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h2 className="font-semibold mb-4">Journal Entry</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">What's on your mind?</label>
        <Textarea 
          value={journalText}
          onChange={(e) => onJournalTextChange(e.target.value)}
          placeholder="Write about your thoughts and feelings..."
          className="min-h-[120px]"
        />
      </div>
      
      <div className="mb-5">
        <label className="block text-sm font-medium text-neutral-700 mb-1">Tags (optional)</label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button 
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={cn(
                "text-sm rounded-full px-3 py-1.5",
                selectedTags.includes(tag)
                  ? "bg-primary/10 hover:bg-primary/20 text-primary"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              )}
            >
              {tag}
            </button>
          ))}
          
          {showAddTag ? (
            <div className="flex items-center">
              <input 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="New tag"
                className="text-sm border border-neutral-300 rounded-l-full p-1.5 outline-none"
              />
              <button 
                onClick={handleAddNewTag}
                className="text-sm bg-primary text-white rounded-r-full px-3 py-1.5"
              >
                Add
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAddTag(true)}
              className="text-sm border border-dashed border-neutral-400 text-neutral-600 rounded-full px-3 py-1.5"
            >
              + Add Tag
            </button>
          )}
        </div>
      </div>
      
      <Button 
        onClick={onSaveEntry}
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!journalText.trim()}
      >
        Save Entry
      </Button>
    </div>
  );
}
