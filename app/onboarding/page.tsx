'use client'
import { useSearchParams } from 'next/navigation'
import EmptyState from '@/components/onboarding/EmptyState'
import UnApprovedAccount from '@/components/onboarding/UnApprovedAccount'
import AddPaymentMethod from '@/components/onboarding/AddPaymentMethod'

const COMPONENTS: Record<string, React.ReactNode> = {
    'unapproved-account': <UnApprovedAccount />,
    'add-payment-method': <AddPaymentMethod />,
}

export default function Onboarding() {
    const mode = useSearchParams().get('mode') || ''
    return COMPONENTS[mode] || <EmptyState />
}
