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
import createMemoryStore from "memorystore";
import session from "express-session";

// Create memory store for sessions
const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moodEntries: Map<string, MoodEntry>;
  private journalEntries: Map<string, JournalEntry>;
  private assessmentResults: Map<string, AssessmentResult>;
  private challenges: Map<string, Challenge>;
  sessionStore: session.SessionStore;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.moodEntries = new Map();
    this.journalEntries = new Map();
    this.assessmentResults = new Map();
    this.challenges = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24 hours
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Mood entries methods
  async createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry> {
    const id = Date.now().toString();
    const moodEntry: MoodEntry = { ...entry, id };
    this.moodEntries.set(id, moodEntry);
    return moodEntry;
  }

  async getMoodEntriesByUserId(userId: number): Promise<MoodEntry[]> {
    return Array.from(this.moodEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  // Journal entries methods
  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = Date.now().toString();
    const journalEntry: JournalEntry = { ...entry, id };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  // Assessment results methods
  async createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult> {
    const id = Date.now().toString();
    const assessmentResult: AssessmentResult = { ...result, id };
    this.assessmentResults.set(id, assessmentResult);
    return assessmentResult;
  }

  async getAssessmentResultsByUserId(userId: number): Promise<AssessmentResult[]> {
    return Array.from(this.assessmentResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  // Challenges methods
  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const id = Date.now().toString();
    const newChallenge: Challenge = { ...challenge, id };
    this.challenges.set(id, newChallenge);
    return newChallenge;
  }

  async getChallengesByUserId(userId: number): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(
      (challenge) => challenge.userId === userId
    );
  }
}

export const storage = new MemStorage();
