import { Link } from "wouter";
import { ArrowLeft, Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="bg-white border-b border-neutral-200 p-4 flex items-center sticky top-0 z-10">
      <Link href="/">
        <a className="lg:hidden mr-3 text-neutral-600">
          <ArrowLeft className="h-5 w-5" />
        </a>
      </Link>
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
        <Bot className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="font-semibold">EI Mentor</h2>
        <p className="text-xs text-neutral-500">Your emotional intelligence guide</p>
      </div>
    </div>
  );
}
