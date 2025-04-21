import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./hooks/use-auth";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import AImentorPage from "@/pages/ai-mentor-page";
import MoodJournalPage from "@/pages/mood-journal-page";
import AssessmentPage from "@/pages/assessment-page";
import LearningHubPage from "@/pages/learning-hub-page";
import ProgressPage from "@/pages/progress-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/ai-mentor" component={AImentorPage} />
      <ProtectedRoute path="/mood-journal" component={MoodJournalPage} />
      <ProtectedRoute path="/assessment" component={AssessmentPage} />
      <ProtectedRoute path="/learning-hub" component={LearningHubPage} />
      <ProtectedRoute path="/progress" component={ProgressPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
