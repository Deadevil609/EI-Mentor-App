// User related types
export interface User {
  id: number;
  username: string;
}

// Message types for AI mentor
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Mood and journal types
export type MoodType = "happy" | "sad" | "angry" | "anxious" | "calm";

export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number;
  date: Date;
  userId: number;
}

export interface JournalEntry {
  id: string;
  text: string;
  tags: string[];
  mood?: MoodType;
  moodIntensity?: number;
  date: Date;
  userId: number;
}

// Assessment types
export type AssessmentCategory = "self-awareness" | "self-regulation" | "motivation" | "empathy" | "social-skills";

export interface Question {
  id: string;
  text: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface AssessmentResult {
  id: string;
  category: AssessmentCategory;
  score: number;
  date: Date;
  userId: number;
}

// Learning content types
export type ContentType = "video" | "article" | "exercise" | "podcast";

export interface LearningItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ContentType;
  duration: number;
  image: string;
}

// Progress tracking types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  completedDate: string;
  category: string;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
  targetDate: string;
  nextSteps: string[];
  category: string;
}
