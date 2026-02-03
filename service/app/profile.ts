import { api, type ApiResponse } from '@/lib/api';

export interface Profile {
    // Supabase fields
    id: string;
    full_name?: string | null;
    avatar_url?: string | null;
    
    // API fields
    name?: string | null;
    email: string;
    is_active?: boolean;
    role?: string;
    plan_id?: number | null;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ApiProfile {
    id: number;
    name: string | null;
    email: string;
    is_active: boolean;
    role: string;
    plan_id: number | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProfileResponse {
    error: boolean;
    message: string;
    data: ApiProfile;
}

export interface ProfileResult {
    success: boolean;
    data: Profile | null;
    error: boolean;
    errorCode?: number;
    message?: string;
}

export class ProfileService {
    private baseUrl = '/profile';

    async getProfile(): Promise<ProfileResult> {
        try {
            const response: ApiResponse<ApiProfile> = await api.get(this.baseUrl);

            if (response.error) {
                return {
                    success: false,
                    data: null,
                    error: true,
                    errorCode: 400,
                    message: response.message
                };
            }

            return {
                success: true,
                data: {
                    id: response.data.id.toString(), // Convert to string for consistency with Supabase
                    name: response.data.name,
                    email: response.data.email,
                    is_active: response.data.is_active,
                    role: response.data.role,
                    plan_id: response.data.plan_id,
                    email_verified_at: response.data.email_verified_at,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                },
                error: false
            };
        } catch (error: any) {
            if (error?.status === 403) {
                return {
                    success: false,
                    data: null,
                    error: true,
                    errorCode: 403,
                    message: error.message || 'Account not approved'
                };
            }

            return {
                success: false,
                data: null,
                error: true,
                errorCode: error?.status || 500,
                message: error?.message || 'An unexpected error occurred'
            };
        }
    }

}

export const profileService = new ProfileService();

export async function fetchProfile(): Promise<ProfileResult> {
    return profileService.getProfile();
}
