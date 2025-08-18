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
    const [profile, setProfile] = useState<Profile | null>(initialProfile);
    const previousUserIdRef = useRef<string | null>(initialUser?.id ?? null);

    const fetchProfile = useCallback(async () => {
        if (!user?.id) {
            setProfile(null);
            return;
        }
        const { data: supabaseData, error: supabaseError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (supabaseError) {
            toast.error(supabaseError.message);
            return;
        }
        if (user?.user_metadata?.role === "user") {
            const profileData = await fetchProfileFromAPI();
            console.log(profileData);
            if (profileData) {
                setProfile({ ...supabaseData, has_payment_method: profileData.has_payment_method ?? null });
            }
            // Need to handle the case where the profile is not found because the user is not a not approved by the admin
            // When user is not approved by the admin, the profile is not because of the unapproval
            // The user is redirected to the onboarding page with the mode "unapproved-account"
        } else {
            setProfile(supabaseData);
        }
    }, [user?.id, user?.user_metadata?.role, supabase]);

    useEffect(() => {
        if (user?.id) {
            void fetchProfile();
        } else {
            setProfile(null);
        }
    }, [user?.id, user?.user_metadata?.role, fetchProfile]);

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
        () => ({ user, session, isLoading, profile, fetchProfile }),
        [user, session, isLoading, profile, fetchProfile]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
