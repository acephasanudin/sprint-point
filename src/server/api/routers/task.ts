import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import axios from 'axios';

interface Task {
    id: string;
    custom_id: null | string;
    name: string;
    text_content: string;
    description: string;
    status: {
        status: string;
        color: string;
        type: string;
        orderindex: number;
    };
    orderindex: string;
    date_created: string;
    date_updated: string;
    date_closed: null | string;
    date_done: null | string;
    archived: boolean;
    creator: {
        id: number;
        username: string;
        color: string;
        email: string;
        profilePicture: string;
    };
    assignees: {
        id: number;
        username: string;
        color: string;
        initials: string;
        email: string;
        profilePicture: string;
    }[];
    // @ts-ignore-next-line
    watchers: any[]; // You can replace `any` with a more specific type if needed
    // @ts-ignore-next-line
    checklists: any[]; // You can replace `any` with a more specific type if needed
    tags: {
        name: string;
        tag_fg: string;
        tag_bg: string;
        creator: number;
    }[];
    parent: null | string;
    priority: null | string;
    due_date: null | string;
    start_date: null | string;
    points: null | number;
    time_estimate: null | string;
    custom_fields: {
        id: string;
        name: string;
        type: string;
        type_config: {
            tracking: {
                subtasks: boolean;
                checklists: boolean;
                assigned_comments: boolean;
            };
            complete_on: number;
            subtask_rollup: boolean;
        };
        date_created: string;
        hide_from_guests: boolean;
        value: {
            percent_complete: number;
        };
        required: boolean;
    }[];
    // @ts-ignore-next-line
    dependencies: any[]; // You can replace `any` with a more specific type if needed
    // @ts-ignore-next-line
    linked_tasks: any[]; // You can replace `any` with a more specific type if needed
    team_id: string;
    url: string;
    sharing: {
        public: boolean;
        public_share_expires_on: null | string;
        public_fields: string[];
        token: null | string;
        seo_optimized: boolean;
    };
    permission_level: string;
    list: {
        id: string;
        name: string;
        access: boolean;
    };
    project: {
        id: string;
        name: string;
        hidden: boolean;
        access: boolean;
    };
    folder: {
        id: string;
        name: string;
        hidden: boolean;
        access: boolean;
    };
    space: {
        id: string;
    };
}

export const taskRouter = createTRPCRouter({
    all: protectedProcedure.input(z.object({ id: z.optional(z.string()), start: z.number(), limit: z.number() })).query(async ({ ctx, input }) => {
        if (input.id !== "") {
            const task = await ctx.db.task.findMany({
                include: {
                    points: true,
                },
                where: {
                    id: input.id,
                },
            });
            return task;
        }
        const tasks = await ctx.db.task.findMany({
            include: {
                points: true,
            },
            skip: input.start,
            take: input.limit,
        });
        return tasks;
    }),
    findOne: protectedProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
        const task = await ctx.db.task.findUnique({
            where: {
                id,
            },
        });
        return task;
    }),
    findTask: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        if (input !== "") {
            const taskById = await ctx.db.task.findMany({
                where: { id: input },
            });
            if (taskById.length > 0) {
                return taskById;
            }
            const API_TOKEN = process.env.CLICKUP_API_TOKEN;
            const BASE_URL = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
            const headers = {
                headers: {
                    'Authorization': API_TOKEN,
                    'Content-Type': 'application/json',
                },
            };
            const getTask = await axios.get<Task>(`${BASE_URL}task/${input}`, headers);
            if (getTask.status !== 200 || !getTask.data) return [{ name: "Please wait, searching in clickup..." }];
            const { id, name, description, status, assignees, tags, team_id, url, list, project, folder }: any = getTask.data;
            const taskClickup = {
                id,
                name,
                description,
                status: status.status,
                tags: tags.map(({ name }: any) => name).join(', '),
                teamId: team_id,
                url,
                listId: list.id,
                projectId: project.id,
                folderId: folder?.id
            };
            await ctx.db.task.upsert({
                where: {
                    id: input,
                },
                update: taskClickup,
                create: taskClickup,
            });

            if (list.name.includes('Sprint')) {
                await ctx.db.sprint.upsert({
                    where: {
                        id: list.id,
                    },
                    update: {
                        name: list.name
                    },
                    create: {
                        id: list.id,
                        name: list.name
                    },
                });
            }
            return taskClickup;
        }
        return true;
    }),
});
