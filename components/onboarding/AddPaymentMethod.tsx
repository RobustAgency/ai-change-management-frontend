import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CreditCard } from 'lucide-react'

const AddPaymentMethod = () => {
    const handleAddPaymentMethod = () => {
        // TODO: Implement payment method addition logic
        console.log('Add payment method clicked')
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                        Payment Method Required
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">
                        Please add a payment method to continue using our services.
                    </p>
                    <Button
                        onClick={handleAddPaymentMethod}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Add Payment Method
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddPaymentMethod