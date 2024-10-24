import { Doc } from "@/convex/_generated/dataModel";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar, ChevronDown, Flag, Hash, Tag } from "lucide-react";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import Task from "../todos/task";
import { unCheckASubTodo } from '../../convex/subTodos';
import { AddTaskWrapper } from "./add-task-button";
import SuggestMissingTasks from "./suggest-tasks";

export default function AddTaskDialog({ data }: {
    data: Doc<"todos">;
}) {
    const { taskName, description, projectId, labelId, priority, dueDate, _id } = data;
    const priorityMap = {
        1: "Prioridad Baja",
        2: "Prioridad Media",
        3: "Prioridad Alta"
    };

    const project = useQuery(api.projects.getProjectByProjectId, { projectId });
    const labels = useQuery(api.labels.getLabelByLabelId, { labelId });
    const inCompleteSubTodosByProject = useQuery(api.subTodos.inCompleteSubTodos, { parentId: _id }) ?? [];
    const completedSubTodosByProject = useQuery(api.subTodos.completedSubTodos, { parentId: _id }) ?? [];
    const checkASubTodoMutation = useMutation(api.subTodos.checkASubTodo);
    const unCheckASubTodoMutation = useMutation(api.subTodos.unCheckASubTodo);

    const [todoDetails, setTodoDetails] = useState([]);
    useEffect(() => {
        const data = [
            {
                labelName: "Proyecto",
                value: project?.name || "Sin Proyecto",
                icon: <Hash className="w-4 h-4 text-primary capitalize" />
            },
            {
                labelName: "Fecha Limite",
                value: format(dueDate, "dd/MM/yyyy"),
                icon: <Calendar className="w-4 h-4 text-primary capitalize" />
            }, {
                labelName: "Prioridad",
                // @ts-ignore
                value: priorityMap[priority],
                icon: <Flag className="w-4 h-4 text-primary capitalize" />
            },
            {
                labelName: "Label",
                value: labels?.name || "Sin Etiqueta",
                icon: <Tag className="w-4 h-4 text-primary capitalize" />
            },
        ];
        // @ts-ignore
        setTodoDetails(data);
    }, [labels?.name, project]);


    return (
        <DialogContent className="max-w-4xl md:h-4/6 flex flex-col md:flex-row md:justify-between text-right">
            <DialogHeader className="w-full">
                <DialogTitle>{taskName}</DialogTitle>
                <DialogDescription>
                    <p className="my-2 capitalize">
                        {description}</p>
                    <div className="flex
items-center gap-1 mt-12
border-b-2 border-gray-100 pb-2
flex-wrap sm: justify-between
lg:gap-0 ">
                        <div className="flex gap-1">
                            <ChevronDown className="w-5
h-5 text-primary" />
                            <p className="font-bold flex text-sm text-gray-700">Sub-Tareas</p>
                        </div>
                        <div>
                            <SuggestMissingTasks
                                projectId={projectId}
                                taskName={taskName}
                                description={description}
                                parentId={_id}
                                isSubTask={true}
                            />
                        </div>
                    </div>
                    <div className="pl-4">
                        {
                            inCompleteSubTodosByProject.map((task) => {
                                return <Task
                                    key={task._id}
                                    data={task}
                                    isCompleted={task.isCompleted}
                                    handleOnChange={() => {
                                        checkASubTodoMutation({ taskId: task._id })
                                    }}
                                />
                            })
                        }
                        <div className="pb-4">
                            <AddTaskWrapper parentTask={data} />
                        </div>
                        {
                            completedSubTodosByProject.map((task) => {
                                return <Task
                                    key={task._id}
                                    data={task}
                                    isCompleted={task.isCompleted}
                                    handleOnChange={() => {
                                        unCheckASubTodoMutation({ taskId: task._id })
                                    }}
                                />
                            })
                        }
                    </div>
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 bg-gray-100 lg:w-1/2">
                {todoDetails.map(({ labelName, value, icon }, idx) => (
                    <div
                        key={`$ {value}-${idx}`}
                        className="grid gap-2 p-4 border-b-2 w-full"
                    >
                        <Label className="flex items-start">{labelName}</Label>
                        <div className="flex text-left items-center justify-start gap-2 pb-2">
                            {icon}
                            <p className="text-sm">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </DialogContent>
    )
}
