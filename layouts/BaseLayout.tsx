'use client';

import React from "react";
import { usePathname } from "next/navigation";
import BaseHeader from "@/components/custom/BaseHeader";
import Footer from "@/components/home/Footer";

type BaseLayoutProps = {
    children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
    const pathname = usePathname();

    const isAboutPage = pathname?.includes("/about-us");

    return (
        <div className="bg-background text-foreground">
            <BaseHeader />
            <main className={isAboutPage ? "pt-0" : "pt-14"}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
