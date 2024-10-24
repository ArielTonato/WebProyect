'use client';
import Link from "next/link"

import UserProfile from "./user-profile"
import { primaryNavsItems } from '../../utils/index';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";



export default function SideBar() {
    const pathname = usePathname();
    return (

        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <UserProfile />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {
                            primaryNavsItems.map(({name, icon,link},idx) => (
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
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>

    )
}
