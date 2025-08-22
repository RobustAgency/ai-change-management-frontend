"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Invoice } from "@/interfaces/Plan"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"

const getStatusBadge = (status: string) => {
    const colorMap: Record<string, "success" | "warning" | "error" | "info"> = {
        paid: "success",
        pending: "warning",
        failed: "error",
        cancelled: "error",
    }

    const statusKey = status.toLowerCase()
    const color = colorMap[statusKey] || "info"

    return (
        <Badge variant="light" color={color} className="capitalize">
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
