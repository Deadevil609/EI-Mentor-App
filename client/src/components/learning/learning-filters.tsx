import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LearningFiltersProps {
  selectedCategory: string;
  sortBy: string;
  durationFilter: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onDurationChange: (duration: string) => void;
}

export default function LearningFilters({
  selectedCategory,
  sortBy,
  durationFilter,
  onCategoryChange,
  onSortChange,
  onDurationChange
}: LearningFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex items-center">
        <span className="text-neutral-700 mr-2 text-sm font-medium">Filter:</span>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="text-sm border border-neutral-300 rounded-lg p-1.5 h-9 w-[130px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="self-awareness">Self-Awareness</SelectItem>
            <SelectItem value="self-regulation">Self-Regulation</SelectItem>
            <SelectItem value="motivation">Motivation</SelectItem>
            <SelectItem value="empathy">Empathy</SelectItem>
            <SelectItem value="social-skills">Social Skills</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center">
        <span className="text-neutral-700 mr-2 text-sm font-medium">Sort:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="text-sm border border-neutral-300 rounded-lg p-1.5 h-9 w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevant">Most Relevant</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center ml-auto">
        <span className="text-neutral-700 mr-2 text-sm font-medium">Duration:</span>
        <Select value={durationFilter} onValueChange={onDurationChange}>
          <SelectTrigger className="text-sm border border-neutral-300 rounded-lg p-1.5 h-9 w-[130px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Duration</SelectItem>
            <SelectItem value="short">Under 5 minutes</SelectItem>
            <SelectItem value="medium">5-15 minutes</SelectItem>
            <SelectItem value="long">Over 15 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
