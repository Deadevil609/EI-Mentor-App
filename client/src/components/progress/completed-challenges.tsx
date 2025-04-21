import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Challenge } from "@/types";

interface CompletedChallengesProps {
  challenges: Challenge[];
}

export default function CompletedChallenges({ challenges }: CompletedChallengesProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <h2 className="font-semibold mb-4">Completed Challenges</h2>
        
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{challenge.title}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center text-xs text-neutral-500">
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Completed on {challenge.completedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {challenges.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              <div className="text-4xl mb-2">🏆</div>
              <p>You haven't completed any challenges yet.</p>
              <p className="text-sm mt-2">Check the home screen for today's challenge!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
