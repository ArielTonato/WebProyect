'use client';
import Link from "next/link"

import UserProfile from "./user-profile"
import { primaryNavsItems } from '../../utils/index';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Hash, PlusIcon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import AddProjectDialog from "../projects/add-project-dialog";

interface MyListTitleType {
    [key: string]: string;
}

export default function SideBar() {
    const pathname = usePathname();

    const projectList = useQuery(api.projects.getProjects) ?? [];

    const LIST_OF_TITLE_IDS: MyListTitleType = {
        primary: "",
        projects: "Mis Proyectos",
    }

    const [navItems, setNavItems] = useState([...primaryNavsItems]);

    const renderItems = (projectList: Array<Doc<"projects">>) => {
        return projectList.map(({ _id, name }, idx) => {
            return {
                ...(idx === 0 && { id: "projects" }),
                name,
                link: `/loggedin/projects/${_id.toString()}`,
                icon: <Hash className="w-4 h-4" />
            };
        });
    };

    useEffect(() => {
        if (projectList) {
            const projectItems = renderItems(projectList);
            const items = [...primaryNavsItems, ...projectItems];
            setNavItems(items);
        }
    }, [projectList]);
    return (

        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <UserProfile />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {
                            navItems.map(({ name, icon, link, id }, idx) => (
                                <div key={idx}>
                                    {id && (
                                        <div className="flex items-center mt-6 mb-2">
                                            <p className="flex flex-1 text-base">
                                                {LIST_OF_TITLE_IDS[id]}
                                            </p>
                                            {LIST_OF_TITLE_IDS[id] === "Mis Proyectos" && (
                                                <AddProjectDialog />
                                            )}
                                        </div>
                                    )
                                    }
                                    <Link
                                        key={idx}
                                        href={link}
                                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                            pathname === link ? "active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary" : "text-foreground"
                                        )}
                                    >
                                        {icon}
                                        {name}
                                    </Link>
                                </div>
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>

    )
}
