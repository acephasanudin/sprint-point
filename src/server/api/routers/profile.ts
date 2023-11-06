import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        // sorted by username asc
        const listProfiles = await ctx.prisma.profile.findMany({
            include: {
                points: {
                    include: {
                        task: true,
                    },
                },
                tasks: true,
            },
            orderBy: {
                username: "asc",
            },
        });
        return listProfiles.map(({ id, username, color, initials, avatar, email, teamId, points, tasks }) => ({ id, username, color, initials, avatar, email, teamId, points, tasks }));
    }),
});
