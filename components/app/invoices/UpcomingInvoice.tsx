import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, X } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { formatCurrency } from '@/utils/formatCurrency'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Spinner from '@/components/ui/spinner'
import type { UpcomingInvoice as UpcomingInvoiceType } from '@/interfaces/Plan'

interface UpcomingInvoiceProps {
    upcomingInvoice: UpcomingInvoiceType | null
    upcomingLoading: boolean
    upcomingError: string | null
}

const UpcomingInvoice = ({ upcomingInvoice, upcomingLoading, upcomingError }: UpcomingInvoiceProps) => {

    return (
        <div className="my-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Invoice</h2>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Next Payment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {upcomingLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Spinner size="sm" />
                        </div>
                    ) : upcomingError ? (
                        <div className="text-center py-8">
                            <X className="h-8 w-8 text-red-500 mx-auto mb-2" />
                            <p className="text-gray-600">{upcomingError}</p>
                        </div>
                    ) : upcomingInvoice ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Invoice Number</div>
                                    <div className="font-semibold text-gray-900">
                                        {upcomingInvoice.invoice_number || 'Pending'}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Due Date</div>
                                    <div className="font-semibold text-gray-900">
                                        {formatDate(upcomingInvoice.created_at)}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Amount</div>
                                    <div className="font-semibold text-gray-900">
                                        {formatCurrency(upcomingInvoice.amount_due)}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Status</div>
                                    <div className="font-semibold text-gray-900 capitalize">
                                        {upcomingInvoice.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Invoice</h3>
                            <p className="text-gray-600">You don't have any upcoming payments at this time.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default UpcomingInvoice