import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTasksOutput = RouterOutput["task"]["all"];
type allProfilesOutput = RouterOutput["profile"]["all"];

export type Task = allTasksOutput[number];
export const SearchTask = z.object({
    id: z.string(),
    type: z.string(),
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

export type Profile = allProfilesOutput[number];
export type ProfileProps = {
    profile: Profile
}
export type ProfileData = {
    id: string;
    username: string;
    color: string;
    initials: string;
    avatar: string;
    email: string;
    teamId: string;
};
