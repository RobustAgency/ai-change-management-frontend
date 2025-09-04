import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import { CheckCircle, CreditCard, Star, Sparkles, Zap } from 'lucide-react'
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
    index: number
}

const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    onSubscribe,
    isLoading,
    isSelected,
    index,
}) => {
    const { cancel, loading: isCancelling } = useCancelSubscription()
    const { profile, fetchProfile } = useAuth()
    const isCurrentPlan = profile?.plan_id === plan.id
    const [showCancelModal, setShowCancelModal] = useState(false)

    const isPopular = plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('premium')

    const getPlanIcon = () => {
        const icons = [
            <Star key="star" className="w-8 h-8 text-primary" />,
            <Sparkles key="sparkles" className="w-8 h-8 text-primary" />,
            <Zap key="zap" className="w-8 h-8 text-primary" />
        ]
        
        return icons[index] || <Star className="w-8 h-8 text-primary" />
    }

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
            <Card className={`relative border-0 shadow-lg h-full flex flex-col ${isCurrentPlan ? "ring-2 ring-primary" : ""} hover:shadow-xl transition-all`}>
                {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Most Popular
                        </div>
                    </div>
                )}

                <CardHeader className="text-center pt-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        {getPlanIcon()}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-gray-900">
                        {formatCurrency(plan.price)}
                        <span className="text-lg font-normal text-gray-600">/{plan.billing_cycle}</span>
                    </div>
                    <CardDescription className="text-gray-600">
                        {plan.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-8 flex-1 flex flex-col justify-between">
                    <ul className="space-y-4 mb-6">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">Up to {plan.limit} items</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{plan.billing_cycle} billing</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">Priority support</span>
                        </li>
                    </ul>

                    <Button
                        className={`w-full h-12 font-semibold mt-auto ${isCurrentPlan
                            ? "bg-gray-600 hover:bg-gray-700 text-white"
                            : isPopular
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : ""
                            }`}
                        variant={isCurrentPlan || isPopular ? "default" : "outline"}
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
