import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SearchTask } from "../../../types";
import { TaskListResponse, Task } from "../../../interfaces";
import axios, { AxiosRequestConfig } from 'axios';
let ID = '';
let Type = '';
let SprintId = '';
let ProfileId = '';
let FolderId = '';

export const taskRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const where: any = {};
        if (FolderId !== '') {
            where['folderId'] = FolderId;
        }
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
    findTask: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const { id: taskId } = input;
        const task = await ctx.prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                assignee: true,
            },
        });
        if (!task) {
            const API_TOKEN = process.env.CLICKUP_API_TOKEN;
            const BASE_URL = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
            const headers = {
                headers: {
                    'Authorization': API_TOKEN,
                    'Content-Type': 'application/json',
                },
            };
            const getTask = await axios.get<Task>(`${BASE_URL}task/${taskId}`, headers);
            const { id, name, description, status, assignees, tags, team_id, url, list, project, folder } : any = getTask.data;
            const task = {
                id,
                name,
                description,
                status: status.status,
                assigneeId: assignees[0]?.id?.toString(),
                tags: tags.map(({ name }: any) => name).join(', '),
                teamId: team_id,
                url,
                listId: list.id,
                projectId: project.id,
                folderId: folder?.id
            };
            await ctx.prisma.task.upsert({
                where: {
                    id: taskId,
                },
                update: task,
                create: task,
            });
            return task;
        }
        return task;
    }),
    syncClickup: protectedProcedure.mutation(async ({ ctx }) => {
        const { tasks, folders, sprints, profiles } = await getTaskList();
        const createTasks = ctx.prisma.task.createMany({
            data: tasks,
            skipDuplicates: true,
        });
        const createFolders = ctx.prisma.folder.createMany({
            data: folders,
            skipDuplicates: true,
        });
        const createSprints = ctx.prisma.sprint.createMany({
            data: sprints,
            skipDuplicates: true,
        });
        const createProfiles = ctx.prisma.profile.createMany({
            data: profiles,
            skipDuplicates: true,
        });
        await Promise.all([createTasks, createFolders, createSprints, createProfiles]);
        console.log('Task Length: ' + tasks.length)
        console.log('Folder Length: ' + folders.length)
        console.log('Sprint Length: ' + sprints.length)
        console.log('Profile Length: ' + profiles.length)
        return true;
    }),
    setOptions: protectedProcedure.input(SearchTask).mutation(async ({ ctx, input }) => {
        ID = input?.id || '';
        Type = input?.type || '';
        SprintId = input?.sprintId || '';
        ProfileId = input?.profileId || '';
        FolderId = input?.folderId || '';
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
        folder: z.optional(z.string()),
    })).mutation(({ input }) => {
        ID = '';
        Type = '';
        SprintId = input?.sprint || '';
        ProfileId = input?.profile || '';
        FolderId = input?.folder || '';

    }),
});

async function getTaskList() {
    const Tasks: any = [];
    const Folders: any = [];
    const Sprints: any = [];
    const Profiles: any = [];

    const TEAM_ID = process.env.CLICKUP_TEAM_ID;
    const API_TOKEN = process.env.CLICKUP_API_TOKEN;
    const BASE_URL = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
    const headers = {
        headers: {
            'Authorization': API_TOKEN,
            'Content-Type': 'application/json',
        },
    };
    const getSpaces = await axios.get(`${BASE_URL}team/${TEAM_ID}/space`, headers);
    const spaces = getSpaces.data.spaces;
    const spacePromises = spaces.map(async (space: any) => {
        const getFolders = await axios.get(`${BASE_URL}space/${space.id}/folder`, headers);
        const folders = getFolders.data.folders;
        const folderPromises = folders.map(async (folder: any) => {
            if (Folders.filter((f: any) => f.id === folder.id).length === 0) {
                Folders.push({
                    id: folder.id,
                    name: folder.name
                });
            }
            const getLists = await axios.get(`${BASE_URL}folder/${folder.id}/list`, headers);
            const lists = getLists.data.lists;
            const listPromises = lists.map(async (list: any) => {
                const getTasks = await axios.get<TaskListResponse>(`${BASE_URL}list/${list.id}/task`, headers);
                const tasks = getTasks.data.tasks;
                const taskPromises = tasks.map(async (task) => {
                    const { id, name, description, status, assignees, tags, team_id, url, list, project, folder } = task;
                    if (list.name.includes('Sprint')) {
                        if (Sprints.filter((s: any) => s.id === list.id).length === 0) {
                            Sprints.push({
                                id: list.id,
                                name: list.name
                            });
                        }
                    }
                    if (assignees.length !== 0) {
                        assignees.forEach(async (assignee) => {
                            if (Profiles.filter((p: any) => p.id === assignee?.id?.toString()).length === 0) {
                                Profiles.push({
                                    id: assignee?.id?.toString() || '',
                                    username: assignee?.username,
                                    color: assignee?.color,
                                    initials: assignee?.initials,
                                    avatar: assignee?.profilePicture,
                                    email: assignee?.email,
                                    teamId: team_id,
                                });
                            }
                        });
                    }
                    if (Tasks.filter((t: any) => t.id === id).length === 0) {
                        Tasks.push({
                            id,
                            name,
                            description,
                            status: status.status,
                            assigneeId: assignees[0]?.id?.toString(),
                            // sprintId: sprint?.id,
                            tags: tags.map(({ name }) => name).join(', '),
                            teamId: team_id,
                            url,
                            listId: list.id,
                            projectId: project.id,
                            folderId: folder?.id
                        });
                    }
                });
                await Promise.all(taskPromises);
            });
            await Promise.all(listPromises);
        });
        await Promise.all(folderPromises);
    });
    await Promise.all(spacePromises);
    return { tasks: Tasks, folders: Folders, sprints: Sprints, profiles: Profiles };
}
