import Link from "next/link";
import { LayoutDashboard, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

const adminRoutes = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
];
const userRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const baseRoutes = [
    { href: "/settings", label: "Settings", icon: SettingsIcon },
    { href: "/logout", label: "Logout", icon: LogOut },
];

export function Sidebar({
    collapsed = false,
    onNavigate,
}: {
    collapsed?: boolean;
    onNavigate: () => void;
}) {
    const { user } = useAuth();
    const role = user?.user_metadata?.role ?? "user"
    const navigationRoutes = role === "admin" ? adminRoutes : userRoutes;

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div
                aria-details="logo"
                className="flex items-center justify-between md:hidden p-4 border-b">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={100} height={100} />
                </Link>
            </div>

            <nav className="flex flex-col gap-1 p-2 md:p-3">
                {navigationRoutes.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={"flex items-center rounded-md hover:bg-accent hover:text-accent-foreground gap-2 px-3 py-2 text-sm"}
                    >
                        {item.icon ? <item.icon className="shrink-0 size-4" /> : null}
                        {!collapsed && (
                            <span className={`whitespace-nowrap`}>{item.label}</span>
                        )}
                    </Link>
                ))}
            </nav>
            <div className={"mt-auto border-t p-2 md:p-3"}>
                {baseRoutes.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={"flex items-center rounded-md hover:bg-accent hover:text-accent-foreground gap-2 px-3 py-2 text-sm"}
                    >
                        {item.icon ? <item.icon className="shrink-0 size-4" /> : null}
                        {!collapsed && (
                            <span className={`whitespace-nowrap`}>{item.label}</span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;