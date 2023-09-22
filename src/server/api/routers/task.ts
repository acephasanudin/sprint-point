import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TaskInput } from "../../../types";
import { TaskListResponse, Task } from "../../../interfaces";
// @ts-ignore-next-line
import axios, { AxiosRequestConfig } from 'axios';
let listId = '';

export const taskRouter = createTRPCRouter({
    // @ts-ignore-next-line
    all: protectedProcedure.query(async ({ ctx, input }) => {
        if (listId !== '') {
            const apiToken = process.env.CLICKUP_API_TOKEN;
            const baseUrl = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
            const headers: AxiosRequestConfig = {
                headers: {
                    'Authorization': apiToken,
                    'Content-Type': 'application/json',
                },
            };
            const listClickupTasks = await axios.get<TaskListResponse>(`${baseUrl}list/${listId}/task`, headers);
            const clickupTasks: Task[] = listClickupTasks.data.tasks;
            clickupTasks.forEach(async (task) => {
                const { id, name, description, status, assignees, tags, team_id, url, list, project } = task;
                if (assignees.length === 0) {
                    assignees.forEach(async (assignee) => {
                        await ctx.prisma.profile.upsert({
                            where: {
                                id: assignee?.id?.toString(),
                            },
                            update: {
                                username: assignee?.username,
                                color: assignee?.color,
                                initials: assignee?.initials,
                                avatar: assignee?.profilePicture,
                                email: assignee?.email,
                                teamId: team_id,
                            },
                            create: {
                                id: assignee?.id?.toString() || '',
                                username: assignee?.username,
                                color: assignee?.color,
                                initials: assignee?.initials,
                                avatar: assignee?.profilePicture,
                                email: assignee?.email,
                                teamId: team_id,
                            },
                        });
                    });
                }
                await ctx.prisma.task.upsert({
                    where: {
                        id,
                    },
                    update: {
                        name,
                        description,
                        status: status.status,
                        tags: tags.map(({ name }) => name).join(', '),
                        teamId: team_id,
                        url,
                        listId: list.id,
                        projectId: project.id
                    },
                    create: {
                        id,
                        name,
                        description,
                        status: status.status,
                        assigneeId: assignees[0]?.id?.toString(),
                        sprint: list.name,
                        tags: tags.map(({ name }) => name).join(', '),
                        teamId: team_id,
                        url,
                        listId: list.id,
                        projectId: project.id
                    },
                });
            });

            const listTasks = await ctx.prisma.task.findMany({
                where: {
                    id: {
                        in: clickupTasks.map(({ id }) => id),
                    },
                },
            });

            const tasks = listTasks.map(({ id, name, point, review, testing, sprint, status }) => ({
                id,
                name,
                point,
                review,
                testing,
                sprint,
                status
            }));
            return tasks;
        }

        const listTasks = await ctx.prisma.task.findMany({});
        return listTasks.map(({ id, name, point, review, testing, sprint, status }) => ({ id, name, point, review, testing, sprint, status }));

    }),
    create: protectedProcedure.input(TaskInput).mutation(({ input }) => {
        listId = input;
        // return ctx.prisma.quest.create({
        //     data: {
        //         id: input,
        //         name: input,
        //         description: input,
        //     },
        // });
    }),
    // input object
    update: protectedProcedure.input(z.object({
        id: z.string(),
        point: z.optional(z.number()),
        review: z.optional(z.number()),
        testing: z.optional(z.number()),
    })).mutation(({ ctx, input }) => {
        const { id, point, review, testing } = input;
        return ctx.prisma.task.update({
            where: {
                id,
            },
            data: {
                point,
                review,
                testing,
            },
        });
    }),
    // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    //     return ctx.prisma.task.delete({
    //         where: {
    //             id: input,
    //         },
    //     });
    // }),
    // toggle: protectedProcedure
    // .input(
    //     z.object({
    //         id: z.string(),
    //         status: z.string(),
    //     })
    // )
    // .mutation(({ ctx, input }) => {
    //     const { id, status } = input;
    //     return ctx.prisma.task.update({
    //         where: {
    //             id,
    //         },
    //         data: {
    //             status,
    //         },
    //     });
    // }),
});
