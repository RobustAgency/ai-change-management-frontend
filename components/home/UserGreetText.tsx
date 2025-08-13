"use client";
import { AppUser } from "@/interfaces/User";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
    const [user, setUser] = useState<AppUser | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";
    const email = user?.email || "";
    const avatarUrl = (user?.user_metadata as any)?.avatar_url as string | undefined;

    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part[0]?.toUpperCase())
        .join("");

    return (
        <div className="flex items-center gap-3 p-2">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-neutral-800"
                />
            ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-gray-200 grid place-items-center border border-gray-200 dark:border-neutral-700">
                    <span className="text-sm font-semibold">{initials || "U"}</span>
                </div>
            )}
            <div className="leading-tight">
                <div className="font-medium text-sm">{displayName}</div>
                {email && (
                    <div className="text-xs text-muted-foreground">{email}</div>
                )}
            </div>
        </div>
    );
};

export default UserGreetText;
