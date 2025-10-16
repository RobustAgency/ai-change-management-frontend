import React, { useState } from 'react'
import { usePlans, useSubscribeToPlan, useSwitchPlan } from '@/hooks/app/usePlans'
import { X } from 'lucide-react'
import PlanCard from '@/components/app/billing/PlanCard'
import PlanCardSkeleton from '@/components/app/billing/PlanCardSkeleton'
import { Plan } from '@/interfaces/Plan'
import { useAuth } from '@/providers/AuthProvider'

const Plans = () => {
    const { plans, loading: plansLoading, error: plansError } = usePlans()
    const { subscribe, loading: subscribeLoading } = useSubscribeToPlan()
    const { switchPlan, loading: switchLoading } = useSwitchPlan()
    const { fetchProfile, profile } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

    const hasActiveSubscription = Boolean(profile?.plan_id)

    const handlePlanAction = async (plan: Plan) => {
        setSelectedPlan(plan)

        try {
            if (hasActiveSubscription) {
                // User has an active subscription - switch plans
                await switchPlan(plan.id, fetchProfile)
            } else {
                // User doesn't have a subscription - subscribe to new plan
                await subscribe(plan.id, fetchProfile)
            }
        } finally {
            setSelectedPlan(null)
        }
    }

    if (plansLoading) {
        return (
            <React.Fragment>
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Choose Your Plan</h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600">Upgrade or downgrade your subscription at any time</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {[0, 1, 2].map((index) => (
                        <PlanCardSkeleton
                            key={index}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }

    if (plansError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Plans</h3>
                    <p className="text-gray-600">{plansError}</p>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Choose Your Plan</h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600">Upgrade or downgrade your subscription at any time</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {plans.map((plan, index) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handlePlanAction}
                        isLoading={subscribeLoading || switchLoading}
                        isSelected={selectedPlan?.id === plan.id}
                        index={index}
                        hasActiveSubscription={hasActiveSubscription}
                        currentPlanId={profile?.plan_id}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default Plans
