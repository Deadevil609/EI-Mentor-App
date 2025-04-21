import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { 
  insertJournalEntrySchema, 
  insertMoodEntrySchema, 
  insertAssessmentResultSchema,
  insertChallengeSchema
} from "@shared/schema";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Middleware to ensure user is authenticated
  function ensureAuthenticated(req: Request, res: Response, next: Function) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Not authenticated" });
  }

  // AI Mentor chat endpoint
  app.post("/api/ai-mentor/chat", ensureAuthenticated, async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          error: "OpenAI API key is not configured" 
        });
      }

      const { messages, model } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      const response = await openai.chat.completions.create({
        model: model || "gpt-4o",
        messages,
      });

      res.json({
        content: response.choices[0].message.content
      });
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      res.status(500).json({ error: "Failed to get response from AI" });
    }
  });

  // AI sentiment analysis endpoint
  app.post("/api/ai-mentor/analyze", ensureAuthenticated, async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          error: "OpenAI API key is not configured" 
        });
      }

      const { text } = req.body;
      
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Invalid text format" });
      }

      const systemPrompt = `
        You are an emotional intelligence expert. Analyze the sentiment and emotions in the 
        provided journal entry. Respond with JSON in this format only:
        {
          "mood": string (one of: "happy", "sad", "angry", "anxious", "calm"),
          "intensity": number (1-10 scale),
          "summary": string (brief 1-2 sentence emotional summary)
        }
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      res.status(500).json({ error: "Failed to analyze sentiment" });
    }
  });

  // Get daily challenge endpoint
  app.get("/api/ai-mentor/challenge", ensureAuthenticated, async (req, res) => {
    try {
      if (!process.env.OPENAI_API_KEY) {
        // Fallback to predefined challenge if no API key
        return res.json({ 
          text: "Practice active listening today. When speaking with others, focus entirely on what they're saying without planning your response.",
          category: "empathy"
        });
      }

      const category = req.query.category as string;
      
      const systemPrompt = `
        You are an emotional intelligence expert. Create a daily challenge for users 
        to improve their emotional intelligence. The challenge should be specific, 
        actionable, and completable in one day. Respond with JSON in this format only:
        {
          "text": string (the challenge description),
          "category": string (one of: "self-awareness", "self-regulation", "motivation", "empathy", "social-skills")
        }
        ${category ? `Focus the challenge on the category: ${category}` : ''}
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate a daily emotional intelligence challenge" }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("Error generating challenge:", error);
      res.status(500).json({ 
        text: "Practice active listening today. When speaking with others, focus entirely on what they're saying without planning your response.",
        category: "empathy"
      });
    }
  });

  // Mood & Journal API endpoints
  app.post("/api/mood", ensureAuthenticated, async (req, res) => {
    try {
      const moodData = insertMoodEntrySchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const newMood = await storage.createMoodEntry(moodData);
      res.status(201).json(newMood);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save mood entry" });
    }
  });

  app.get("/api/mood", ensureAuthenticated, async (req, res) => {
    try {
      const moodEntries = await storage.getMoodEntriesByUserId(req.user!.id);
      res.json(moodEntries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mood entries" });
    }
  });

  app.post("/api/journal", ensureAuthenticated, async (req, res) => {
    try {
      const journalData = insertJournalEntrySchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const newEntry = await storage.createJournalEntry(journalData);
      res.status(201).json(newEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save journal entry" });
    }
  });

  app.get("/api/journal", ensureAuthenticated, async (req, res) => {
    try {
      const journalEntries = await storage.getJournalEntriesByUserId(req.user!.id);
      res.json(journalEntries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journal entries" });
    }
  });

  // Assessment API endpoints
  app.post("/api/assessment", ensureAuthenticated, async (req, res) => {
    try {
      const assessmentData = insertAssessmentResultSchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const newResult = await storage.createAssessmentResult(assessmentData);
      res.status(201).json(newResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save assessment result" });
    }
  });

  app.get("/api/assessment", ensureAuthenticated, async (req, res) => {
    try {
      const results = await storage.getAssessmentResultsByUserId(req.user!.id);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessment results" });
    }
  });

  // Challenges API endpoints
  app.post("/api/challenges", ensureAuthenticated, async (req, res) => {
    try {
      const challengeData = insertChallengeSchema.parse({
        ...req.body,
        userId: req.user!.id
      });
      
      const newChallenge = await storage.createChallenge(challengeData);
      res.status(201).json(newChallenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to save challenge" });
    }
  });

  app.get("/api/challenges", ensureAuthenticated, async (req, res) => {
    try {
      const challenges = await storage.getChallengesByUserId(req.user!.id);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch challenges" });
    }
  });

  // Create the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
