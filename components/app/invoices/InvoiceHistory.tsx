import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import Spinner from '@/components/ui/spinner'
import { Invoice } from '@/interfaces/Plan'
import { DataTable } from '@/components/custom/DataTable'
import { invoicesColumns } from './InvoicesColumns'

interface InvoiceHistoryProps {
    invoices: Invoice[]
    invoicesLoading: boolean
}

const InvoiceHistory = ({ invoices, invoicesLoading }: InvoiceHistoryProps) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Invoice History</h2>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        Recent Invoices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {invoicesLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Spinner size="sm" />
                        </div>
                    ) : invoices.length > 0 ? (
                        <DataTable
                            columns={invoicesColumns}
                            data={invoices}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Invoices Found</h3>
                            <p className="text-gray-600">You haven't generated any invoices yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default InvoiceHistory