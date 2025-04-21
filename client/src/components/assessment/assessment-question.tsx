import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Question, AssessmentCategory } from "@/types";

// Helper to get category display name
const getCategoryDisplayName = (category: AssessmentCategory): string => {
  switch (category) {
    case "self-awareness": return "Self-Awareness";
    case "self-regulation": return "Self-Regulation";
    case "motivation": return "Motivation";
    case "empathy": return "Empathy";
    case "social-skills": return "Social Skills";
  }
};

interface AssessmentQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  categoryName: AssessmentCategory;
  value: number;
  onValueChange: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function AssessmentQuestion({
  question,
  currentIndex,
  totalQuestions,
  categoryName,
  value,
  onValueChange,
  onPrevious,
  onNext
}: AssessmentQuestionProps) {
  
  const handleSliderChange = (values: number[]) => {
    onValueChange(values[0]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg">{getCategoryDisplayName(categoryName)} Assessment</h2>
          <div className="text-neutral-600">Question {currentIndex + 1} of {totalQuestions}</div>
        </div>
        
        <h3 className="text-lg mb-4">{question.text}</h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <Slider 
              value={[value]} 
              min={question.min} 
              max={question.max} 
              step={1}
              onValueChange={handleSliderChange}
            />
          </div>
          <div className="flex justify-between text-sm">
            {Array.from({ length: question.max - question.min + 1 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="text-neutral-600 mb-1">{i + question.min}</div>
                {i === 0 && (
                  <div className="text-neutral-500 text-xs">{question.minLabel}</div>
                )}
                {i === question.max - question.min && (
                  <div className="text-neutral-500 text-xs">{question.maxLabel}</div>
                )}
                {i !== 0 && i !== question.max - question.min && i === Math.floor((question.max - question.min) / 2) && (
                  <div className="text-neutral-500 text-xs">Moderate</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button onClick={onNext}>
            {currentIndex < totalQuestions - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
