import React from "react";
import BaseHeader from "@/components/custom/BaseHeader";
import Footer from "@/components/home/Footer";

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
            <Footer />
        </div>
    );
}
