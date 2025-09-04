import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const Greetings = () => {
    const { profile } = useAuth()
    return (
        <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="text-indigo-600">{profile?.full_name}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">Here&apos;s what&apos;s happening with your change communications</p>
                </div>
                <Link href="/projects/create">
                    <Button size="lg" className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Project
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Greetings