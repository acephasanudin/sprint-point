import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const teams = await ctx.db.team.findMany();
        return teams;
    })
});
