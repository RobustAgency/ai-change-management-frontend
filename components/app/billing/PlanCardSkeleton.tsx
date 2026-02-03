import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'


const PlanCardSkeleton = () => {
    return (
        <Card className="relative border-0 shadow-lg h-full flex flex-col hover:shadow-xl transition-all">

            <CardHeader className="text-center pt-8">
                {/* Plan Icon */}
                <Skeleton className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4" />

                {/* Plan Name */}
                <Skeleton className="h-8 w-24 mx-auto mb-4" />

                {/* Price */}
                <div className="mb-2">
                    <Skeleton className="h-12 w-32 mx-auto mb-1" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                </div>

                {/* Description */}
                <Skeleton className="h-4 w-full mx-auto mb-2" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
            </CardHeader>

            <CardContent className="p-8 flex-1 flex flex-col justify-between">
                {/* Features List */}
                <div className="space-y-4 mb-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                            <Skeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>

                {/* Subscribe Button */}
                <Skeleton className="w-full h-12 rounded-md" />
            </CardContent>
        </Card>
    )
}

export default PlanCardSkeleton