import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CHALLENGE_TEXT = "Practice active listening today. When speaking with others, focus entirely on what they're saying without planning your response.";

export default function DailyChallenge() {
  const [isAccepted, setIsAccepted] = useState(false);
  const { toast } = useToast();
  
  const handleAcceptChallenge = () => {
    setIsAccepted(true);
    
    toast({
      title: "Challenge accepted!",
      description: "You'll receive a reminder about this challenge later today.",
    });
  };
  
  const handleSkipChallenge = () => {
    toast({
      title: "Challenge skipped",
      description: "We'll show you a new challenge tomorrow.",
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl shadow-sm p-5 text-white mb-6">
      <div className="flex justify-between items-start mb-3">
        <h2 className="font-semibold text-lg">Today's Challenge</h2>
        <span className="text-xs bg-white/20 rounded-full px-2 py-1">Daily</span>
      </div>
      <p className="mb-4">{CHALLENGE_TEXT}</p>
      <div className="flex justify-between items-center">
        <button 
          className={`${isAccepted ? 'bg-green-500' : 'bg-white text-primary hover:bg-neutral-100'} rounded-lg px-4 py-2 font-medium text-sm flex items-center transition-colors`}
          onClick={handleAcceptChallenge}
          disabled={isAccepted}
        >
          {isAccepted ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Challenge Accepted
            </>
          ) : (
            'Accept Challenge'
          )}
        </button>
        {!isAccepted && (
          <button 
            className="text-white/80 hover:text-white text-sm underline"
            onClick={handleSkipChallenge}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
