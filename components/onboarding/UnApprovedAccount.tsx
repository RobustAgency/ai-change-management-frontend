import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { AlertCircle, LogOut } from 'lucide-react'
import Link from 'next/link';

const UnApprovedAccount = () => {
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Link
                href={"/logout"}
                className={"absolute top-5 right-5 flex items-center rounded-md hover:bg-accent hover:text-accent-foreground gap-2 px-3 py-2 text-sm border-2 active:90 duration-200"}
            >
                <LogOut className='text-gray-500' size={20} />
                <span className={`text-gray-500 whitespace-nowrap font-semibold`}>Logout</span>
            </Link>

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
