import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Innovative Dialogs account to access your dashboard, projects, and management tools.',
  robots: {
    index: false,
    follow: false,
  },
}

const Loginpage = () => {
    return (
        <LoginForm />
    )
}

export default Loginpage
