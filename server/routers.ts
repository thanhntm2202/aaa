import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Jobs procedures
  jobs: router({
    list: publicProcedure
      .input(z.object({
        status: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getJobsWithFilters({
          status: input.status,
          limit: input.limit,
          offset: input.offset,
        });
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return db.getJobById(input);
      }),

    getByClient: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getJobsByClientId(ctx.user.id);
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(5),
        description: z.string().min(20),
        skills: z.array(z.string()),
        budget: z.string(),
        deadline: z.date().optional(),
        milestones: z.array(z.object({
          title: z.string(),
          percentage: z.number(),
        })).optional(),
        ipfsHash: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement job creation with database insert
        return { success: true, jobId: 1 };
      }),
  }),

  // Bids procedures
  bids: router({
    getForJob: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return db.getBidsForJob(input);
      }),

    getForFreelancer: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getBidsForFreelancer(ctx.user.id);
      }),

    submit: protectedProcedure
      .input(z.object({
        jobId: z.number(),
        proposedRate: z.string(),
        proposal: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement bid submission
        return { success: true, bidId: 1 };
      }),
  }),

  // Deliverables procedures
  deliverables: router({
    getForJob: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return db.getDeliverableForJob(input);
      }),

    submit: protectedProcedure
      .input(z.object({
        jobId: z.number(),
        ipfsHash: z.string(),
        fileHash: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement deliverable submission
        return { success: true, deliverableId: 1 };
      }),

    approve: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement deliverable approval
        return { success: true };
      }),
  }),

  // Disputes procedures
  disputes: router({
    list: publicProcedure
      .query(async () => {
        return db.getOpenDisputes();
      }),

    getForUser: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getDisputesForUser(ctx.user.id);
      }),

    create: protectedProcedure
      .input(z.object({
        jobId: z.number(),
        reason: z.string(),
        evidenceIpfs: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement dispute creation
        return { success: true, disputeId: 1 };
      }),
  }),

  // User procedures
  users: router({
    getProfile: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        // TODO: Implement user profile retrieval
        return { id: input, name: "User", reputation: 100 };
      }),

    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
        skills: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement profile update
        return { success: true };
      }),

    updateWallet: protectedProcedure
      .input(z.object({
        walletAddress: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement wallet update
        return { success: true };
      }),
  }),

  // Transactions procedures
  transactions: router({
    getForUser: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getTransactionsForUser(ctx.user.id);
      }),

    getByHash: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return db.getTransactionByHash(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
