import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const OverviewSkeleton: React.FC = () => {
    return (
        <React.Fragment>
            {/* Current Plan Skeleton */}
            <Card className='p-0'>
                <CardHeader className="bg-gray-200 rounded-t-lg pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 rounded" />
                                <Skeleton className="h-6 sm:h-7 lg:h-8 w-48 sm:w-64" />
                            </div>
                            <Skeleton className="h-4 sm:h-5 lg:h-6 w-full sm:w-80 mt-2" />
                        </div>
                        <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 rounded-full self-start sm:self-auto" />
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
                            <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
                            <Skeleton className="h-5 sm:h-6 w-28 sm:w-36" />
                        </div>
                        <Skeleton className="h-2 sm:h-3 w-full rounded-full" />
                        <div className="flex items-center gap-2 mt-2">
                            <Skeleton className="w-3 h-3 sm:w-4 sm:h-4 rounded" />
                            <Skeleton className="h-3 sm:h-4 w-40 sm:w-48" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Skeleton className="h-10 sm:h-12 w-28 sm:w-32 rounded-md" />
                    </div>
                </CardContent>
            </Card>

            {/* Usage Stats Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((index) => (
                    <Card key={index} className="border-0 shadow-sm bg-white">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 mb-2" />
                                    <Skeleton className="h-8 sm:h-10 w-12 sm:w-16 mb-1" />
                                    <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
                                </div>
                                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </React.Fragment>
    )
}

export default OverviewSkeleton