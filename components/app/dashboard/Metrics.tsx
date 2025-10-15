import { Card, CardContent } from '@/components/ui/card'
import { Calendar, FileText, FileCheck, FileX } from 'lucide-react'
import React from 'react'
import { useDashboard } from '@/hooks/app/useDashboard'
import { Skeleton } from '@/components/ui/skeleton'

const MetricsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((index) => (
                <Card key={index} className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-9 w-16" />
                            </div>
                            <Skeleton className="w-12 h-12 rounded-xl" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const Metrics = () => {
    const { stats, loading, error } = useDashboard();

    if (loading) {
        return <MetricsSkeleton />;
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-12">
                <p className="text-sm text-red-600">Failed to load dashboard metrics: {error}</p>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Projects</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total_projects}</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Projects this Month</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.this_month}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Content Generated</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.content_generated}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <FileCheck className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Pending Generation</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.pending_generation}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                            <FileX className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Metrics
