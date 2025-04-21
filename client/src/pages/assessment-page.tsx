import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import AssessmentHeader from "@/components/assessment/assessment-header";
import AssessmentCategories from "@/components/assessment/assessment-categories";
import AssessmentQuestion from "@/components/assessment/assessment-question";
import { AssessmentCategory, Question } from "@/types";

// Sample data for the assessment
const sampleQuestions: Record<AssessmentCategory, Question[]> = {
  "self-awareness": [
    {
      id: "sa1",
      text: "How well can you identify your emotions as you experience them?",
      min: 1,
      max: 5,
      minLabel: "Rarely",
      maxLabel: "Always"
    },
    {
      id: "sa2",
      text: "How often do you reflect on why you feel certain emotions?",
      min: 1,
      max: 5,
      minLabel: "Rarely",
      maxLabel: "Always"
    },
    {
      id: "sa3",
      text: "How aware are you of your strengths and weaknesses?",
      min: 1,
      max: 5,
      minLabel: "Not at all",
      maxLabel: "Very aware"
    }
  ],
  "self-regulation": [
    {
      id: "sr1",
      text: "How well can you control impulsive feelings and behaviors?",
      min: 1,
      max: 5,
      minLabel: "Poorly",
      maxLabel: "Very well"
    },
    {
      id: "sr2",
      text: "How often do you adapt to changing circumstances?",
      min: 1,
      max: 5,
      minLabel: "Rarely",
      maxLabel: "Always"
    }
  ],
  "motivation": [
    {
      id: "m1",
      text: "How often do you persevere in the face of setbacks and obstacles?",
      min: 1,
      max: 5,
      minLabel: "Rarely",
      maxLabel: "Always"
    },
    {
      id: "m2",
      text: "How committed are you to pursuing goals despite challenges?",
      min: 1,
      max: 5,
      minLabel: "Not at all",
      maxLabel: "Very committed"
    }
  ],
  "empathy": [
    {
      id: "e1",
      text: "How well do you understand the emotional needs of others?",
      min: 1,
      max: 5,
      minLabel: "Poorly",
      maxLabel: "Very well"
    },
    {
      id: "e2",
      text: "How attentive are you to emotional cues from others?",
      min: 1,
      max: 5,
      minLabel: "Not at all",
      maxLabel: "Very attentive"
    }
  ],
  "social-skills": [
    {
      id: "ss1",
      text: "How effective are you at managing and resolving conflicts?",
      min: 1,
      max: 5,
      minLabel: "Not effective",
      maxLabel: "Very effective"
    },
    {
      id: "ss2",
      text: "How comfortable are you working collaboratively in teams?",
      min: 1,
      max: 5,
      minLabel: "Not comfortable",
      maxLabel: "Very comfortable"
    }
  ]
};

export default function AssessmentPage() {
  const [activeCategory, setActiveCategory] = useState<AssessmentCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQuestions = activeCategory ? sampleQuestions[activeCategory] : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = currentQuestions.length;
  
  const handleCategorySelect = (category: AssessmentCategory) => {
    setActiveCategory(category);
    setCurrentQuestionIndex(0);
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed the assessment for this category
      console.log("Assessment completed for", activeCategory);
      console.log("Answers:", answers);
      
      // Reset to category selection
      setActiveCategory(null);
    }
  };
  
  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="assessment" />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 py-6 lg:p-8 max-w-5xl mx-auto">
          <AssessmentHeader />
          
          {!activeCategory ? (
            <AssessmentCategories onSelectCategory={handleCategorySelect} />
          ) : (
            <AssessmentQuestion
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              categoryName={activeCategory}
              value={answers[currentQuestion.id] || 3}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </div>
      </main>
      
      <MobileNavigation activePage="assessment" />
    </div>
  );
}
