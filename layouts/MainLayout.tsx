"use client";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { LayoutDashboard, Settings as SettingsIcon, LogOut } from "lucide-react";
import Sidebar from "@/components/custom/SideBar";
import { cn } from "@/lib/utils";
import Header from "@/components/custom/Header";
import Spinner from "@/components/ui/spinner";


const adminRoutes = [
    { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
];
const userRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const baseRoutes = [
    { href: "/settings", label: "Settings", icon: SettingsIcon },
    { href: "/logout", label: "Logout", icon: LogOut },
];

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    const { user, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    const role = user?.user_metadata?.role ?? "user"

    const navigationRoutes = role === "admin" ? adminRoutes : userRoutes;

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    const sidebarBaseProps = {
        navigationRoutes,
        baseRoutes,
    } as const;

    const renderSidebar = (onNavigate: () => void, collapsed: boolean) => (
        <Sidebar {...sidebarBaseProps} collapsed={collapsed} onNavigate={onNavigate} />
    );

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
                        {renderSidebar(() => setSidebarOpen(false), false)}
                    </aside>
                </DrawerContent>
            </Drawer>

            <div className={cn(
                "relative mx-auto grid w-full grid-cols-1 transition-all duration-200",
                desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[200px_minmax(0,1fr)]"
            )}>
                <aside className="hidden border-r md:block">
                    <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
                        {renderSidebar(() => { }, desktopCollapsed)}
                    </div>
                </aside>
                <main className="min-h-[calc(100vh-3.5rem)] p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}