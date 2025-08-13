"use client";

import { useMemo, useState, type ElementType } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import { LayoutDashboard, Settings as SettingsIcon, LogOut, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
    const { user, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    const role: string = useMemo(() => {
        const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
        const r = typeof meta.role === "string" ? meta.role : undefined;
        return r ?? "user";
    }, [user]);

    const fullName =
        (user?.user_metadata as Record<string, unknown> | undefined)?.full_name as string | undefined;
    const displayName = fullName || user?.email || "Guest";
    const avatarUrl = useMemo(() => {
        const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
        const url = ["avatar_url", "picture", "image_url"].map((k) => meta[k]).find((v) => typeof v === "string") as string | undefined;
        return url || null;
    }, [user]);

    const adminRoutes = [
        { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
    ];
    const userRoutes = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ];
    const navigationRoutes = role === "admin" ? adminRoutes : userRoutes;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div
                    className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
                    aria-label="Loading"
                    role="status"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} direction="left">
                <header className={cn(
                    "grid w-full grid-cols-1 h-14 sticky top-0 z-30 border-b bg-background/80 backdrop-blur transition-all duration-200",
                    desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[200px_minmax(0,1fr)]"
                )}>
                    <div className="h-full w-full border-r flex items-center justify-between px-4">
                        {!desktopCollapsed && (
                            <h1 className="text-base font-semibold">MVP Skeleton</h1>
                        )}
                        <DrawerTrigger className="md:hidden" asChild>
                            <Button
                                variant="outline"
                                className=" size-8"
                                size="icon"
                                aria-label="Open sidebar"
                            >
                                <ChevronLeft className="size-4 rotate-180" />
                            </Button>
                        </DrawerTrigger>
                        <Button
                            variant="outline"
                            className="cursor-pointer hidden size-8 md:inline-flex"
                            size="icon"
                            aria-label="Toggle sidebar"
                            onClick={() => setDesktopCollapsed((v) => !v)}
                        >
                            <ChevronLeft
                                className={cn(
                                    "size-4 transition-transform",
                                    desktopCollapsed ? "rotate-180" : ""
                                )}
                            />
                        </Button>
                    </div>
                    <div className="flex items-center gap-3 justify-end px-4">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                            {avatarUrl ? (
                                <Image src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-medium">
                                    {displayName.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{displayName}</div>
                            <div className="text-xs capitalize text-muted-foreground">{role}</div>
                        </div>
                    </div>
                </header>

                <DrawerContent className="p-0 md:hidden">
                    <aside className="h-full w-[80%] max-w-[300px] border-r bg-background p-4">
                        <SidebarContent
                            navigationRoutes={navigationRoutes}
                            onNavigate={() => setSidebarOpen(false)}
                        />
                    </aside>
                </DrawerContent>
            </Drawer>

            <div className={cn(
                "relative mx-auto grid w-full grid-cols-1 transition-all duration-200",
                desktopCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : "md:grid-cols-[200px_minmax(0,1fr)]"
            )}>
                <aside className="hidden border-r md:block">
                    <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
                        <SidebarContent
                            navigationRoutes={navigationRoutes}
                            collapsed={desktopCollapsed}
                            onNavigate={() => { }}
                        />
                    </div>
                </aside>
                <main className="min-h-[calc(100vh-3.5rem)] p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarContent({
    navigationRoutes,
    collapsed = false,
    onNavigate,
}: {
    navigationRoutes: { href: string; label: string; icon?: ElementType }[];
    collapsed?: boolean;
    onNavigate: () => void;
}) {

    return (
        <div className="flex h-full flex-col p-2 md:p-3 overflow-hidden">
            <nav className="flex flex-col gap-1">
                {navigationRoutes.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                            collapsed ? "justify-center p-2" : "gap-2 px-3 py-2 text-sm"
                        )}
                    >
                        {item.icon ? <item.icon className="size-4" /> : null}
                        <span className={`transition-all duration-200 ${cn(collapsed ? "hidden invisible opacity-0 w-0" : "visible opacity-100 w-auto")}`}>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className={cn("mt-auto border-t", collapsed ? "pt-2" : "pt-4")}>
                <div className="flex flex-col gap-1">
                    <Link
                        href="/settings"
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                            collapsed ? "justify-center p-2" : "gap-2 px-3 py-2 text-sm"
                        )}
                    >
                        <SettingsIcon className="size-4" />
                        <span className={`transition-all duration-200 ${cn(collapsed ? "hidden invisible opacity-0 w-0" : "visible opacity-100 w-auto")}`}>Settings</span>
                    </Link>
                    <Link
                        href="/logout"
                        onClick={onNavigate}
                        className={cn(
                            "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                            collapsed ? "justify-center p-2" : "gap-2 px-3 py-2 text-sm"
                        )}
                    >
                        <LogOut className="size-4" />
                        <span className={`transition-all duration-200 ${cn(collapsed ? "hidden invisible opacity-0 w-0" : "visible opacity-100 w-auto")}`}>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}