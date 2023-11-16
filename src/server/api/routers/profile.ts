import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }: any) => {
        const profile = await ctx.db.profile.findMany({
            include: {
                points: {
                    include: {
                        task: true,
                    },
                },
            },
            orderBy: {
                username: "asc",
            },
        });
        return profile;
    }),
});
