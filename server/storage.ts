import { 
  users, 
  type User, 
  type InsertUser, 
  moodEntries, 
  type MoodEntry, 
  type InsertMoodEntry,
  journalEntries,
  type JournalEntry,
  type InsertJournalEntry,
  assessmentResults,
  type AssessmentResult,
  type InsertAssessmentResult,
  challenges,
  type Challenge,
  type InsertChallenge
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { pool } from "./db";

// Create PostgreSQL session store
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Mood entries methods
  createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry>;
  getMoodEntriesByUserId(userId: number): Promise<MoodEntry[]>;
  
  // Journal entries methods
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]>;
  
  // Assessment results methods
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
  getAssessmentResultsByUserId(userId: number): Promise<AssessmentResult[]>;
  
  // Challenges methods
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  getChallengesByUserId(userId: number): Promise<Challenge[]>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Mood entries methods
  async createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry> {
    const [moodEntry] = await db
      .insert(moodEntries)
      .values({ ...entry, id: Date.now().toString() })
      .returning();
    return moodEntry;
  }

  async getMoodEntriesByUserId(userId: number): Promise<MoodEntry[]> {
    return await db
      .select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId));
  }

  // Journal entries methods
  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const [journalEntry] = await db
      .insert(journalEntries)
      .values({ ...entry, id: Date.now().toString() })
      .returning();
    return journalEntry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId));
  }

  // Assessment results methods
  async createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult> {
    const [assessmentResult] = await db
      .insert(assessmentResults)
      .values({ ...result, id: Date.now().toString() })
      .returning();
    return assessmentResult;
  }

  async getAssessmentResultsByUserId(userId: number): Promise<AssessmentResult[]> {
    return await db
      .select()
      .from(assessmentResults)
      .where(eq(assessmentResults.userId, userId));
  }

  // Challenges methods
  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const [newChallenge] = await db
      .insert(challenges)
      .values({ ...challenge, id: Date.now().toString() })
      .returning();
    return newChallenge;
  }

  async getChallengesByUserId(userId: number): Promise<Challenge[]> {
    return await db
      .select()
      .from(challenges)
      .where(eq(challenges.userId, userId));
  }
}

export const storage = new DatabaseStorage();
