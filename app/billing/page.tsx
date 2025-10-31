import React from 'react'
import Billing from '@/components/app/billing/Billing';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your AI Change Management subscription, view billing history, update payment methods, and explore pricing plans.',
  robots: {
    index: false,
    follow: false,
  },
}

const PlansPage = () => {

    return (
        <React.Fragment>
            <Billing />
        </React.Fragment>

    )
}

export default PlansPage
