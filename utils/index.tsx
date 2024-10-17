import { Calendar, CalendarDays, Grid2X2, Inbox } from "lucide-react";

export const primaryNavsItems = [
    {
        name:"Inicio",
        link:"/loggedin",
        icon: <Inbox className="w-4 h-4" />
    },
    {
        name:"Para Hoy",
        link:"/loggedin/today",
        icon: <Calendar  className="w-4 h-4" />
    },
    {
        name:"Por Venir",
        link:"/loggedin/upcoming",
        icon: <CalendarDays className="w-4 h-4" />
    },
    {
        name:"Etiquetas",
        link:"/loggedin/labels",
        icon: <Grid2X2 className="w-4 h-4" />
    }
]