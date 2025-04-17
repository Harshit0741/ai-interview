'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { sideBarOptions } from "@/services/constants"
import Link from "next/link"
import { Plus } from "lucide-react"
import { usePathname } from "next/navigation"



export default function AppSidebar() {
    const path = usePathname();
    console.log(path)
  return (
    <Sidebar>
        <SidebarHeader className={"flex items-center justify-center"}>
            <Image src={"/logo.svg"} alt="Logo" width={200} height={100} className="w-[150px] " />
            <Button className="w-full cursor-pointer mt-3.5"><Plus/>Create New Interview</Button>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
                {sideBarOptions.map((option, index) => (
                    <SidebarMenuItem key={index} className="p-1">
                        <SidebarMenuButton asChild className={`p-5 ${path==option.path&&'bg-blue-100'}`} >
                            <Link href={option.path}>
                                <option.icon className={`${path==option.path&&'text-primary'}`} />
                                <span className={`text-[16px] font-medium ${path==option.path&&'text-primary'}`}>{option.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
