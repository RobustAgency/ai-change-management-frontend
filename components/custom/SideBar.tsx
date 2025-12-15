import Link from "next/link";
import { LayoutGrid, Settings as SettingsIcon, LogOut, CreditCard } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Sparkles } from 'lucide-react'
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const adminRoutes = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutGrid },
];
const userRoutes = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/billing", label: "Billing", icon: CreditCard },
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
    const { user, profile } = useAuth();
    const role = user?.user_metadata?.role ?? "user"
    const navigationRoutes = role === "admin" ? adminRoutes : userRoutes;
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="bg-gray-50 flex h-full flex-col overflow-hidden">
            <div
                aria-details="logo"
                className="p-2 flex items-center justify-between md:hidden">
                <Link href="/">
                    <Image width={165} height={100} src="/logo.png" alt="Logo" />
                </Link>
            </div>

            <nav className="flex flex-col gap-1 p-2 md:p-3 mt-6">
                {navigationRoutes.map((item) => {
                    const isActive = pathname.includes(item.href);

                    const handleClick = (e: React.MouseEvent) => {
                        if (item.href === '/dashboard' && role === 'user' && profile?.plan_id == null) {
                            e.preventDefault();
                            try {
                                router.push('/billing?tab=plans');
                            } finally {
                                onNavigate();
                            }
                            return;
                        }

                        onNavigate();
                    };

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleClick}
                            className={"flex items-center rounded-md hover:bg-accent hover:text-accent-foreground gap-2 px-3 py-2 text-sm"}
                        >
                            {item.icon ? <item.icon className={`shrink-0 size-6 text-gray-500 ${isActive && "text-primary"}`} strokeWidth="2" /> : null}
                            {!collapsed && (
                                <span className={`text-gray-500 whitespace-nowrap font-semibold ${isActive && "text-primary"}`}>{item.label}</span>
                            )}
                        </Link>
                    )
                })}
            </nav>
            <div className={"mt-auto border-t p-2 md:p-3"}>
                {baseRoutes.map((item) => {
                    const isActive = pathname.includes(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={"flex items-center rounded-md hover:bg-accent hover:text-accent-foreground gap-2 px-3 py-2 text-sm"}
                        >
                            {item.icon ? <item.icon className={`shrink-0 size-4 text-gray-500 ${isActive && "text-primary"}`} strokeWidth="2" /> : null}
                            {!collapsed && (
                                <span className={`text-gray-500 whitespace-nowrap font-semibold ${isActive && "text-primary"}`}>{item.label}</span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Sidebar;