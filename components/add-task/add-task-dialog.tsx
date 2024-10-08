import { Doc } from "@/convex/_generated/dataModel";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar, Flag, Hash, Tag } from "lucide-react";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

export default function AddTaskDialog({ data: { taskName, description, projectId, labelId, priority,dueDate } }: {
    data: Doc<"todos">;
}) {

    const project = useQuery(api.projects.getProjectByProjectId, { projectId });
    const labels = useQuery(api.labels.getLabelByLabelId, { labelId });
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
                value: priority,
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
        <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col md:flex-row lg:justify-between text-right">
            <DialogHeader>
                <DialogTitle>{taskName}</DialogTitle>
                <DialogDescription>
                    {description}
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
