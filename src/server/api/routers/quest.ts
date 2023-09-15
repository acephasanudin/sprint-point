import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { questInput } from "../../../types";
import axios, { AxiosRequestConfig } from 'axios';

export const questRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const apiToken = process.env.CLICKUP_API_TOKEN;
        const baseUrl = process.env.CLICKUP_BASE_URL;
        const headers: AxiosRequestConfig = {
            headers: {
                'Authorization': apiToken,
                'Content-Type': 'application/json',
            },
        };
        // get list tasks by list id
        const listId = '900303003447';
        const listTasks = await axios.get(baseUrl + 'list/' + listId + '/task', headers);
        const tasks = listTasks.data.tasks;
        const quests = tasks.map(({ id, name, status }) => ({ id, name, completed: status.status === 'closed' }));
        return quests;

        // const quests = await ctx.prisma.quest.findMany({});
        // return quests.map(({ id, name, completed }) => ({ id, name, completed }));
    }),
    create: protectedProcedure.input(questInput).mutation(({ ctx, input }) => {
        return ctx.prisma.quest.create({
            data: {
                id: input,
                name: input,
                description: input,
            },
        });
    }),
    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        return ctx.prisma.quest.delete({
            where: {
                id: input,
            },
        });
    }),
    toggle: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            completed: z.boolean(),
        })
    )
    .mutation(({ ctx, input }) => {
        const { id, done } = input;
        return ctx.prisma.quest.update({
            where: {
                id,
            },
            data: {
                completed,
            },
        });
    }),
});
