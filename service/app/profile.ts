import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-toastify';

export interface Profile {
    id: string;
    full_name?: string | null;
    email: string;
    avatar_url?: string | null;
    has_payment_method?: boolean | null;
}

export interface ProfileResponse {
    error: boolean;
    message: string;
    data: {
        user: Profile;
        has_payment_method: boolean | null;
    };
}

export async function fetchProfile(): Promise<Profile | null> {
    try {
        const supabase = createClient();

        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            throw new Error('No access token available');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const res = await response.json()
            toast.error(res.message)
            return null
        }

        const result: ProfileResponse = await response.json();

        if (result.error) {
            toast.error(result.message)
            return null
        }

        return {
            ...result.data.user,
            has_payment_method: result.data.has_payment_method,
        };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}
