import { CreateSprint } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const sprintRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const listSprints = await ctx.prisma.sprint.findMany({});
        return listSprints.map(({ id, name }) => ({ id, name }));
    }),
    create: protectedProcedure.input(CreateSprint).mutation(async ({ ctx, input }) => {
        const sprint = await ctx.prisma.sprint.create({
            data: {
                name: input.name,
            },
        });
        return sprint;
    }),
});
