'use client';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/service/admin/dashboard';
import type { AdminDashboardStats } from '@/interfaces/Dashboard';

export const useDashboard = () => {
    const [stats, setStats] = useState<AdminDashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getDashboardStats();
            setStats(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard statistics';
            setError(errorMessage);
            console.error('Error fetching admin dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const refetch = () => {
        fetchDashboardStats();
    };

    return {
        stats,
        loading,
        error,
        refetch,
    };
};
