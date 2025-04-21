import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import ProgressHeader from "@/components/progress/progress-header";
import EIRadarChart from "@/components/progress/ei-radar-chart";
import CompletedChallenges from "@/components/progress/completed-challenges";
import ActiveGoals from "@/components/progress/active-goals";
import { useState } from "react";
import { Challenge, Goal } from "@/types";

// Sample data for completed challenges
const sampleChallenges: Challenge[] = [
  {
    id: "1",
    title: "Practice active listening for 3 conversations",
    description: "Focus on the speaker without interrupting or planning your response.",
    completedDate: "May 15, 2023",
    category: "empathy"
  },
  {
    id: "2",
    title: "Journal your emotions daily for one week",
    description: "Record what you felt, what triggered it, and how you responded.",
    completedDate: "May 8, 2023",
    category: "self-awareness"
  },
  {
    id: "3",
    title: "Practice deep breathing during stressful moments",
    description: "Use the 4-7-8 breathing technique when feeling stressed or anxious.",
    completedDate: "May 2, 2023",
    category: "self-regulation"
  }
];

// Sample data for active goals
const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Improve empathy score by 20%",
    progress: 35,
    targetDate: "July 30, 2023",
    nextSteps: [
      "Complete \"Understanding Others' Perspectives\" exercise",
      "Practice reflective listening in 3 conversations"
    ],
    category: "empathy"
  },
  {
    id: "2",
    title: "Practice self-regulation during conflicts",
    progress: 60,
    targetDate: "June 15, 2023",
    nextSteps: [
      "Use pause technique when feeling upset",
      "Complete \"Emotional Regulation\" module"
    ],
    category: "self-regulation"
  }
];

// Sample EI scores
const sampleEIScores = {
  "self-awareness": 75,
  "self-regulation": 68,
  "motivation": 82,
  "empathy": 62,
  "social-skills": 58
};

export default function ProgressPage() {
  const [challenges] = useState<Challenge[]>(sampleChallenges);
  const [goals] = useState<Goal[]>(sampleGoals);
  const [eiScores] = useState(sampleEIScores);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="progress" />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 py-6 lg:p-8 max-w-5xl mx-auto">
          <ProgressHeader />
          <EIRadarChart scores={eiScores} />
          <CompletedChallenges challenges={challenges} />
          <ActiveGoals goals={goals} />
        </div>
      </main>
      
      <MobileNavigation activePage="progress" />
    </div>
  );
}
