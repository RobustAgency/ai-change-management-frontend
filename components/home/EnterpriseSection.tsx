import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Building } from 'lucide-react'
import ContactModal from './ContactModal'

const EnterpriseSection = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleContactUs = () => {
        setIsContactModalOpen(true)
    }

    return (
        <React.Fragment>
            <Card className="max-w-5xl border-2 border-gray-200 mb-16 bg-white mx-auto shadow-lg hover:shadow-xl">
                <CardHeader className="text-center pt-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Building className="w-8 h-8 text-gray-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900">Enterprise</CardTitle>
                    <CardDescription className="mx-auto max-w-4xl text-lg text-gray-600">
                        Empower your organization with enterprise grade AI communication tooling, secure controls, and dedicated onboarding support for large scale change programs.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            Why choose our Enterprise plan:
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Multi-user workspaces with admin controls</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">SSO & enhanced security options</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Branded templates and white-label exports</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">Priority support with dedicated success manager</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={handleContactUs}
                            className="font-semibold bg-white hover:bg-white border text-gray-700 active:scale-90 duration-200"
                            size="lg"
                        >
                            Contact us for pricing
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </React.Fragment>
    )
}

export default EnterpriseSection