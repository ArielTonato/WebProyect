import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { useAction } from "convex/react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { api } from "@/convex/_generated/api";

export default function SuggestMissingTasks({
    projectId,
    isSubTask = false,
    taskName = '',
    description = '',
    parentId
}:
    {
        projectId: Id<"projects">;
        isSubTask?: boolean;
        taskName?: string, 
        description?: string, 
        parentId: Id<"todos">;
    }) {

    const [isLoadingSuggestMissingTasks, setIsLoadingSuggestMissingTasks] = useState(false);

    const suggestMissingTasks = useAction(api.openai.suggestMissingItemsWithAi) || [];

    const suggestMissingSubTasks = useAction(api.openai.suggestMissingSubItemsWithAi) || [];

    const handleMissingTasks = async () => {
        setIsLoadingSuggestMissingTasks(true);

        try {
            await suggestMissingTasks({ projectId });
        } catch (error) {
            console.log("Error al sugerir Tareas", error);
        } finally {
            setIsLoadingSuggestMissingTasks(false);
        }
    };

    const handleMissingSubTasks = async () => {
        setIsLoadingSuggestMissingTasks(true);

        try {
            await suggestMissingSubTasks({ projectId, taskName, description, parentId });
        } catch (error) {
            console.log("Error al sugerir Tareas", error);
        } finally {
            setIsLoadingSuggestMissingTasks(false);
        }
    };
    return (
        <Button
            variant={"outline"}
            disabled={isLoadingSuggestMissingTasks}
            onClick={isSubTask ? handleMissingSubTasks: handleMissingTasks}
        >
            {isLoadingSuggestMissingTasks ? (
                <div className="flex gap-2">
                    Loading Tasks (AI)
                    <Loader className="h-5 w-5 text-primary" />
                </div>
            ) : (
                "Sugerir Tareas (AI) 🅰️"
            )}
        </Button>
    );
}
