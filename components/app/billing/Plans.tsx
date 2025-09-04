import React, { useState } from 'react'
import { usePlans, useSubscribeToPlan } from '@/hooks/app/usePlans'
import Spinner from '@/components/ui/spinner'
import { X } from 'lucide-react'
import PlanCard from '@/components/app/billing/PlanCard'
import { Plan } from '@/interfaces/Plan'
import { useAuth } from '@/providers/AuthProvider'

interface PlansProps { }

const Plans: React.FC<PlansProps> = () => {
    const { plans, loading: plansLoading, error: plansError } = usePlans()
    const { subscribe, loading: subscribeLoading } = useSubscribeToPlan()
    const { fetchProfile } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)


    const handleSubscribe = async (plan: Plan) => {
        setSelectedPlan(plan)
        await subscribe(plan.id, fetchProfile)
        setSelectedPlan(null)
    }

    if (plansLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="lg" />
            </div>
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
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribe}
                        isLoading={subscribeLoading}
                        isSelected={selectedPlan?.id === plan.id}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default Plans