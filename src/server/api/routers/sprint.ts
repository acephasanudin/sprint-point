import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const sprintRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const sprints = await ctx.db.sprint.findMany({ where: { active: true }, orderBy: [{ name: 'desc' }] });
        return sprints;
    }),
    lastSprint: protectedProcedure.query(async ({ ctx }) => {
        const sprint = await ctx.db.sprint.findFirst({ where: { active: true }, orderBy: [{ createdAt: 'desc' }] });
        console.log(sprint);
        return sprint;
    }),
});
