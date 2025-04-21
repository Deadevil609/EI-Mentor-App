import { useState } from "react";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  function onRegisterSubmit(values: RegisterFormValues) {
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to EI Mentor</h1>
            <p className="text-neutral-600">Your personal guide to emotional intelligence</p>
          </div>
          
          <div className="bg-neutral-100 p-4 rounded-lg mb-8 text-center italic">
            "Emotional intelligence is the ability to sense, understand, and effectively apply the power of emotions."
            <div className="mt-2 text-sm text-neutral-500">— Wayne Payne</div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary" 
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-neutral-300"></div>
              <span className="flex-shrink mx-3 text-neutral-500 text-sm">or continue with</span>
              <div className="flex-grow border-t border-neutral-300"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full bg-black text-white hover:bg-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.45-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.47C2.08 14.34 3.07 6.37 9.44 6.06c1.76.08 2.99 1.09 3.97 1.12 1.49-.21 2.88-1.21 4.43-1.04 1.9.21 3.31 1.13 4.21 2.84-3.52 2.29-2.66 6.82.72 8.44-.78 1.71-1.78 3.36-3.72 4.85zM12.46 6c-.11-2.08 1.5-3.89 3.41-4C16.18 3.87 18 5.67 18 8" fill="currentColor"/>
                </svg>
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex md:flex-1 bg-primary">
        <div className="flex flex-col items-center justify-center p-12 text-white w-full">
          <h2 className="text-3xl font-bold mb-4">Enhance Your Emotional Intelligence</h2>
          <p className="text-lg mb-8 text-center max-w-md">
            EI Mentor helps you develop self-awareness, empathy, and other emotional intelligence skills through personalized guidance and practical exercises.
          </p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div className="bg-white/10 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 font-medium">AI Mentor</h3>
              </div>
              <p className="text-sm text-white/80">Personalized guidance from your EI coach, available 24/7</p>
            </div>
            
            <div className="bg-white/10 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 font-medium">Mood Tracking</h3>
              </div>
              <p className="text-sm text-white/80">Record and visualize your emotional patterns over time</p>
            </div>
            
            <div className="bg-white/10 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 font-medium">Daily Challenges</h3>
              </div>
              <p className="text-sm text-white/80">Practical exercises to build your emotional intelligence skills</p>
            </div>
            
            <div className="bg-white/10 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="ml-3 font-medium">Progress Tracking</h3>
              </div>
              <p className="text-sm text-white/80">See your growth across different emotional intelligence domains</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
