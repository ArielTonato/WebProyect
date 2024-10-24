import { v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

import OpenAI from 'openai';
import { Id } from "./_generated/dataModel";

const apikey = process.env.OPEN_AI_KEY
const openai = new OpenAI({ apiKey: apikey });

export const suggestMissingItemsWithAi = action({
    args: {
        projectId: v.id("projects")
    },
    handler: async (ctx, { projectId }) => {

        const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
            projectId
        })
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 1 additional to-do items that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions." },
                {
                    role: "user",
                    content: JSON.stringify(
                        todos,
                    ),
                }
            ],
            response_format: {
                type: "json_object"
            }
        });

        console.log(response.choices[0]);
        const messageContent = response.choices[0].message.content;
        console.log({ messageContent });

        if (messageContent) {
            const items = JSON.parse(messageContent)?.todos ?? [];
            console.log({ items });
            for (const item of items) {
                const { taskName, description } = item;
                const AI_LABEL_ID = "k577gbrvar6vqdffe42fsacmgn7347nd";
                await ctx.runMutation(api.todos.createATodo, {
                    taskName,
                    description,
                    priority: 1,
                    dueDate: new Date().getTime(),
                    projectId,
                    labelId: AI_LABEL_ID as Id<"labels">,
                });
            }
        }
    }
});