"use client";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import Sidebar from "@/components/custom/SideBar";
import { cn } from "@/lib/utils";
import Header from "@/components/custom/Header";
import Spinner from "@/components/ui/spinner";

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    const { isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    if (isLoading) return <Spinner />

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} direction="left">
                <Header
                    desktopCollapsed={desktopCollapsed}
                    setDesktopCollapsed={setDesktopCollapsed}
                />
                <DrawerContent className="w-[80%] max-w-[200px] p-0 md:hidden">
                    <DrawerHeader className="hidden">
                        <DrawerTitle>Navigation</DrawerTitle>
                    </DrawerHeader>
                    <aside className="h-full border-r bg-background">
                        <Sidebar collapsed={false} onNavigate={() => setSidebarOpen(false)} />
                    </aside>
                </DrawerContent>
            </Drawer>

            <div className={cn(
                "relative mx-auto grid w-full grid-cols-1 transition-all duration-200",
                desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[200px_minmax(0,1fr)]"
            )}>
                <aside className="hidden border-r md:block">
                    <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
                        <Sidebar collapsed={desktopCollapsed} onNavigate={() => { }} />
                    </div>
                </aside>
                <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}