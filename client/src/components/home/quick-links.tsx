import { Link } from "wouter";
import { 
  MessageCircle, 
  Book, 
  ClipboardCheck, 
  BarChart2 
} from "lucide-react";

export default function QuickLinks() {
  const links = [
    {
      title: "AI Mentor",
      description: "Chat with your EI guide",
      icon: <MessageCircle className="text-secondary" />,
      path: "/ai-mentor",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Journal",
      description: "Record your thoughts",
      icon: <Book className="text-tertiary" />,
      path: "/mood-journal",
      bgColor: "bg-tertiary/10",
    },
    {
      title: "Assessment",
      description: "Gauge your EI levels",
      icon: <ClipboardCheck className="text-primary" />,
      path: "/assessment",
      bgColor: "bg-primary/10",
    },
    {
      title: "Progress",
      description: "Track your growth",
      icon: <BarChart2 className="text-[#FFD166]" />,
      path: "/progress",
      bgColor: "bg-[#FFD166]/10",
    }
  ];

  return (
    <>
      <h2 className="font-semibold text-lg mb-3">Quick Access</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {links.map((link, index) => (
          <Link key={index} href={link.path}>
            <a className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
              <div className={`h-12 w-12 rounded-full ${link.bgColor} flex items-center justify-center mb-2`}>
                {link.icon}
              </div>
              <h3 className="font-medium">{link.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">{link.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}
