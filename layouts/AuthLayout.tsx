"use client"
import AuthHeader from '@/components/custom/AuthHeader'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <AuthHeader />
            <div className="flex items-center justify-center px-6 pb-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default AuthLayout