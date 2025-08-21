"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { useProfile } from "@/hooks/app/useProfile";
import type { Profile } from "@/service/app/profile";

type AuthContextValue = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    profile: Profile | null;
    fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    session: null,
    isLoading: true,
    profile: null,
    fetchProfile: async () => { },
});

type AuthProviderProps = {
    children: React.ReactNode;
    initialUser?: User | null;
    initialProfile?: Profile | null;
};

export function AuthProvider({ children, initialUser = null, initialProfile = null }: AuthProviderProps) {
    const supabase = useMemo(() => createClient(), []);
    const [user, setUser] = useState<User | null>(initialUser);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const previousUserIdRef = useRef<string | null>(initialUser?.id ?? null);

    const { profile, refetch: fetchProfile } = useProfile(user);

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (!isMounted) return;
                setSession(data.session);
                setUser(data.session?.user ?? initialUser);

            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);

            const newUserId = newSession?.user?.id ?? null;
            const previousUserId = previousUserIdRef.current;

            if (event === "SIGNED_OUT") {
                previousUserIdRef.current = null;
            } else if (event === "SIGNED_IN") {
                if (newUserId !== previousUserId) {
                    previousUserIdRef.current = newUserId;
                }
            }
        });

        void init();

        return () => {
            isMounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({ user, session, isLoading, profile, fetchProfile }),
        [user, session, isLoading, profile, fetchProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
