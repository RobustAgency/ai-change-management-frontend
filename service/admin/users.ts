import { api, apiUtils, type ApiResponse, type PaginatedResponse } from '@/lib/api';
import { User, UserFilters } from '@/interfaces/User';



export interface UserActionData {
    userId: string;
    reason?: string;
}

export class UsersService {
    private baseUrl = '/users';

    async getUsers(filters: UserFilters = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
        const queryString = apiUtils.createQueryString(filters);
        const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

        return await api.get<PaginatedResponse<User>>(url);
    }

    async getUser(id: string): Promise<ApiResponse<User>> {
        return await api.get<User>(`${this.baseUrl}/${id}`);
    }

    async approveUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/approve`);
    }

    async rejectUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/reject`);
    }

}

export const usersService = new UsersService();
