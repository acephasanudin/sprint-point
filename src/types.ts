import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTasksOutput = RouterOutput["task"]["all"];
type allProfilesOutput = RouterOutput["profile"]["all"];
type allSprintOutput = RouterOutput["sprint"]["all"];

// Tasks
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

// Profiles
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

export type Sprint = allSprintOutput[number];
export type SprintProps = {
    sprint: Sprint
}
export type SprintData = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    projectId: string;
};
export const CreateSprint = z.object({
    name: z.string(),
    startDate: z.optional(z.date()),
    endDate: z.optional(z.date()),
    projectId: z.string(),
});

