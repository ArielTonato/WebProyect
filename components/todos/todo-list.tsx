'use client'
import { api } from "@/convex/_generated/api"
import { Checkbox } from "@radix-ui/react-checkbox";
import { useQuery } from "convex/react"
import Task from "./task";
import { CircleCheckBig } from "lucide-react";
import Todos from "./todos";

export default function TodoList() {

    const todos = useQuery(api.todos.get);
    const completedTodos = useQuery(api.todos.completedTodos);
    const inCompletedTodos = useQuery(api.todos.inCompletedTodos);
    const totalTodos = useQuery(api.todos.totalTodos);
    if (todos === undefined || completedTodos === undefined || inCompletedTodos === undefined) {
        return <div>Loading...</div>
    }
    return (
        <div className="xl:px-40">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
            </div>
            <div className="flex flex-col gap-1 py-4">
                <div className="flex flex-col gap-1 py-4">
                    <Todos items={completedTodos} />
                </div>

                <div className="flex flex-col gap-1 py-4">
                    <Todos items={inCompletedTodos} />
                </div>


                <div className="flex items-center gap-1 border-b-2 p-2 border-gray-100 text-sm text-foreground/80">
                        <>
                            <CircleCheckBig />
                            <span>+ {totalTodos}</span>
                            <span className="capitalize">completed tasks</span>
                        </>
                    </div>
            </div>
        </div>
    )
}
