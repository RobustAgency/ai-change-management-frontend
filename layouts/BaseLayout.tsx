import React from "react";
import BaseHeader from "@/components/custom/BaseHeader";

type BaseLayoutProps = {
    children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="bg-background text-foreground">
            <BaseHeader />
            <main className="pt-14">
                {children}
            </main>
        </div>
    );
}
