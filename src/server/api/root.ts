import { createTRPCRouter } from "./trpc";
import { taskRouter } from "./routers/task";
import { profileRouter } from "./routers/profile";
import { sprintRouter } from "./routers/sprint";
import { pointRouter } from "./routers/point";
import { folderRouter } from "./routers/folder";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  profile: profileRouter,
  sprint: sprintRouter,
  point: pointRouter,
  folder: folderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
