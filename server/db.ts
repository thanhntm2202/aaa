import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  jobs, 
  bids, 
  deliverables, 
  disputes, 
  transactions,
  Job,
  Bid,
  Deliverable,
  Dispute,
  Transaction,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByWalletAddress(walletAddress: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.walletAddress, walletAddress))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Jobs queries
export async function getJobsWithFilters(filters: {
  status?: string;
  skill?: string;
  minBudget?: number;
  maxBudget?: number;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select()
    .from(jobs)
    .limit(filters.limit || 20)
    .offset(filters.offset || 0)
    .orderBy(desc(jobs.createdAt));

  return result;
}

export async function getJobById(jobId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getJobsByClientId(clientId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(jobs).where(eq(jobs.clientId, clientId)).orderBy(desc(jobs.createdAt));
}

// Bids queries
export async function getBidsForJob(jobId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(bids).where(eq(bids.jobId, jobId)).orderBy(desc(bids.createdAt));
}

export async function getBidsForFreelancer(freelancerId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(bids).where(eq(bids.freelancerId, freelancerId)).orderBy(desc(bids.createdAt));
}

// Deliverables queries
export async function getDeliverableForJob(jobId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(deliverables).where(eq(deliverables.jobId, jobId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Disputes queries
export async function getDisputesForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(disputes)
    .where(
      and(
        eq(disputes.clientId, userId),
        eq(disputes.status, "OPEN")
      )
    )
    .orderBy(desc(disputes.createdAt));
}

export async function getOpenDisputes() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(disputes)
    .where(eq(disputes.status, "OPEN"))
    .orderBy(desc(disputes.createdAt));
}

// Transactions queries
export async function getTransactionsForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));
}

export async function getTransactionByHash(txHash: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(transactions)
    .where(eq(transactions.txHash, txHash))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}
