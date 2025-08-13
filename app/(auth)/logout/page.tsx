'use client';
import { useEffect } from "react";
import { signout } from "@/lib/auth-actions";

const LogoutPage = () => {
    useEffect(() => {
        signout()
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center" aria-live="polite">
                <p className="text-lg font-medium">Logging out…</p>
                <div
                    className="mx-auto mt-6 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
                    role="status"
                    aria-label="Loading"
                />
            </div>
        </div>
    );
};

export default LogoutPage;