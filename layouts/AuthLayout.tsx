"use client"
import React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <header className=" backdrop-blur-sm">
                <div className="container mx-auto px-2 md:px-6 py-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">ChangeAI</span>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="flex items-center justify-center px-6 pb-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default AuthLayout