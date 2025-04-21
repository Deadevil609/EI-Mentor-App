import { ContentType } from "@/types";
import { cn } from "@/lib/utils";

interface LearningTabsProps {
  activeTab: ContentType | "all";
  onTabChange: (tab: ContentType | "all") => void;
}

export default function LearningTabs({ activeTab, onTabChange }: LearningTabsProps) {
  const tabs = [
    { id: "all", label: "All Content" },
    { id: "video", label: "Videos" },
    { id: "article", label: "Articles" },
    { id: "exercise", label: "Exercises" },
    { id: "podcast", label: "Podcasts" }
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-neutral-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as ContentType | "all")}
              className={cn(
                "py-2 px-4 border-b-2 font-medium",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
