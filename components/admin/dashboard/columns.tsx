"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ActionCell from "./ActionCell"
import { TableUser } from "@/hooks/admin/useUsers"

const getStatusBadge = (status: TableUser["status"]) => {
    const variants = {
        approved: "default",
        rejected: "destructive",
        pending: "secondary",
    } as const

    const colors = {
        approved: "bg-green-100 text-green-800 hover:bg-green-100",
        rejected: "bg-red-100 text-red-800 hover:bg-red-100",
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    }

    return (
        <Badge className={cn(colors[status], "capitalize")} variant={variants[status]}>
            {status}
        </Badge>
    )
}

export const createColumns = (onRefresh?: () => void): ColumnDef<TableUser>[] => [
    {
        accessorKey: "full_name",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as TableUser["status"]
            return getStatusBadge(status)
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original
            return <ActionCell user={user} onRefresh={onRefresh} />
        },
    },
]

export const columns = createColumns()
