"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "./AuthLayout";
import BaseLayout from "./BaseLayout";

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
            "/error",
            "/onboarding",
        ];
        return authRoutes.some(
            (route) => pathname === route || pathname.startsWith(`${route}/`)
        );
    }, [pathname]);

    const isPublicRoute = useMemo(() => {
        const publicRoutes = [
            "/",
        ];
        return publicRoutes.some(
            (route) => pathname === route || pathname.startsWith(`${route}/`)
        );
    }, [pathname]);

    if (isAuthRoute) return <AuthLayout>{children}</AuthLayout>;
    if (isPublicRoute) return <BaseLayout>{children}</BaseLayout>;

    return <MainLayout>{children}</MainLayout>;
}


