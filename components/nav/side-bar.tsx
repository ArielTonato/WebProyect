import Link from "next/link"
import {
    Bell,
    Calendar,
    CalendarDays,
    Grid2X2,
    Home,
    Inbox,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import UserProfile from "./user-profile"
import { link } from "fs"
import { primaryNavsItems } from '../../utils/index';



export default function SideBar() {
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
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
