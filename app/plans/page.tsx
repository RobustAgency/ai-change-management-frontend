'use client'

import React, { useState } from 'react'
import { usePlans, useSubscribeToPlan } from '@/hooks/app/usePlans'
import Spinner from '@/components/ui/spinner'
import { X } from 'lucide-react'
import PlanCard from '@/components/app/plans/PlanCard'
import type { Plan } from '@/interfaces/Plan'
import { useAuth } from '@/providers/AuthProvider'
import ContainerCard from '@/components/custom/ContainerCard'

const PlansPage = () => {
    const { plans, loading: plansLoading, error: plansError } = usePlans()
    const { subscribe, loading: subscribeLoading } = useSubscribeToPlan()
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const { fetchProfile } = useAuth()

    const handleSubscribe = async (plan: Plan) => {
        setSelectedPlan(plan)
        try {
            await subscribe(plan.id, fetchProfile)
        } catch (error) {
            console.error('Subscription error:', error)
        } finally {
            setSelectedPlan(null)
        }
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
        <ContainerCard
            title="Plans & Billing"
            description="Choose the perfect plan for your needs"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </ContainerCard>

    )
}

export default PlansPage