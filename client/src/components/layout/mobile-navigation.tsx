import { Link, useLocation } from "wouter";
import { 
  Home, 
  MessageCircle, 
  Book, 
  GraduationCap, 
  User, 
  BarChartBig,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activePage: string;
}

export default function MobileNavigation({ activePage }: MobileNavigationProps) {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path || activePage === path.replace('/', '');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-10">
      <div className="flex justify-around">
        <Link href="/">
          <a className={cn(
            "flex flex-col items-center p-3", 
            isActive("/") ? "text-primary" : "text-neutral-600"
          )}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </a>
        </Link>
        
        <Link href="/ai-mentor">
          <a className={cn(
            "flex flex-col items-center p-3", 
            isActive("/ai-mentor") ? "text-primary" : "text-neutral-600"
          )}>
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs mt-1">AI Mentor</span>
          </a>
        </Link>
        
        <Link href="/mood-journal">
          <a className={cn(
            "flex flex-col items-center p-3", 
            isActive("/mood-journal") ? "text-primary" : "text-neutral-600"
          )}>
            <Book className="h-5 w-5" />
            <span className="text-xs mt-1">Journal</span>
          </a>
        </Link>
        
        <Link href="/assessment">
          <a className={cn(
            "flex flex-col items-center p-3", 
            isActive("/assessment") ? "text-primary" : "text-neutral-600"
          )}>
            <ClipboardCheck className="h-5 w-5" />
            <span className="text-xs mt-1">Assessment</span>
          </a>
        </Link>
        
        <Link href="/learning-hub">
          <a className={cn(
            "flex flex-col items-center p-3", 
            isActive("/learning-hub") ? "text-primary" : "text-neutral-600"
          )}>
            <GraduationCap className="h-5 w-5" />
            <span className="text-xs mt-1">Learn</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
