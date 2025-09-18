'use client'
import { useSearchParams } from 'next/navigation'
import EmptyState from '@/components/onboarding/EmptyState'
import UnApprovedAccount from '@/components/onboarding/UnApprovedAccount'

export const runtime = "edge";

const COMPONENTS: Record<string, React.ReactNode> = {
    'unapproved-account': <UnApprovedAccount />,
}

export default function Onboarding() {
    const mode = useSearchParams().get('mode') || ''
    return COMPONENTS[mode] || <EmptyState />
}