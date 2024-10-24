import {
    Menu,
    PlusIcon,
    Search,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { primaryNavsItems } from "@/utils"
import UserProfile from "./user-profile"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
export default function MobileNav() {
    return (
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-2 text-lg font-medium">
                            <UserProfile />
                            {
                                primaryNavsItems.map(({ name, icon, link }, idx) => (
                                    <Link
                                        key={idx}
                                        href={link}
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        {icon}
                                        {name}
                                    </Link>
                                ))
                            }
                            <Dialog>
                                <DialogTrigger id="closeDialog">
                                    <p className="flex justify-between items-center">
                                        Mis proyectos
                                        <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
                                    </p>
                                </DialogTrigger>
                                <DialogContent>
                                    <div>
                                        <h1 className="text-lg font-semibold">Add a Project</h1>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
}
