"use client"
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"

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
import { description } from '../nav/side-bar';
import { CalendarIcon, Text } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { CardFooter } from "../ui/card";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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



export default function AddTaskInline({ setShowAddTask }: {
    setShowAddTask: Dispatch<SetStateAction<boolean>>
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            taskName: "",
            description: "",
            priority: "1",
            dueDate: new Date(),
            projectId: "k97en8g66cnpfqf2bmjnkp151d71ehnh",
            labelId: "k57fd2xsbkv0cxmh2wbvwt9ryh71esg7",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20">
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
                                            disabled={(date) =>
                                                 date < new Date("2024-09-27")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
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