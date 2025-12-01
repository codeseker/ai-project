import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import MySidebar from "./sidebar";

export default function Layout() {
    return (
        <div className="flex h-screen bg-[#0f0f0f] text-white">
            <SidebarProvider>
                {/* LEFT SIDEBAR */}
                <MySidebar />


                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-6">

                    <div className="mb-4">
                        <SidebarTrigger />
                    </div>
                    <Outlet />
                </main>

            </SidebarProvider>
            <main>
            </main>
        </div>
    );
}
