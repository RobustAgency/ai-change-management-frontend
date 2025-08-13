"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";

type AppShellProps = {
    children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();

    const isAuthRoute = useMemo(() => {
        const authRoutes = [
            "/login",
            "/signup",
            "/forgot-password",
            "/reset-password",
            "/update-password",
            "/auth/confirm",
            "/logout",
        ];
        return authRoutes.some(
            (route) => pathname === route || pathname.startsWith(`${route}/`)
        );
    }, [pathname]);

    if (isAuthRoute) return children;

    return <MainLayout>{children}</MainLayout>;
}


