import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "client", "freelancer", "arbitrator"]).default("user").notNull(),
  walletAddress: varchar("walletAddress", { length: 42 }).unique(),
  reputation: int("reputation").default(0),
  totalEarnings: decimal("totalEarnings", { precision: 20, scale: 8 }).default("0"),
  completedJobs: int("completedJobs").default(0),
  avatar: text("avatar"),
  bio: text("bio"),
  skills: json("skills"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Jobs table
export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  skills: json("skills").notNull(),
  budget: decimal("budget", { precision: 20, scale: 8 }).notNull(),
  deadline: timestamp("deadline"),
  status: mysqlEnum("status", ["OPEN", "ASSIGNED", "IN_PROGRESS", "SUBMITTED", "COMPLETED", "DISPUTED", "CANCELLED"]).default("OPEN"),
  selectedFreelancerId: int("selectedFreelancerId"),
  escrowAddress: varchar("escrowAddress", { length: 42 }),
  ipfsHash: varchar("ipfsHash", { length: 255 }),
  milestones: json("milestones"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

// Bids table
export const bids = mysqlTable("bids", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  freelancerId: int("freelancerId").notNull(),
  proposedRate: decimal("proposedRate", { precision: 20, scale: 8 }).notNull(),
  proposal: text("proposal"),
  status: mysqlEnum("status", ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"]).default("PENDING"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Bid = typeof bids.$inferSelect;
export type InsertBid = typeof bids.$inferInsert;

// Deliverables table
export const deliverables = mysqlTable("deliverables", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  freelancerId: int("freelancerId").notNull(),
  ipfsHash: varchar("ipfsHash", { length: 255 }).notNull(),
  fileHash: varchar("fileHash", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["SUBMITTED", "APPROVED", "REJECTED", "DISPUTED"]).default("SUBMITTED"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
});

export type Deliverable = typeof deliverables.$inferSelect;
export type InsertDeliverable = typeof deliverables.$inferInsert;

// Disputes table
export const disputes = mysqlTable("disputes", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  clientId: int("clientId").notNull(),
  freelancerId: int("freelancerId").notNull(),
  reason: text("reason").notNull(),
  evidenceIpfs: varchar("evidenceIpfs", { length: 255 }),
  status: mysqlEnum("status", ["OPEN", "VOTING", "RESOLVED", "CLOSED"]).default("OPEN"),
  resolution: mysqlEnum("resolution", ["CLIENT_WIN", "FREELANCER_WIN", "SPLIT"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type Dispute = typeof disputes.$inferSelect;
export type InsertDispute = typeof disputes.$inferInsert;

// Transactions table
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["DEPOSIT", "RELEASE", "REFUND", "ARBITRATION_REWARD"]),
  txHash: varchar("txHash", { length: 255 }).unique(),
  status: mysqlEnum("status", ["PENDING", "SUCCESS", "FAILED"]).default("PENDING"),
  amount: decimal("amount", { precision: 20, scale: 8 }),
  jobId: int("jobId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;