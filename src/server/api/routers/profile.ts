import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    all: protectedProcedure.input(z.optional(z.object({ sprintId: z.optional(z.string()), teamId: z.optional(z.string()), profileId: z.optional(z.string()), status: z.optional(z.string()) }))).query(async ({ ctx, input }: any) => {
        const whereProfile: { teamId?: string, id?: string } = { teamId: input.teamId, id: input.id };
        const wherePoint: { sprintId?: string, status?: string } = { sprintId: input.sprintId, status: input.status };
        if (input.teamId !== undefined && input.teamId !== '') whereProfile.teamId = input.teamId;
        if (input.profileId !== undefined && input.profileId !== '') whereProfile.id = input.profileId;
        if (input.sprintId !== undefined && input.sprintId !== '') wherePoint.sprintId = input.sprintId;

        const profile = await ctx.db.profile.findMany({
            where: whereProfile,
            include: {
                points: {
                    where: wherePoint,
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
