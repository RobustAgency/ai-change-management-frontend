import { PaginatedResponse } from "./Pagination"

export interface User {
    id: number
    supabase_id: string
    name: string
    email: string
    email_verified_at: string | null
    is_active: boolean
    role: string
    created_at: string
    updated_at: string
    stripe_id: string | null
    pm_type: string | null
    pm_last_four: string | null
    trial_ends_at: string | null
}

export interface UserFilters extends Record<string, unknown> {
    search?: string;
    status?: 'active' | 'inactive';
    page?: number;
}

export interface UsersApiResponse {
    data: PaginatedResponse<User>
    status: number
    message: string
    error: boolean
}