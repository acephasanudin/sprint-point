// import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { questInput } from "../../../types";
// @ts-ignore-next-line
import axios, { AxiosRequestConfig } from 'axios';
let listId = '';

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

interface TaskListResponse {
    tasks: Task[];
}

export const questRouter = createTRPCRouter({
    // @ts-ignore-next-line
    all: protectedProcedure.query(async ({ ctx }) => {
        const apiToken = process.env.CLICKUP_API_TOKEN;
        const baseUrl = process.env.CLICKUP_BASE_URL || 'https://api.clickup.com/api/v2/';
        const headers: AxiosRequestConfig = {
            headers: {
                'Authorization': apiToken,
                'Content-Type': 'application/json',
            },
        };
        // get list tasks by list id
        // const listTasks = await axios.get(baseUrl + 'list/' + listId + '/task', headers);
        // const tasks = listTasks.data.tasks;
        // const quests = tasks.map(({ id, name, status }) => ({ id, name, status: status.status }));
        // return quests;

        const listTasks = await axios.get<TaskListResponse>(`${baseUrl}list/${listId}/task`, headers);
        const tasks: Task[] = listTasks.data.tasks;
        const quests = tasks.map(({ id, name, status }) => ({
            id,
            name,
            status: status.status
        }));
        return quests;

        // const quests = await ctx.prisma.quest.findMany({});
        // return quests.map(({ id, name, completed }) => ({ id, name, completed }));
    }),
    create: protectedProcedure.input(questInput).mutation(({ input }) => {
        listId = input;
        // return ctx.prisma.quest.create({
        //     data: {
        //         id: input,
        //         name: input,
        //         description: input,
        //     },
        // });
    }),
    // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    //     return ctx.prisma.quest.delete({
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
    //     return ctx.prisma.quest.update({
    //         where: {
    //             id,
    //         },
    //         data: {
    //             status,
    //         },
    //     });
    // }),
});
