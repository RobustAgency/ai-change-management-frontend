"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUserDetails } from '@/hooks/admin/useUserDetails'
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react'
import UserDetails from '@/components/admin/userDetails/userDetails'
import UserDetailsPageSkeleton from '@/components/admin/userDetails/UserDetailsPageSkeleton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const UsersDetailsPage = () => {
    const params = useParams()
    const router = useRouter()
    const userId = params?.id as string

    const { user, loading, error, refetch } = useUserDetails(userId)

    useDocumentTitle(
        `User Details${user?.name ? ` - ${user.name}` : ''}`,
        'View and manage detailed user information in the AI Change Management admin panel.'
    );

    if (loading) {
        return <UserDetailsPageSkeleton />
    }

    if (error || !user) {
        return (
            <div className="mx-auto">
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                </div>

                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Error Loading User</h3>
                        <p className="text-gray-600 mb-4 text-center">
                            {error || 'User not found'}
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={() => router.back()} variant="outline">
                                Go Back
                            </Button>
                            <Button onClick={refetch}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="mx-auto">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600 mt-1">User Details</p>
                    </div>
                </div>
            </div>

            <UserDetails user={user} />
        </div>
    )
}

export default UsersDetailsPage