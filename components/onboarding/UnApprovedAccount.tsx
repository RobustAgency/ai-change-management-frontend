import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { AlertCircle } from 'lucide-react'

const UnApprovedAccount = () => {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                        Account Pending Activation
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">
                        Your account is pending activation by an administrator.
                    </p>
                    <div className="text-sm text-gray-500">
                        Please check back later.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UnApprovedAccount
