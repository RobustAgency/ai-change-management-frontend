import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your AI Change Management account password. Enter your email address and we\'ll send you a secure link to reset your password.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ForgotPasswordForm />
            </div>
        </div>
    )
}
