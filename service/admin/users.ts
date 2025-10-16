import { api, apiUtils, type ApiResponse } from '@/lib/api';
import { UserFilters, UsersApiResponse } from '@/interfaces/User';
import { User } from '@/interfaces/User';

export class UsersService {
    private baseUrl = '/admin/users';

    async getUsers(filters: UserFilters = {}): Promise<UsersApiResponse> {
        const queryString = apiUtils.createQueryString(filters);
        const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
        const response = await api.get<UsersApiResponse['data']>(url);
        return response;
    }

    async searchUsers(term: string): Promise<ApiResponse<User[]>> {
        const queryString = apiUtils.createQueryString({ term });
        const url = `${this.baseUrl}/search?${queryString}`;
        const response = await api.get<User[]>(url);
        return response;
    }

    async activateUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/activate`);
    }

    async deactivateUser(userId: string): Promise<ApiResponse<User>> {
        return await api.post<User>(`${this.baseUrl}/${userId}/deactivate`);
    }

}

export const usersService = new UsersService();
