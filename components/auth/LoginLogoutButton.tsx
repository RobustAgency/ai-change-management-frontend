"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LoginButton = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
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
    if (user) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    className="cursor-pointer"
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                >
                    Dashboard
                </Button>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => {
                        router.push("/logout");
                    }}
                >
                    Logout
                </Button>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            <Button
                className="cursor-pointer"
                onClick={() => {
                    router.push("/signup");
                }}
            >
                Sign up
            </Button>
            <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                    router.push("/login");
                }}
            >
                Login
            </Button>
        </div>
    );
};

export default LoginButton;
