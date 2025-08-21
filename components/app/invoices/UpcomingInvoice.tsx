import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, DollarSign, FileText, Clock } from 'lucide-react'
import Spinner from '@/components/ui/spinner'
import type { UpcomingInvoice } from '@/interfaces/Plan'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

interface UpcomingInvoiceProps {
    upcomingInvoice: UpcomingInvoice | null
    upcomingLoading: boolean
    upcomingError: string | null
}

const UpcomingInvoice = ({ upcomingInvoice, upcomingLoading, upcomingError }: UpcomingInvoiceProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Invoice</h2>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Next Billing
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {upcomingLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Spinner size="sm" />
                        </div>
                    ) : upcomingError ? (
                        <div className="text-center py-8">
                            <div className="text-red-500 mb-2">Error loading upcoming invoice</div>
                            <div className="text-sm text-gray-600">{upcomingError}</div>
                        </div>
                    ) : upcomingInvoice ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Invoice Number</div>
                                        <div className="font-semibold text-gray-900">
                                            {upcomingInvoice.invoice_number || 'Pending'}
                                        </div>
                                    </div>
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Due Date</div>
                                        <div className="font-semibold text-gray-900">
                                            {formatDate(upcomingInvoice.created_at)}
                                        </div>
                                    </div>
                                    <Calendar className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Amount</div>
                                        <div className="font-semibold text-gray-900">
                                            {formatCurrency(upcomingInvoice.amount_due)}
                                        </div>
                                    </div>
                                    <DollarSign className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Status</div>
                                        <div className="font-semibold text-gray-900 capitalize">
                                            {upcomingInvoice.status}
                                        </div>
                                    </div>
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Invoice</h3>
                            <p className="text-gray-600">You don't have any upcoming invoices at the moment.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default UpcomingInvoice