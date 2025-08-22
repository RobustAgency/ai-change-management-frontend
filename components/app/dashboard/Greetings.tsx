import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { Badge } from '@/components/ui/badge'

const Greetings = () => {
    const { profile } = useAuth()
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-bold'>Hello {profile?.full_name}</h1>
            <p className='text-sm text-gray-500'>
                Here you can manage your account and your subscription.
            </p>
        </div>
    )
}

export default Greetings