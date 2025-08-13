"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextValue = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    profile: Profile | null;
    fetchProfile: () => Promise<void>;
};

type Profile = {
    id: string;
    full_name?: string | null;
    avatar_url?: string | null;
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
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [user, setUser] = useState<User | null>(initialUser);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Profile | null>(initialProfile);

    const fetchProfile = useCallback(async () => {
        if (!user?.id) {
            setProfile(null);
            return;
        }
        const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, avatar_url")
            .eq("id", user.id)
            .single();
        if (!error) {
            setProfile((data as Profile) ?? null);
        }
    }, [supabase, user?.id]);


    useEffect(() => {
        if (user) {
            void fetchProfile();
        } else {
            setProfile(null);
        }
    }, [user, fetchProfile]);


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
            if (!newSession?.user) setProfile(null);

            if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
                router.refresh();
            }
        });


        void init();

        return () => {
            isMounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!user?.id) return;
        const channel = supabase
            .channel(`profiles:updates:${user.id}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "profiles", filter: `id=eq.${user.id}` },
                (payload) => {
                    const newRow = (payload as any).new as Profile | null;
                    if (payload.eventType === "DELETE") {
                        setProfile(null);
                    } else if (newRow) {
                        setProfile(newRow);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, user?.id]);

    const value = useMemo<AuthContextValue>(
        () => ({ user, session, isLoading, profile, fetchProfile }),
        [user, session, isLoading, profile, fetchProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}


