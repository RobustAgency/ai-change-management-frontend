import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Calendar, CreditCard, Sparkles, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/providers/AuthProvider'
import { usePlans, useUpcomingInvoice } from '@/hooks/app/usePlans'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import Spinner from '@/components/ui/spinner'

interface OverviewProps {
    className?: string;
}

const Overview: React.FC<OverviewProps> = () => {
    const { profile } = useAuth()
    const { plans, loading: plansLoading } = usePlans()
    const { upcomingInvoice, loading: upcomingLoading } = useUpcomingInvoice()

    // Find current plan from plans array using profile.plan_id
    const currentPlan = plans.find(plan => plan.id === profile?.plan_id)

    const loading = plansLoading || upcomingLoading

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!currentPlan) {
        return (
            <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Plan</h3>
                <p className="text-gray-600">You don&apos;t have an active subscription plan.</p>
            </div>
        )
    }

    // Calculate usage (this would come from your usage API in a real app)
    const projectsUsed = 3 // This should come from your usage API
    const projectsLimit = currentPlan.limit
    const usagePercentage = (projectsUsed / projectsLimit) * 100

    // Calculate next billing date (this would come from your subscription API)
    const nextBilling = upcomingInvoice?.created_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    return (

        <React.Fragment>
            {/* Current Plan */}
            <Card className='p-0'>
                <CardHeader className="bg-indigo-600 text-white rounded-t-lg pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                        <div>
                            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl lg:text-2xl">
                                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                                Current Plan: {currentPlan.name}
                            </CardTitle>
                            <CardDescription className="text-indigo-100 text-sm sm:text-base lg:text-lg mt-2">
                                {formatCurrency(currentPlan.price, currentPlan.currency)}/{currentPlan.billing_cycle} • Next billing:{" "}
                                {formatDate(nextBilling)}
                            </CardDescription>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold self-start sm:self-auto">
                            Active
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">Project Usage</span>
                            <span className="text-base sm:text-lg font-bold text-gray-900">
                                {projectsUsed} of {projectsLimit} projects
                            </span>
                        </div>
                        <Progress value={usagePercentage} className="h-2 sm:h-3" />
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 flex items-center gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            Usage resets on {formatDate(nextBilling)}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button variant="outline" className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold bg-transparent">
                            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Update Payment Method
                        </Button>
                        <Button className="flex-1 h-10 sm:h-12 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                            Upgrade Plan
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Projects This Month</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{projectsUsed}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{projectsLimit - projectsUsed} remaining</p>
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
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">12</p>
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
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">9</p>
                                <p className="text-xs sm:text-sm text-gray-600">Auto-renewal</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Saved</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">47h</p>
                                <p className="text-xs sm:text-sm text-gray-600">This month</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Method */}
            <Card className="border-0 shadow-sm bg-white pb-5">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                        Payment Method
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">Your default payment method for subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors gap-4 sm:gap-0">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-6 sm:w-12 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">VISA</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-base sm:text-lg">•••• •••• •••• 4242</p>
                                <p className="text-xs sm:text-sm text-gray-600">Expires 12/2027</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm bg-transparent self-start sm:self-auto">
                            Update Card
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default Overview