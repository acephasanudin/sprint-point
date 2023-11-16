import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const CreatePoint = z.object({
    id: z.optional(z.string()),
    profileId: z.optional(z.string()),
    taskId: z.optional(z.string()),
    type: z.optional(z.string()),
    point: z.optional(z.number()),
    sprintId: z.optional(z.string()),
});

export const pointRouter = createTRPCRouter({
    all: protectedProcedure.input(z.object({ taskId: z.string(), type: z.string() })).query(async ({ ctx, input }) => {
        const points = await ctx.db.point.findMany({
            where: {
                taskId: input.taskId,
                type: input.type,
            },
        });
        return points;
    }),
    create: protectedProcedure.input(CreatePoint).mutation(async ({ ctx, input }) => {
        const point = await ctx.db.point.create({
            data: {
                ...input,
            },
        });
        return point;
    }),
    update: protectedProcedure.input(CreatePoint).mutation(async ({ ctx, input }) => {
        if (!input.id) {
            const point = await ctx.db.point.create({
                data: {
                    ...input,
                },
            });
            return point;
        }
        const point = await ctx.db.point.update({
            where: {
                id: input.id,
            },
            data: {
                ...input,
            },
        });
        return point;
    }),
    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input: id }) => {
        const point = await ctx.db.point.delete({
            where: {
                id,
            },
        });
        return point;
    }),
});
