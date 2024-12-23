import { Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddTaskInLine from "./add-task-inline";
import { Doc, Id } from "@/convex/_generated/dataModel";

export const AddTaskWrapper = ({
    parentTask,
    projectId
}:{
    parentTask?: Doc<"todos">;
    projectId?: Id<"projects">
}) => {
    const [showAddTask, setShowAddTask] = useState(false);

    return showAddTask ? <AddTaskInLine setShowAddTask={setShowAddTask} parentTask={parentTask} 
    projectId={projectId}
    /> : <AddTaskButton onClick={
        () => setShowAddTask(true)
    } title = {parentTask?._id ? "Añadir Subtarea" : "Añadir Tarea"} 
    />;
};

export default function AddTaskButton({ onClick,
    title
 }: {
    onClick: Dispatch<SetStateAction<any>>,
    title: string
}) {
    return (
        <button className="pl-2 flex mt-2 flex-1" onClick={onClick}>
            <div className="flex flex-col items-center justify-center gap-1 text-center">
                <div className="flex items-center gap-2 justify-center">
                    <Plus className="h-6 w-6 text-primary hover:bg-primary hover:rounded-2xl hover:text-white transition-all" />
                    <h3 className="text-base font-light tracking-tight text-foreground/70">
                        {title}
                    </h3>
                </div>
            </div>
        </button>
    );
}
