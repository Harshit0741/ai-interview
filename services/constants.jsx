import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

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

export const interviewTypes = [
    {
        title:'Technical',
        icon:Code2Icon,
    },
    {
        title:'Behavioral',
        icon:User2Icon,
    },
    {
        title:'Experience',
        icon:BriefcaseBusinessIcon,
    },
    {
        title:'Problem Solving',
        icon:Puzzle,
    },
    // {
    //     title:'Leadership',
    //     icon:leader,
    // },
]
    
