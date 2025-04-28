import {  SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import { CreditsProvider } from '@/context/CreditsContext'

function DashboardProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <div className='w-full p-10'>
        <SidebarTrigger className="cursor-pointer" />
        <CreditsProvider>
        <WelcomeContainer/>
        </CreditsProvider>
            {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider