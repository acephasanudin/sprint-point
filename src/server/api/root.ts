import { taskRouter } from "~/server/api/routers/task";
import { pointRouter } from "~/server/api/routers/point";
import { profileRouter } from "~/server/api/routers/profile";
import { sprintRouter } from "~/server/api/routers/sprint";
import { teamRouter } from "~/server/api/routers/team";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  point: pointRouter,
  profile: profileRouter,
  sprint: sprintRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
