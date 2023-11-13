import { z } from "zod";
import { CreatePoint } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const pointRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }: any) => {
        const listPoints = await ctx.prisma.point.findMany();
        return listPoints;
    }),
    points: protectedProcedure.input(z.string()).query(async ({ ctx, input }: any) => {
        const listPoints = await ctx.prisma.point.findMany({
            where: {
                taskId: input,
                type: 'point',
            },
        });
        return listPoints.map(({ id, profileId, point, sprintId }: any) => ({ id, profileId, point, sprintId }));
    }),
    reviews: protectedProcedure.input(z.string()).query(async ({ ctx, input }: any) => {
        const listPoints = await ctx.prisma.point.findMany({
            where: {
                taskId: input,
                type: 'review',
            },
        });
        return listPoints.map(({ id, profileId, point, sprintId }: any) => ({ id, profileId, point, sprintId }));
    }),
    testings: protectedProcedure.input(z.string()).query(async ({ ctx, input }: any) => {
        const listPoints = await ctx.prisma.point.findMany({
            where: {
                taskId: input,
                type: 'testing',
            },
        });
        return listPoints.map(({ id, profileId, point, sprintId }: any) => ({ id, profileId, point, sprintId }));
    }),
    create: protectedProcedure.input(CreatePoint).mutation(async ({ ctx, input }: any) => {
        const point = await ctx.prisma.point.create({
            data: {
                ...input,
            },
        });
        return point;
    }),
    update: protectedProcedure.input(CreatePoint).mutation(async ({ ctx, input }: any) => {
        if (!input.id) {
            const point = await ctx.prisma.point.create({
                data: {
                    ...input,
                },
            });
            return point;
        }
        const point = await ctx.prisma.point.update({
            where: {
                id: input.id,
            },
            data: {
                ...input,
            },
        });
        return point;
    }),
    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }: any) => {
        const point = await ctx.prisma.point.delete({
            where: {
                id: input,
            },
        });
        return point;
    }),
});
