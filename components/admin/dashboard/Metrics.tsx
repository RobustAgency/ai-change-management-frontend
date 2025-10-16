'use client';

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, UserX, UserPlus } from "lucide-react"
import { useDashboard } from '@/hooks/admin/useDashboard'
import { Skeleton } from '@/components/ui/skeleton'

interface MetricsProps {
    dashboardData?: ReturnType<typeof useDashboard>
}

const Metrics = ({ dashboardData }: MetricsProps) => {
    const ownDashboardData = useDashboard()
    const { stats, loading, error } = dashboardData || ownDashboardData

    if (loading) {
        return (
            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[...Array(4)].map((_, index) => (
                    <Card key={index} className="border-0 shadow-sm bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                                <Skeleton className="w-12 h-12 rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-12">
                <Card className="border-0 shadow-sm bg-red-50">
                    <CardContent className="p-6">
                        <p className="text-red-600">Failed to load dashboard metrics: {error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!stats) {
        return null;
    }
    return (
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total_users.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.active_users.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Inactive Users</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.inactive_users.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <UserX className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total_projects.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Metrics