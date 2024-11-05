import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, Trash2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";
import { GET_STARTED_PROJECT_ID } from "@/utils";

export default function DeleteProject({
    projectId,
}:{
    projectId: Id<"projects">
}) {
    const form = useForm();
    const router = useRouter();

    const deleteProject = useAction(api.projects.deleteProjectAndItsTasks);

    const onSubmit = async () => {
    
        if(projectId === GET_STARTED_PROJECT_ID){
            toast({
                title: "No puedes eliminar este proyecto ⛔",
                description: "Este proyecto es necesario para comenzar a usar la aplicación",
                duration: 3000,
            })
            return;
        }
        const deleteProjectId = await deleteProject({ projectId });
        
        if(deleteProjectId !== undefined){
            toast({
                title: "Proyecto Eliminado 🗑️",
                duration: 3000,
            })
            router.push(`/loggedin/projects`);
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisIcon className="w-6 h-6 text-foreground hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="w-40 lg:w-56">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <button type="submit" className="flex gap-2 justify-center">
                            <Trash2 className="w-6 h-6 rotate-45 text-foreground/40" />
                            Eliminar Proyecto
                        </button>
                    </form>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
