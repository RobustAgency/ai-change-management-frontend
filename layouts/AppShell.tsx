"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "./AuthLayout";
import { useAuth } from "@/providers/AuthProvider";

type AppShellProps = {
    children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const { profile } = useAuth();
    console.log(profile);
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

    if (isAuthRoute) return <AuthLayout>{children}</AuthLayout>;

    return <MainLayout>{children}</MainLayout>;
}


