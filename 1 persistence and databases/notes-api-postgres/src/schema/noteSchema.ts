import { z } from "zod";
import { partial } from "zod/mini";

export const createNoteSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, {message: "Name must have greater than 1 characters."}),
        description: z
            .string()
            .min(4, {message: "Description mush have greater than 4 characters."}),
    }),
});

export const updateNoteSchema = z.object({
    params: z.object({id: z.string()}),
    body: z
        .object({
            name: z
                .string()
                .min(1, {message: "Name must have greater than 1 characters."}),
            description: z
                .string()
                .min(4, {message: "Name must have greater than 4 characters."})
        })
        .partial(),
});