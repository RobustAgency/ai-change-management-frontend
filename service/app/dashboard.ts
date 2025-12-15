import { api } from '@/lib/api';
import type { DashboardStats } from '@/interfaces/Dashboard';

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard');
    return response.data;
  },
};
