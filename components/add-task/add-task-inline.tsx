"use client"
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
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
import { es } from 'date-fns/locale'; // Importamos la localización española
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import moment from "moment"; 
import { GET_STARTED_PROJECT_ID } from "@/utils";

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
    parentTask,
    projectId: myProjectId,
 }: {
    setShowAddTask: Dispatch<SetStateAction<boolean>>,
    parentTask?: Doc<"todos">,
    projectId?: Id<"projects">
}) {
    const projectId =  myProjectId || parentTask?.projectId || GET_STARTED_PROJECT_ID as Id<"projects">;
    const labelId = parentTask?.labelId || "k57fd2xsbkv0cxmh2wbvwt9ryh71esg7" as Id<"labels">;
    const priority = parentTask?.priority?.toString() || "1";
    const parentId = parentTask?._id;

    const projects = useQuery(api.projects.getProjects);
    const labels = useQuery(api.labels.getLabels);

    const createATodoMutation = useAction(api.todos.createTodoAndEmbeddings);
    const createASubTodoMutation = useAction(api.subTodos.createSubTodoAndEmbeddings);
    const defaultValues = {
        taskName: "",
        description: "",
        priority: priority,
        dueDate: new Date(),
        projectId: projectId,
        labelId: labelId,
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
            } else {
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
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Selecciona una fecha</span>
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
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                                locale={es}
                                                classNames={{
                                                    caption: "flex justify-center pt-1 relative items-center",
                                                    caption_label: "text-sm font-medium",
                                                    nav: "space-x-1 flex items-center",
                                                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                                    nav_button_previous: "absolute left-1",
                                                    nav_button_next: "absolute right-1",
                                                    table: "w-full border-collapse space-y-1",
                                                    head_row: "flex",
                                                    head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                                                    row: "flex w-full mt-2",
                                                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                    day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                                                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                                    day_today: "bg-accent text-accent-foreground",
                                                    day_outside: "text-muted-foreground opacity-50",
                                                    day_disabled: "text-muted-foreground opacity-50",
                                                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                                    day_hidden: "invisible",
                                                }}
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