import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col bg-background">
        {/* ---------- HEADER ---------- */}
        <header
          className="
            sticky top-0 z-20
            flex h-14 items-center gap-3
            border-b border-border
            bg-background/80 backdrop-blur
            px-4
          "
        >
          <SidebarTrigger />

          <Separator orientation="vertical" className="h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  App
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ---------- CONTENT ---------- */}
        <main
          className="
            flex-1 overflow-y-auto
            bg-background
          "
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
