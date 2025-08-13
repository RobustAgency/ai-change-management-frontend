import { cn } from "@/lib/utils";
import { ElementType } from "react";
import Link from "next/link";

export function Sidebar({
    navigationRoutes,
    baseRoutes,
    collapsed = false,
    onNavigate,
}: {
    navigationRoutes: { href: string; label: string; icon?: ElementType }[];
    baseRoutes: { href: string; label: string; icon?: ElementType }[];
    collapsed?: boolean;
    onNavigate: () => void;
}) {

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div
                aria-details="logo"
                className="flex items-center justify-between md:hidden p-4 border-b">
                <h1 className="text-base font-semibold ">MVP Skeleton</h1>
            </div>

            <nav className="flex flex-col gap-1 p-2 md:p-3">
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
            <div className={cn("mt-auto border-t p-2 md:p-3")}>
                {baseRoutes.map((item) => (
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
            </div>
        </div>
    );
}

export default Sidebar;