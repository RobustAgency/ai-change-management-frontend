import { api, apiUtils, type ApiResponse } from '@/lib/api';
import { User, UserFilters } from '@/interfaces/User';

interface UsersApiResponse {
    error: boolean
    message: string
    users: {
        current_page: number
        data: Array<{
            id: number
            supabase_id: string
            name: string
            email: string
            email_verified_at: string | null
            is_approved: boolean
            role: string
            created_at: string
            updated_at: string
            stripe_id: string | null
            pm_type: string | null
            pm_last_four: string | null
            trial_ends_at: string | null
        }>
        first_page_url: string
        from: number
        last_page: number
        last_page_url: string
        links: Array<{
            url: string | null
            label: string
            active: boolean
        }>
        next_page_url: string | null
        path: string
        per_page: number
        prev_page_url: string | null
        to: number
        total: number
    }
}

export interface UserActionData {
    userId: string;
    reason?: string;
}

export class UsersService {
    private baseUrl = '/admin/users';

    async getUsers(filters: UserFilters = {}): Promise<UsersApiResponse> {
        const queryString = apiUtils.createQueryString(filters);
        const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
        const response = await api.get<UsersApiResponse>(url);
        return response.data;
    }

    async approveUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/approve`);
    }

    async rejectUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/reject`);
    }

}

export const usersService = new UsersService();
