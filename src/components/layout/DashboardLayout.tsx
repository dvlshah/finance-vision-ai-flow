
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Bell, User, Search } from "lucide-react"
import { useState } from "react"
import { UploadModal } from "../modals/UploadModal"
import { MobileBottomNav } from "../navigation/MobileBottomNav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="min-h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* Spacer */}
            <div className="flex-1" />
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                variant="gradient"
                size="touch-sm"
                className="hidden sm:flex"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden md:inline">Upload</span>
              </Button>
              
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                variant="gradient"
                size="icon"
                className="sm:hidden"
              >
                <Upload className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-3 w-3 p-0 text-xs">
                  3
                </Badge>
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto py-6 pb-20 md:pb-6">
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
        
        <UploadModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
        />
      </SidebarProvider>
    </div>
  )
}
