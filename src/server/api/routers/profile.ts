import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const listProfiles = await ctx.prisma.profile.findMany({
            include: {
                points: true,
                tasks: true,
            },
        });
        return listProfiles.map(({ id, username, color, initials, avatar, email, teamId, points, tasks }) => ({ id, username, color, initials, avatar, email, teamId, points, tasks }));
    }),
});
