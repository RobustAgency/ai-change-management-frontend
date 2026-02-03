import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm"
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  title: 'Update Password',
  description: 'Update your Innovative Dialogs account password. Choose a strong, secure password to protect your account.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UpdatePasswordPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UpdatePasswordForm />
            </div>
        </div>
    )
}
