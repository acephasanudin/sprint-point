import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTasksOutput = RouterOutput["task"]["all"];

export type Task = allTasksOutput[number];
export const TaskInput = z
    .string({
        required_error: "Input your list id",
    });
export type TaskProps = {
    task: Task
}
export type TaskData = {
    id: string;
    point?: number;
    review?: number;
    testing?: number;
};
