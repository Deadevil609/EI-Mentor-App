import { pgTable, text, serial, timestamp, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Mood entries schema
export const moodEntries = pgTable("mood_entries", {
  id: text("id").primaryKey(),
  mood: text("mood").notNull(),
  intensity: integer("intensity").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).omit({
  id: true,
}).extend({
  mood: z.enum(["happy", "sad", "angry", "anxious", "calm"]),
  intensity: z.number().min(1).max(10),
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;

// Journal entries schema
export const journalEntries = pgTable("journal_entries", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  tags: json("tags").$type<string[]>().default([]),
  mood: text("mood"),
  moodIntensity: integer("mood_intensity"),
  date: timestamp("date").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({
  id: true,
}).extend({
  tags: z.array(z.string()),
  mood: z.enum(["happy", "sad", "angry", "anxious", "calm"]).optional(),
  moodIntensity: z.number().min(1).max(10).optional(),
});

export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;

// Assessment results schema
export const assessmentResults = pgTable("assessment_results", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  score: integer("score").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults).omit({
  id: true,
}).extend({
  category: z.enum(["self-awareness", "self-regulation", "motivation", "empathy", "social-skills"]),
  score: z.number().min(0).max(100),
});

export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;

// Challenges schema
export const challenges = pgTable("challenges", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").default(false),
  completedDate: text("completed_date"),
  category: text("category").notNull(),
  userId: integer("user_id").notNull(),
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
}).extend({
  category: z.enum(["self-awareness", "self-regulation", "motivation", "empathy", "social-skills"]),
  completedDate: z.string().optional(),
});

export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;
