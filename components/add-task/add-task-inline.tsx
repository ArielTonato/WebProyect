"use client"
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast, useToast } from "@/hooks/use-toast"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Text } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { CardFooter } from "../ui/card";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { getProjects } from '../../convex/projects';
import { api } from "@/convex/_generated/api";
import moment, { duration } from "moment"; 
import { createASubTodo } from '../../convex/subTodos';


const FormSchema = z.object({
    taskName: z.string().min(2, {
        message: "El nombre de la tarea debe tener al menos 2 caracteres",
    }),
    description: z.string().optional(),
    dueDate: z.date({
        required_error: "La fecha de vencimiento es requerida"
    }),
    priority: z.string().min(1, {
        message: "La prioridad de la tarea es requerida"
    }),
    projectId: z.string().min(1, {
        message: "El proyecto es requerido"
    }),
    labelId: z.string().min(1, {
        message: "La etiqueta es requerida"
    }),
})



export default function AddTaskInline({ 
    setShowAddTask,
    parentTask
 }: {
    setShowAddTask: Dispatch<SetStateAction<boolean>>,
    parentTask?: Doc<"todos">
}) {
    const projectId = parentTask?.projectId || "k97en8g66cnpfqf2bmjnkp151d71ehnh";
    const labelId = parentTask?.labelId || "k57fd2xsbkv0cxmh2wbvwt9ryh71esg7";
    const priority = parentTask?.priority?.toString() || "1";
    const parentId = parentTask?._id;

    const projects = useQuery(api.projects.getProjects);
    const labels = useQuery(api.labels.getLabels);

    const createATodoMutation = useMutation(api.todos.createATodo);
    const createASubTodoMutation = useMutation(api.subTodos.createASubTodo);
    const defaultValues = {
        taskName: "",
        description: "",
        priority: priority,
        dueDate: new Date(),
        projectId: projectId ,
        labelId: labelId ,
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { taskName, description, priority, dueDate, projectId, labelId } = data;

        if (projectId) {
            if(parentId){
                const mutationId = createASubTodoMutation({
                    taskName,
                    description,
                    parentId,
                    priority: parseInt(priority),
                    dueDate: moment(dueDate).valueOf(),
                    projectId: projectId as Id<"projects">,
                    labelId: labelId as Id<"labels">
                });
    
                if (mutationId !== undefined) {
                    toast({
                        title: "Tarea creada 🧑‍🚀",
                        duration: 2000,
                    })
                    form.reset({ ...defaultValues });
                }
            }else{
                const mutationId = createATodoMutation({
                    taskName,
                    description,
                    priority: parseInt(priority),
                    dueDate: moment(dueDate).valueOf(),
                    projectId: projectId as Id<"projects">,
                    labelId: labelId as Id<"labels">
                });
    
                if (mutationId !== undefined) {
                    toast({
                        title: "Tarea creada 🧑‍🚀",
                        duration: 2000,
                    })
                    form.reset({ ...defaultValues });
                }
            }

        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 bg-white border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20">
                    <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="taskName"
                                        type="text"
                                        placeholder="Nombre de la tarea"
                                        required
                                        className="border-0 font-semibold text-lg"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-start gap-2">
                                        <Text className="ml-auto h-4 w-4 opacity-50" />
                                        <Textarea
                                            id="description"
                                            placeholder="Descripción"
                                            required
                                            className="resize-none"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date()}  // Comparar con la fecha actual
                                                initialFocus
                                            />

                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={priority}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione una prioridad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Prioridad Baja</SelectItem>
                                            <SelectItem value="2">Prioridad Media</SelectItem>
                                            <SelectItem value="3">Prioridad Alta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="labelId"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={labelId || field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccione una etiqueta" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {labels?.map((label: Doc<"labels">, idx: number) => (
                                                <SelectItem key={idx} value={label._id}>{label.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="projectId"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={projectId || field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un proyecto" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projects?.map((project: Doc<"projects">, idx: number) => (
                                            <SelectItem key={idx} value={project._id}>{project.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <CardFooter className="flex flex-col lg:flex-row lg:justify-between gap-2 border-t-2 pt-3">
                        <div className="w-full lg:w-1/4"></div>
                        <div className="flex gap-3 self-end">
                            <Button
                                className="bg-gray-300/40 text-gray-950 px-6 hover:bg-gray-300"
                                variant={"outline"}
                                type="submit"
                                onClick={() => setShowAddTask(false)}
                            >
                                Cancelar
                            </Button>
                            <Button className="px-6" type="submit">
                                Añadir Tarea
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>

        </div>
    );
}