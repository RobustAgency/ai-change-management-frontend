"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { fetchProfile as fetchProfileFromAPI, type Profile } from "@/service/app/profile";
import { toast } from "react-toastify";

type AuthContextValue = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    profile: Profile | null;
    supabaseProfile: Profile | null;
    fetchSupabaseProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    session: null,
    isLoading: true,
    profile: null,
    supabaseProfile: null,
    fetchSupabaseProfile: async () => { },
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
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const [supabaseProfile, setSupabaseProfile] = useState<Profile | null>(null);
    const previousUserIdRef = useRef<string | null>(initialUser?.id ?? null);

    const fetchProfile = useCallback(async () => {
        if (!user?.id) {
            setProfile(null);
            return;
        }
        const profileData = await fetchProfileFromAPI();
        if (profileData) {
            setProfile(profileData);
        }
    }, [user?.id]);

    const fetchSupabaseProfile = useCallback(async () => {
        if (!user?.id) return;
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (error) {
            toast.error(error.message);
            return;
        }
        else {
            setSupabaseProfile(data);
        }
    }, [supabase, user?.id]);


    useEffect(() => {
        if (user) {
            void fetchSupabaseProfile();
            if (user?.user_metadata?.role === "user" && user?.id) {
                void fetchProfile();
            } else {
                setProfile(null);
            }
        }
    }, [user?.id, user?.user_metadata?.role]);


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

            const newUserId = newSession?.user?.id ?? null;
            const previousUserId = previousUserIdRef.current;

            if (event === "SIGNED_OUT") {
                previousUserIdRef.current = null;
                window.location.href = "/login";
            } else if (event === "SIGNED_IN") {
                if (newUserId !== previousUserId) {
                    previousUserIdRef.current = newUserId;
                    window.location.href = "/";
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
        () => ({ user, session, isLoading, profile, supabaseProfile, fetchSupabaseProfile }),
        [user, session, isLoading, profile, supabaseProfile, fetchSupabaseProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
