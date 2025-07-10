import { v } from "convex/values";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

import OpenAI from 'openai';
import { Id } from "./_generated/dataModel";

const apiKey = process.env.OPEN_AI_KEY;

// Validar que la clave de API esté presente
if (!apiKey) {
  console.error("OPEN_AI_KEY environment variable is not set");
}

const openai = new OpenAI({ 
  apiKey: apiKey,
  dangerouslyAllowBrowser: false // Asegurar que no se use en el cliente
});

export const suggestMissingItemsWithAi = action({
    args: {
        projectId: v.id("projects")
    },
    handler: async (ctx, { projectId }) => {
        try {
            if (!apiKey) {
                throw new Error("OpenAI API key is not configured");
            }

            const todos = await ctx.runQuery(api.todos.getTodosByProjectId, {
                projectId
            })

            const project = await ctx.runQuery(api.projects.getProjectByProjectId, {
                projectId
            });

            const projectName = project?.name ?? "Project";

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 3 additional to-do items that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions, the suggestions have to be in spanish." },
                    {
                        role: "user",
                        content: JSON.stringify(
                            {
                                todos,
                                projectName
                            }
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
                const AI_LABEL_ID = "k577gbrvar6vqdffe42fsacmgn7347nd";
                
                for (const item of items) {
                    const { taskName, description } = item;
                    const embedding = await getEmbeddingsWithAI(taskName);
                    await ctx.runMutation(api.todos.createATodo, {
                        taskName,
                        description,
                        priority: 1,
                        dueDate: new Date().getTime(),
                        projectId,
                        labelId: AI_LABEL_ID as Id<"labels">,
                        embedding
                    });
                }
            }
        } catch (error) {
            console.error("Error in suggestMissingItemsWithAi:", error);
            throw new Error(`Failed to generate AI suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
});

export const suggestMissingSubItemsWithAi = action({
    args: {
        projectId: v.id("projects"),
        parentId: v.id("todos"),
        taskName: v.string(),
        description: v.string()
    },
    handler: async (ctx, { projectId, parentId, taskName, description }) => {
        try {
            if (!apiKey) {
                throw new Error("OpenAI API key is not configured");
            }

            const todos = await ctx.runQuery(api.subTodos.getSubTodosByParentId, {
                parentId
            });

            const project = await ctx.runQuery(api.projects.getProjectByProjectId, {
                projectId
            });

            const projectName = project?.name ?? "Project";

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 3 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions, the suggestions have to be in spanish" },
                    {
                        role: "user",
                        content: JSON.stringify(
                            {
                                todos,
                                projectName,
                                ...{ parentTodo: { taskName, description } }
                            }
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
                const AI_LABEL_ID = "k577gbrvar6vqdffe42fsacmgn7347nd";
                console.log({ items });
                for (const item of items) {
                    const { taskName, description } = item;
                    const embedding = await getEmbeddingsWithAI(taskName);
                    await ctx.runMutation(api.subTodos.createASubTodo, {
                        taskName,
                        description,
                        priority: 1,
                        dueDate: new Date().getTime(),
                        projectId,
                        parentId,
                        labelId: AI_LABEL_ID as Id<"labels">,
                        embedding
                    });
                }
            }
        } catch (error) {
            console.error("Error in suggestMissingSubItemsWithAi:", error);
            throw new Error(`Failed to generate AI sub-suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
});

export const getEmbeddingsWithAI = async (searchText: string) => {
    try {
        if (!apiKey) {
            throw new Error("OpenAI API key is not configured. Please set the OPEN_AI_KEY environment variable.");
        }

        // Validar que la clave de API tenga el formato correcto
        if (!apiKey.startsWith('sk-')) {
            throw new Error("Invalid OpenAI API key format. API keys should start with 'sk-'");
        }

        const req = {
            input: searchText,
            model: "text-embedding-ada-002",
            encoding_format: "float",
        };

        const response = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `OpenAI API Error (${response.status}): ${errorText}`;
            
            // Proporcionar mensajes de error más específicos
            if (response.status === 401) {
                errorMessage = "Invalid OpenAI API key. Please check your API key configuration.";
            } else if (response.status === 429) {
                errorMessage = "OpenAI API rate limit exceeded. Please try again later.";
            } else if (response.status === 500) {
                errorMessage = "OpenAI API server error. Please try again later.";
            }
            
            throw new Error(errorMessage);
        }

        const json = await response.json();
        
        if (!json.data || !json.data[0] || !json.data[0].embedding) {
            throw new Error("Invalid response format from OpenAI API");
        }

        const vector = json.data[0].embedding;
        console.log(`Embedding of "${searchText}": ${vector.length} dimensions`);
        return vector;
    } catch (error) {
        console.error("Error in getEmbeddingsWithAI:", error);
        
        // Si hay un error con OpenAI, devolver un vector vacío para evitar fallos
        // Esto permite que la aplicación funcione sin IA temporalmente
        console.warn("Returning empty embedding due to OpenAI error");
        return new Array(1536).fill(0);
    }
};