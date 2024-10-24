'use client';
import { AddTaskWrapper } from "@/components/add-task/add-task-button";
import MobileNav from "@/components/nav/mobile-nav";
import SideBar from "@/components/nav/side-bar";
import CompletedTodos from "@/components/todos/completed-todos";
import Todos from "@/components/todos/todos";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { totalTodos, completedTodos } from '../../../../convex/todos';
import SuggestMissingTasks from "@/components/add-task/suggest-tasks";

export default function ProjectIdPage() {
    const { projectId } = useParams<{
        projectId: Id<"projects">
    }>();
    const incompletedTodosByProject = useQuery(api.todos.getInCompleteTodosByProjectId, { projectId }) ?? [];
    const completedTodosByProject = useQuery(api.todos.getCompletedTodosByProjectId, { projectId }) ?? [];
    const project = useQuery(api.projects.getProjectByProjectId, { projectId });
    const projectTodosTotal = useQuery(api.todos.getTodosTotalByProjectId, { projectId }) ?? 0;
    const projectName = project?.name ?? "Proyecto";
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <SideBar />
            <div className="flex flex-col">
                <MobileNav />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">{projectName}</h1>
                        <div className="flex gap-6 lg:gap-12 items-center">
                            <SuggestMissingTasks projectId={
                                projectId
                            } />
                        </div>
                    </div>
                    <Todos items={incompletedTodosByProject} />
                    <div className="pb-6">
                        <AddTaskWrapper />
                    </div>

                    <Todos items={completedTodosByProject} />

                    <CompletedTodos totalTodos={projectTodosTotal} />

                </main>
            </div>
        </div>
    );
}
