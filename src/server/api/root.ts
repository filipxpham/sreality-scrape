import { createTRPCRouter } from "~/server/api/trpc";
import { flatsRouter } from "./routers/flats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  flats: flatsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
