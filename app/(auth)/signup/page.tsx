import React from 'react'
import { SignUpForm } from '@/components/auth/SignupForm'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your AI Change Management account and start transforming your business processes today. Join thousands of organizations already using our platform.',
  robots: {
    index: false,
    follow: false,
  },
}

const SignPage = () => {
    return (
        <SignUpForm />
    )
}

export default SignPage
