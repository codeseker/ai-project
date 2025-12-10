// import { Outlet } from "react-router-dom";
// import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
// import MySidebar from "./sidebar";

// export default function Layout() {
//     return (
//         <div className="flex h-screen bg-[#0f0f0f] text-white">
//             <SidebarProvider>
//                 <div className="flex h-full w-full">

//                     {/* Sidebar always visible on desktop, collapsible on mobile */}
//                     <MySidebar />

//                     <div className="flex flex-col flex-1">

//                         {/* Top bar (only visible on mobile) */}
//                         <div className="p-2 border-b border-[#222] md:hidden">
//                             <SidebarTrigger />
//                         </div>

//                         <main className="flex-1 overflow-auto">
//                             <Outlet/>
//                         </main>
//                     </div>

//                 </div>
//             </SidebarProvider>

//             <main>
//             </main>
//         </div>
//     );
// }



import { AppSidebar } from "@/components/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    App
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />  
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
