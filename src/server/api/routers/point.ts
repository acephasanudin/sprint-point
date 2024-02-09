import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
const CreatePoint = z.object({
    id: z.optional(z.string()),
    profileId: z.optional(z.string()),
    taskId: z.optional(z.string()),
    type: z.optional(z.string()),
    point: z.optional(z.number()),
    sprintId: z.optional(z.string()),
    verified: z.optional(z.boolean()),
});

export const pointRouter = createTRPCRouter({
    all: protectedProcedure.input(z.object({ taskId: z.string(), type: z.string(), status: z.optional(z.string()) })).query(async ({ ctx, input }) => {
        const points = await ctx.db.point.findMany({
            where: {
                taskId: input.taskId,
                type: input.type,
                status: input.status || "point"
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
    generate: protectedProcedure.input(z.object({ sprintId: z.optional(z.string()), status: z.optional(z.string()) })).mutation(async ({ ctx, input }) => {
        await ctx.db.point.deleteMany({
            where: {
                sprintId: input.sprintId,
                status: input.status || "planning",
            },
        });
        const points = await ctx.db.point.findMany({
            where: {
                sprintId: input.sprintId,
                status: "point",
            },
        });
        const data = points.map(({ id, status, ...obj }) => ({ status: input.status || "planning", ...obj }));
        await ctx.db.point.createMany({ data })

        return true;
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
