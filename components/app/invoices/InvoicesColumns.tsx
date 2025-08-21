"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Invoice } from "@/interfaces/Plan"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"

const getStatusBadge = (status: string) => {
    const variants = {
        paid: "default",
        pending: "secondary",
        failed: "destructive",
        cancelled: "destructive",
    } as const

    const colors = {
        paid: "bg-green-100 text-green-800 hover:bg-green-100",
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        failed: "bg-red-100 text-red-800 hover:bg-red-100",
        cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    const statusKey = status.toLowerCase() as keyof typeof colors

    return (
        <Badge className={cn(colors[statusKey] || colors.pending, "capitalize")} variant={variants[statusKey] || "secondary"}>
            {status}
        </Badge>
    )
}

export const createInvoicesColumns = (): ColumnDef<Invoice>[] => [
    {
        accessorKey: "invoice_number",
        header: "Invoice #",
        cell: ({ row }) => {
            const invoiceNumber = row.getValue("invoice_number") as string
            return (
                <div className="font-medium text-gray-900">
                    #{invoiceNumber}
                </div>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            const date = row.getValue("created_at") as string
            return (
                <div className="text-gray-600">
                    {formatDate(date)}
                </div>
            )
        },
    },
    {
        accessorKey: "amount_paid",
        header: "Amount",
        cell: ({ row }) => {
            const amount = row.getValue("amount_paid") as number
            return (
                <div className="font-medium text-gray-900">
                    {formatCurrency(amount)}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return getStatusBadge(status)
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const invoice = row.original
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(invoice.downloadUrl, '_blank')}
                    className="flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download
                </Button>
            )
        },
    },
]

export const invoicesColumns = createInvoicesColumns()
