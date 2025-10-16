"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const UserDetailsPageSkeleton = () => {
    return (
        <div className=" mx-auto">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>

            <div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i}>
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-5 w-32" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="border rounded-lg p-6 bg-gray-50">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Skeleton className="h-6 w-48" />
                                                    <Skeleton className="h-5 w-20" />
                                                </div>
                                                <div className="flex items-center gap-4 mb-3">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-24" />
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-8 w-24" />
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex gap-2">
                                                <Skeleton className="h-5 w-16" />
                                                <Skeleton className="h-5 w-20" />
                                                <Skeleton className="h-5 w-18" />
                                            </div>
                                            <Skeleton className="h-5 w-24" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsPageSkeleton
