"use client";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast"


export default function AddProjectDialog() {
    return (
        <Dialog>
            <DialogTrigger id="closeDialog">
                <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
            </DialogTrigger>
            <AddProjectDialogContent />
        </Dialog>
    )
}


function AddProjectDialogContent() {
    const form = useForm({defaultValues: {name: ""}});

    const router = useRouter();
    const createAProject = useMutation(api.projects.createAProject);

    const onSubmit = async ({ name }: any) => {
        console.log(name);

    
        const projectId = await createAProject({ name });
        if(projectId !== undefined){
            toast({
                title: "Proyecto creado",
                duration: 3000,
            })
            form.reset({name: ""});
            router.push(`/loggedin/projects/${projectId}`);
        }
    }

    return (
        <DialogContent className="max-w-xl lg:h-56 flex flex-col lg:justify-between text-right">
            <DialogHeader className="w-full">
                <DialogTitle>Agregar Proyecto</DialogTitle>
            </DialogHeader>
            <DialogDescription className="capitalize">
                <Form {...form}>
                    <form
                        className="lg:flex lg:items-center justify-end w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="relative flex gap-2 items-center w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                placeholder="Nombre del proyecto..."
                                                className="w-full appearance-none bg-background pl-8 shadow-none h-10"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <Button className="hover:bg-orange-600 px-4">
                                Añadir Proyecto
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogDescription>
        </DialogContent>
    )
}