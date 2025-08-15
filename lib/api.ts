import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { createClient } from '@/lib/supabase/client';

export interface ApiResponse<T = any> {
    data: T;
    error?: boolean;
    message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
};

const apiClient: AxiosInstance = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
        config.headers['X-Request-ID'] = crypto.randomUUID();
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const supabase = createClient();
                const { data, error: refreshError } = await supabase.auth.refreshSession();

                if (!refreshError && data.session) {
                    originalRequest.headers.Authorization = `Bearer ${data.session.access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        const apiError = new ApiError(
            error.response?.status || 500,
            error.response?.data?.message || error.message || 'An unexpected error occurred',
            error.response?.data
        );

        return Promise.reject(apiError);
    }
);

export class ApiService {
    private client: AxiosInstance;

    constructor(client: AxiosInstance = apiClient) {
        this.client = client;
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.delete<ApiResponse<T>>(url, config);
        return response.data;
    }

    async upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.client.post<ApiResponse<T>>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });

        return response.data;
    }

    async download(url: string, filename?: string): Promise<void> {
        const response = await this.client.get(url, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    }
}

export const api = new ApiService();

export { apiClient };

export const apiUtils = {
    createQueryString: (params: Record<string, any>): string => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, String(value));
            }
        });
        return searchParams.toString();
    },
    handleError: (error: any, defaultMessage = 'An error occurred') => {
        if (error instanceof ApiError) {
            return error.message;
        }
        return defaultMessage;
    },
    retry: async <T>(
        fn: () => Promise<T>,
        retries = 3,
        delay = 1000
    ): Promise<T> => {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return apiUtils.retry(fn, retries - 1, delay * 2);
            }
            throw error;
        }
    },
};
