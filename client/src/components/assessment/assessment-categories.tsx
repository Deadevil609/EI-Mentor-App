import { Button } from "@/components/ui/button";
import { AssessmentCategory } from "@/types";

interface CategoryInfo {
  name: string;
  description: string;
  questions: number;
  color: string;
  textColor: string;
  borderColor: string;
  category: AssessmentCategory;
}

const categories: CategoryInfo[] = [
  {
    name: "Self-Awareness",
    description: "Understanding your own emotions and their impact",
    questions: 10,
    color: "bg-primary",
    textColor: "text-primary", 
    borderColor: "border-primary",
    category: "self-awareness"
  },
  {
    name: "Self-Regulation",
    description: "Managing emotions and adapting to changing circumstances",
    questions: 8,
    color: "bg-secondary",
    textColor: "text-secondary",
    borderColor: "border-secondary",
    category: "self-regulation"
  },
  {
    name: "Motivation",
    description: "Your drive to improve and achieve goals",
    questions: 7,
    color: "bg-tertiary",
    textColor: "text-tertiary",
    borderColor: "border-tertiary",
    category: "motivation"
  },
  {
    name: "Empathy",
    description: "Understanding and relating to others' emotions",
    questions: 9,
    color: "bg-[#FFD166]",
    textColor: "text-[#FFD166]",
    borderColor: "border-[#FFD166]",
    category: "empathy"
  },
  {
    name: "Social Skills",
    description: "Building and managing relationships effectively",
    questions: 8,
    color: "bg-neutral-700",
    textColor: "text-neutral-700",
    borderColor: "border-neutral-700",
    category: "social-skills"
  }
];

interface AssessmentCategoriesProps {
  onSelectCategory: (category: AssessmentCategory) => void;
}

export default function AssessmentCategories({ onSelectCategory }: AssessmentCategoriesProps) {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-4">Select a category to begin</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${category.borderColor}`}>
            <h3 className="font-semibold mb-1">{category.name}</h3>
            <p className="text-sm text-neutral-600 mb-3">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-500">{category.questions} questions</span>
              <Button 
                onClick={() => onSelectCategory(category.category)}
                className={`text-sm text-white px-3 py-1.5 ${category.color}`}
              >
                Start
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
