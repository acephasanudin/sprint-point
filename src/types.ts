import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allQuestsOutput = RouterOutput["quest"]["all"];

export type Quest = allQuestsOutput[number];

export const questInput = z
  .string({
    required_error: "Input your list id",
  })
  .min(1)
  .max(50);
