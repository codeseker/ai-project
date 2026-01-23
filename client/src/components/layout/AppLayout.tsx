import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col bg-background">
        <header className="h-14 border-b border-border" />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
