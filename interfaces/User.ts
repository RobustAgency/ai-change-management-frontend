export interface User {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'user' | 'admin';
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
}

export interface UserFilters {
    search?: string;
    status?: 'pending' | 'approved' | 'rejected';
    page?: number;
}