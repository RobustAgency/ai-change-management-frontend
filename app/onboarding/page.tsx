'use client'
import { useSearchParams } from 'next/navigation'
import EmptyState from '@/components/onboarding/EmptyState'
import UnApprovedAccount from '@/components/onboarding/UnApprovedAccount'
import AddPaymentMethod from '@/components/onboarding/AddPaymentMethod'

// The static pages and components are created but the validation in the middleware or AppShell is still under development

export const runtime = "edge";

const COMPONENTS: Record<string, React.ReactNode> = {
    'unapproved-account': <UnApprovedAccount />,
    'add-payment-method': <AddPaymentMethod />,
}

export default function Onboarding() {
    const mode = useSearchParams().get('mode') || ''
    return COMPONENTS[mode] || <EmptyState />
}
