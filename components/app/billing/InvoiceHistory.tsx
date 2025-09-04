import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileChartColumnIncreasing } from "lucide-react"
import { useInvoices } from '@/hooks/app/usePlans'
import Spinner from '@/components/ui/spinner'
import { DataTable } from '@/components/custom/DataTable'
import { invoicesColumns } from '@/components/app/billing/InvoicesColumns'

const History = () => {
    const { invoices, loading, error } = useInvoices()

    return (
        <React.Fragment>
            <Card className="border-0 shadow-sm bg-white gap-0">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FileChartColumnIncreasing className="h-5 w-5 mr-2" />
                        Recent Invoices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Spinner size="sm" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="text-red-500 mb-2">Error loading invoices</div>
                            <div className="text-sm text-gray-600">{error}</div>
                        </div>
                    ) : invoices.length === 0 ? (
                        <div className="text-center py-12">
                            <FileChartColumnIncreasing className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Invoices Found</h3>
                            <p className="text-gray-600">You don&apos;t have any billing history yet.</p>
                        </div>
                    ) : (
                        <DataTable
                            columns={invoicesColumns}
                            data={invoices}
                        />
                    )}
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default History