import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const EmptyState = () => {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                        Invalid Onboarding Mode
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600">
                        The requested onboarding mode is not valid. Please check the URL and try again.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmptyState