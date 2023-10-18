import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTasksOutput = RouterOutput["task"]["all"];
type allProfilesOutput = RouterOutput["profile"]["all"];
type allSprintOutput = RouterOutput["sprint"]["all"];
type allPointOutput = RouterOutput["point"]["all"];

// Tasks
export type Task = allTasksOutput[number];
export const SearchTask = z.object({
    id: z.string(),
    type: z.string(),
});
export type TaskProps = {
    task?: Task
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

// Points
export type Point = allPointOutput[number];
export type PointProps = {
    taskId?: string;
    type?: string;
    last?: boolean;
    pointObj?: Point;
}
export const CreatePoint = z.object({
    id: z.optional(z.string()),
    profileId: z.optional(z.string()),
    taskId: z.optional(z.string()),
    type: z.optional(z.string()),
    point: z.optional(z.number()),
});
