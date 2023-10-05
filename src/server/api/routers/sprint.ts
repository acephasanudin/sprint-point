import { createTRPCRouter, protectedProcedure } from "../trpc";

export const sprintRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
            const listSprints = await ctx.prisma.sprint.findMany({});
            console.log(listSprints);
            return listSprints.map(({ id, name}) => ({ id, name }));
    }),
});
