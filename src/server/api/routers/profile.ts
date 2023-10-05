import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
            const listProfiles = await ctx.prisma.profile.findMany({});
            console.log(listProfiles);
            return listProfiles.map(({ id, username, color, initials, avatar, email, teamId }) => ({ id, username, color, initials, avatar, email, teamId }));
    }),
});
