'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import EmptyState from '@/components/onboarding/EmptyState'
import UnApprovedAccount from '@/components/onboarding/UnApprovedAccount'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const COMPONENTS: Record<string, React.ReactNode> = {
    'unapproved-account': <UnApprovedAccount />,
}

function OnboardingContent() {
    const mode = useSearchParams().get('mode') || ''
    return COMPONENTS[mode] || <EmptyState />
}

export default function Onboarding() {
    useDocumentTitle(
        'Onboarding',
        'Complete your Innovative Dialogs account setup and get started with our platform.'
    );

    return (
        <Suspense fallback={<EmptyState />}>
            <OnboardingContent />
        </Suspense>
    )
}
