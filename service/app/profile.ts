import { api, type ApiResponse } from '@/lib/api';

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
            const response: ApiResponse<ProfileResponse['data']> = await api.get(this.baseUrl);

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
                    ...response.data.user,
                    has_payment_method: response.data.has_payment_method,
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
