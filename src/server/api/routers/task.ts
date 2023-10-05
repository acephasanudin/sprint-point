import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SearchTask } from "../../../types";
import { TaskListResponse, Task } from "../../../interfaces";
import axios, { AxiosRequestConfig } from 'axios';
let ID = '';
let Type = '';

export const taskRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        if (ID === '') {
            const listTasks = await ctx.prisma.task.findMany({
                include: { assignee: true }
            });
            return listTasks.map(({ id, name, point, review, testing, sprintId, status, assignee }) => ({ id, name, point, review, testing, sprintId, status, assignee }));
        }
        const where: any = {};
        if (Type === 'list') {
            where['listId'] = ID;
        } else {
            where['id'] = ID;
        }
        const listTasks = await ctx.prisma.task.findMany({
            where,
            include: { assignee: true }
        });

        const tasks = listTasks.map(({ id, name, point, review, testing, sprintId, assignee, status }) => ({
            id,
            name,
            point,
            review,
            testing,
            sprintId,
            assignee,
            status
        }));
        return tasks;
    }),
    setListId: protectedProcedure.input(SearchTask).mutation(async ({ ctx, input }) => {
        ID = input.id;
        Type = input.type;
        const API_TOKEN = process.env.CLICKUP_API_TOKEN;
        const BASE_URL = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
        const headers: AxiosRequestConfig = {
            headers: {
                'Authorization': API_TOKEN,
                'Content-Type': 'application/json',
            },
        };
        if (Type === 'task') {
            const taskClickup = await axios.get<Task>(`${BASE_URL}task/${ID}`, headers);

            const { id, name, description, status, assignees, tags, team_id, url, list, project } = taskClickup.data;
            if (assignees.length !== 0) {
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
                    // sprint: list.name,
                    tags: tags.map(({ name }) => name).join(', '),
                    teamId: team_id,
                    url,
                    listId: list.id,
                    projectId: project.id
                },
            });
            await ctx.prisma.sprint.upsert({
                where: {
                    name: list.name,
                },
                update: {
                    name: list.name,
                },
                create: {
                    name: list.name,
                },
            });
            return true;
        }
        const listClickupTasks = await axios.get<TaskListResponse>(`${BASE_URL}list/${ID}/task`, headers);
        const clickupTasks: Task[] = listClickupTasks.data.tasks;
        clickupTasks.forEach(async (task) => {
            const { id, name, description, status, assignees, tags, team_id, url, list, project } = task;
            if (assignees.length !== 0) {
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
                    // sprint: list.name,
                    tags: tags.map(({ name }) => name).join(', '),
                    teamId: team_id,
                    url,
                    listId: list.id,
                    projectId: project.id
                },
            });
        });
        return true;
    }),
    update: protectedProcedure.input(z.object({
        id: z.string(),
        assigneeId : z.optional(z.string()),
        sprintId: z.optional(z.string()),
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
});
