import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Goal } from "@/types";
import { Progress } from "@/components/ui/progress";

interface ActiveGoalsProps {
  goals: Goal[];
}

// Helper function to get goal category color
const getGoalColor = (category: string): string => {
  switch (category) {
    case "self-awareness": return "bg-primary";
    case "self-regulation": return "bg-secondary";
    case "motivation": return "bg-[#FFD166]";
    case "empathy": return "bg-tertiary";
    case "social-skills": return "bg-neutral-700";
    default: return "bg-primary";
  }
};

export default function ActiveGoals({ goals }: ActiveGoalsProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Active Goals</h2>
          <Button size="sm" className="text-sm bg-primary flex items-center">
            <Plus className="h-4 w-4 mr-1" /> New Goal
          </Button>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">{goal.title}</h3>
              
              <Progress value={goal.progress} className={getGoalColor(goal.category)} />
              
              <div className="flex justify-between text-xs text-neutral-500 mt-1 mb-3">
                <span>{goal.progress}% complete</span>
                <span>Target: {goal.targetDate}</span>
              </div>
              
              <div className="text-sm text-neutral-600">
                <div className="font-medium mb-1">Next steps:</div>
                <ul className="list-disc list-inside">
                  {goal.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
          {goals.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              <div className="text-4xl mb-2">🎯</div>
              <p>You don't have any active goals yet.</p>
              <p className="text-sm mt-2">Set goals to track your emotional intelligence progress!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
