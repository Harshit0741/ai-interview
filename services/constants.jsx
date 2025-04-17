import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const sideBarOptions = [
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Scheduling Interview",
        icon:Calendar,
        path: "/schedule",
    },
    {
        name: "All Interview",
        icon:List,
        path: "/interviews",
    },
    {
        name: "Billing",
        icon:WalletCards,
        path: "/billing",
    },
    {
        name: "Settings",
        icon:Settings,
        path: "/settings",
    },
]
    
