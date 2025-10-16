import { api } from '@/lib/api';
import { AdminDashboardStats } from '@/interfaces/Dashboard';

export const getDashboardStats = async (): Promise<AdminDashboardStats> => {
  const response = await api.get<AdminDashboardStats>('/admin/dashboard');
  return response.data;
};
