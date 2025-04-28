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
import { ArrowRightCircle, DoorOpen, Plus } from "lucide-react"
import { usePathname,  useRouter  } from "next/navigation"
import { useState } from "react"


export default function AppSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const path = usePathname();
  console.log(path);
  const router = useRouter();

  // Toggle Settings Dropdown when Settings option is clicked
  const toggleSettingsDropdown = (name) => {
    if (name === 'Settings') {
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false); // Close the dropdown when clicking outside Settings
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center justify-center"}>
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <Button className="w-full cursor-pointer mt-3.5" onClick={()=>router.push('/dashboard/create-interview')}><Plus />Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {sideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${path === option.path && 'bg-blue-100'}`}
                    onClick={() => toggleSettingsDropdown(option.name)} // Toggle dropdown on Settings click
                  >
                    <Link href={option.path}>
                      <option.icon className={`${path === option.path && 'text-primary'}`} />
                      <span className={`text-[16px] font-medium ${path === option.path && 'text-primary'}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* Dropdown for Settings only */}
                  {isSettingsOpen && option.name === 'Settings' && (
                    <div className="ml-4 mt-2 bg-white p-2 rounded-lg shadow-md flex flex-col">
                      <Link href="">
                        <p className="rounded py-2 text-sm text-red-500 hover:bg-gray-100 hover:rounded">Log Out </p>
                      </Link>
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
