import { Link, useLocation } from "wouter";
import { 
  Home, 
  MessageCircle, 
  Book, 
  ClipboardCheck, 
  GraduationCap, 
  BarChart2, 
  Brain
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activePage: string;
}

export default function Sidebar({ activePage }: SidebarProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const isActive = (path: string) => {
    return location === path || activePage === path.replace('/', '');
  };

  return (
    <div className="hidden lg:flex lg:w-64 bg-white border-r border-neutral-200 flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-bold">EI Mentor</h1>
        </div>
        
        <nav>
          <ul className="space-y-1">
            <li>
              <Link href="/">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <Home className="h-5 w-5 mr-3" />
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/ai-mentor">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/ai-mentor") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <MessageCircle className="h-5 w-5 mr-3" />
                  <span>AI Mentor</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mood-journal">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/mood-journal") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <Book className="h-5 w-5 mr-3" />
                  <span>Mood & Journal</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/assessment">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/assessment") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <ClipboardCheck className="h-5 w-5 mr-3" />
                  <span>Assessment</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/learning-hub">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/learning-hub") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <GraduationCap className="h-5 w-5 mr-3" />
                  <span>Learning Hub</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/progress">
                <a className={cn(
                  "flex items-center p-3 rounded-lg font-medium",
                  isActive("/progress") 
                    ? "bg-neutral-100 text-primary" 
                    : "hover:bg-neutral-100 text-neutral-700"
                )}>
                  <BarChart2 className="h-5 w-5 mr-3" />
                  <span>Progress</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-neutral-200">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-sm">{user?.username || 'User'}</p>
            <button 
              onClick={() => logoutMutation.mutate()} 
              className="text-xs text-neutral-500 hover:text-neutral-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
