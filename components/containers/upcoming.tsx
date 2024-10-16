'use client'
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Dot } from "lucide-react";
import { AddTaskWrapper } from "../add-task/add-task-button";
import Todos from "../todos/todos";
import moment from "moment";
import "moment/locale/es";
moment.locale('es');

export default function Today() {

    const groupedTodos = useQuery(api.todos.groupTodosByDate);
    const overdueTodos = useQuery(api.todos.overdueTodos);

    if (groupedTodos === undefined
        || overdueTodos === undefined
    ) {
        return <div>Loading...</div>
    }
    return (
        <div className="xl:px-40">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Tareas por venir</h1>
            </div>
            <div className="flex flex-col gap-1 py-4">
                <div className="flex flex-col gap-1 py-4">
                    <p className="font-bold flex text-sm">Atrasadas</p>
                    <Todos items={overdueTodos} />
                </div>
                <AddTaskWrapper />
                <div className="flex flex-col gap-1 py-4">
                    {
                        Object.keys(groupedTodos).map((date) => {
                            return (
                                <div key={date} className="flex flex-col gap-1 py-4">
                                    <p className="font-bold flex text-sm items-center border-b-2 p-2 border-gray-100">
                                        {moment(date).format("dddd D [de] MMMM [del] YYYY")}
                                    </p>
                                    <ul>
                                        <Todos items={groupedTodos[date]} />
                                        <AddTaskWrapper />
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
