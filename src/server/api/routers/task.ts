import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SearchTask } from "../../../types";
import { TaskListResponse, Task, Sprint } from "../../../interfaces";
import axios, { AxiosRequestConfig } from 'axios';
let ID = '';
let Type = '';
let SprintId = '';
let ProfileId = '';

export const taskRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const where: any = {};
        if (SprintId !== '') {
            where['sprintId'] = SprintId;
        }
        if (ProfileId !== '') {
            where['assigneeId'] = ProfileId;
        }
        if (ID === '') {
            const listTasks = await ctx.prisma.task.findMany({
                where,
                include: { assignee: true }
            });
            return listTasks.map(({ id, name, point, sprintId, status, assignee }) => ({ id, name, point, sprintId, status, assignee }));
        }
        if (Type === 'task') {
            where['id'] = ID;
        } else {
            where['listId'] = ID;
        }
        const listTasks = await ctx.prisma.task.findMany({
            where,
            include: { assignee: true }
        });

        const tasks = listTasks.map(({ id, name, point, sprintId, assignee, status }) => ({
            id,
            name,
            point,
            sprintId,
            assignee,
            status
        }));
        return tasks;
    }),
    setListId: protectedProcedure.input(SearchTask).mutation(async ({ ctx, input }) => {
        ID = input.id;
        Type = input.type;
        SprintId = '';
        ProfileId = '';
        // create variable sprint as any types
        let sprint: any = {};
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
            if (list.name.includes('Sprint')) {
                sprint = await ctx.prisma.sprint.upsert({
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
            }
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
                    assigneeId: assignees[0]?.id?.toString(),
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
                    sprintId: sprint?.id,
                    tags: tags.map(({ name }) => name).join(', '),
                    teamId: team_id,
                    url,
                    listId: list.id,
                    projectId: project.id
                },
            });
            return true;
        }
        const listClickupTasks = await axios.get<TaskListResponse>(`${BASE_URL}list/${ID}/task`, headers);
        const clickupTasks: Task[] = listClickupTasks.data.tasks;
        clickupTasks.forEach(async (task) => {
            const { id, name, description, status, assignees, tags, team_id, url, list, project } = task;
            if (list.name.includes('Sprint')) {
                sprint = await ctx.prisma.sprint.upsert({
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
            }
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
                    sprintId: sprint?.id,
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
        assigneeId: z.optional(z.string()),
        sprintId: z.optional(z.string()),
        point: z.optional(z.number()),
    })).mutation(({ ctx, input }) => {
        const { id, assigneeId, sprintId, point } = input;
        return ctx.prisma.task.update({
            where: {
                id,
            },
            data: {
                assigneeId,
                sprintId,
                point,
            },
        });
    }),
    setSprintId: protectedProcedure.input(z.object({
        sprint: z.optional(z.string()),
        profile: z.optional(z.string()),
    })).mutation(({ input }) => {
        ID = '';
        Type = '';
        SprintId = input?.sprint || '';
        ProfileId = input?.profile || '';

    }),
});
