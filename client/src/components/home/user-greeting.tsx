import { useAuth } from "@/hooks/use-auth";

export default function UserGreeting() {
  const { user } = useAuth();
  const username = user?.username || 'User';
  
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return `Good Morning, ${username} 👋`;
    } else if (currentHour < 18) {
      return `Good Afternoon, ${username} 👋`;
    } else {
      return `Good Evening, ${username} 👋`;
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-1">{getTimeBasedGreeting()}</h1>
      <p className="text-neutral-600">How are you feeling today?</p>
    </div>
  );
}
