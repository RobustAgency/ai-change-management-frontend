import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Spinner from '@/components/ui/spinner'
import { Check, CreditCard } from 'lucide-react'
import type { Plan } from '@/interfaces/Plan'
import { formatCurrency } from '@/utils/formatCurrency'
import { useAuth } from '@/providers/AuthProvider'
import ConfirmationDialog from '@/components/custom/ConfirmationDialog'
import { useCancelSubscription } from '@/hooks/app/usePlans'

interface PlanCardProps {
    plan: Plan
    onSubscribe: (plan: Plan) => Promise<void>
    isLoading: boolean
    isSelected: boolean
}

const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    onSubscribe,
    isLoading,
    isSelected,
}) => {
    const { cancel, loading: isCancelling } = useCancelSubscription()
    const { profile, fetchProfile } = useAuth()
    const isCurrentPlan = profile?.plan_id === plan.id
    const [showCancelModal, setShowCancelModal] = useState(false)

    const handleCancelClick = () => {
        setShowCancelModal(true)
    }

    const handleCancelModal = () => {
        setShowCancelModal(false)
    }

    const handleCancel = async () => {
        try {
            const response = await cancel(fetchProfile)
            if (!response.error) {
                setShowCancelModal(false)
            }
        } catch (error) {
            console.error('Cancel error:', error)
        }
    }

    return (
        <>
            <Card className="relative">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {isCurrentPlan && (
                            <Badge className='bg-green-100 text-green-800 hover:bg-green-100' variant='default'>Subscribed</Badge>
                        )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                        <span className="text-3xl font-bold text-gray-900">
                            {formatCurrency(plan.price, plan.currency)}
                        </span>
                        <span className="text-gray-600 ml-2">
                            /{plan.billing_cycle}
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">
                                Up to {plan.limit} items
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">
                                {plan.billing_cycle} billing
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">
                                Priority support
                            </span>
                        </div>
                    </div>
                    <Button
                        className="w-full"
                        variant={"default"}
                        onClick={isCurrentPlan ? handleCancelClick : () => onSubscribe(plan)}
                        disabled={(isLoading && isSelected) || (isCancelling && isCurrentPlan)}
                    >
                        {(isLoading && isSelected) || (isCancelling && isCurrentPlan) ? (
                            <Spinner size="sm" className="mr-2" />
                        ) : (
                            <CreditCard className="h-4 w-4 mr-2" />
                        )}
                        {isCurrentPlan ? 'Cancel Plan' : 'Subscribe'}
                    </Button>
                </CardContent>
            </Card>

            <ConfirmationDialog
                isOpen={showCancelModal}
                onClose={handleCancelModal}
                onConfirm={handleCancel}
                title="Cancel Subscription"
                description={`Are you sure you want to cancel your ${plan.name} subscription? You will lose access to premium features at the end of your current billing period.`}
                confirmText="Cancel Subscription"
                cancelText="Keep Subscription"
                type="danger"
                isLoading={isCancelling}
                loadingText="Cancelling..."
            />
        </>
    )
}

export default PlanCard
