import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Calendar, Sparkles, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/providers/AuthProvider'
import { useCurrentSubscription } from '@/hooks/app/usePlans'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import OverviewSkeleton from '@/components/app/billing/OverviewSkeleton'

interface OverviewProps {
    className?: string;
    onSwitchToPlans?: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onSwitchToPlans }) => {
    const { profile } = useAuth()
    const { currentSubscription, loading, error } = useCurrentSubscription()

    if (loading) {
        return <OverviewSkeleton />
    }

    if (error || !currentSubscription) {
        return (
            <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Plan</h3>
                <p className="text-gray-600">{error || "You don't have an active subscription plan."}</p>
            </div>
        )
    }

    // Calculate usage percentage
    const usagePercentage = (currentSubscription.project_usage.current / currentSubscription.project_usage.limit) * 100

    // Calculate days until renewal
    const getDaysUntilRenewal = () => {
        if (!currentSubscription.next_billing_date) return 0
        const nextBilling = new Date(currentSubscription.next_billing_date)
        const today = new Date()
        const diffTime = nextBilling.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return Math.max(0, diffDays)
    }

    const daysUntilRenewal = getDaysUntilRenewal()

    return (

        <React.Fragment>
            {/* Current Plan */}
            <Card className='p-0'>
                <CardHeader className="bg-indigo-600 text-white rounded-t-lg pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                        <div>
                            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl lg:text-2xl">
                                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                                Current Plan: {currentSubscription.plan_name}
                            </CardTitle>
                            <CardDescription className="text-indigo-100 text-sm sm:text-base lg:text-lg mt-2">
                                {formatCurrency(currentSubscription.price, currentSubscription.currency)}/{currentSubscription.billing_cycle} • Next billing:{" "}
                                {currentSubscription.next_billing_date ? formatDate(currentSubscription.next_billing_date) : 'N/A'}
                            </CardDescription>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold self-start sm:self-auto">
                            {currentSubscription.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">Project Usage</span>
                            <span className="text-base sm:text-lg font-bold text-gray-900">
                                {currentSubscription.project_usage.current} of {currentSubscription.project_usage.limit} projects
                            </span>
                        </div>
                        <Progress value={usagePercentage} className="h-2 sm:h-3" />
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 flex items-center gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            Usage resets on {currentSubscription.usage_resets_at ? formatDate(currentSubscription.usage_resets_at) : 'N/A'}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={onSwitchToPlans}
                            className="h-10 sm:h-12 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            Upgrade Plan
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Projects This Month</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{currentSubscription.project_usage.current}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{currentSubscription.project_usage.limit - currentSubscription.project_usage.current} remaining</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Assets Generated</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{currentSubscription.project_usage.current}</p>
                                <p className="text-xs sm:text-sm text-gray-600">This month</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Days Until Renewal</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{daysUntilRenewal}</p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {currentSubscription.status === 'Cancelled' ? 'Ends' : 'Auto-renewal'}
                                </p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Overview
