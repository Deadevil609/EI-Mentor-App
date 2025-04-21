import Sidebar from "@/components/layout/sidebar";
import MobileNavigation from "@/components/layout/mobile-navigation";
import UserGreeting from "@/components/home/user-greeting";
import QuickMoodTracker from "@/components/home/quick-mood-tracker";
import DailyChallenge from "@/components/home/daily-challenge";
import QuickLinks from "@/components/home/quick-links";
import RecommendedContent from "@/components/home/recommended-content";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar activePage="home" />
      
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 py-6 lg:p-8 max-w-5xl mx-auto">
          <UserGreeting />
          <QuickMoodTracker />
          <DailyChallenge />
          <QuickLinks />
          <RecommendedContent />
        </div>
      </main>
      
      <MobileNavigation activePage="home" />
    </div>
  );
}
