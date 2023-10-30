import { createTRPCRouter, protectedProcedure } from "../trpc";

export const folderRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const folders = await ctx.prisma.folder.findMany({});
        return folders.map(({ id, name }) => ({ id, name }));
    }),
});
