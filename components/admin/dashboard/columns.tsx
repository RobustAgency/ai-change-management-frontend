"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import ActionCell from "./ActionCell"
import { TableUser } from "@/hooks/admin/useUsers"
import Link from "next/link"

const getStatusBadge = (status: TableUser["status"]) => {
    const colorMap = {
        active: "success" as const,
        inactive: "error" as const,
    }

    return (
        <Badge variant="light" color={colorMap[status]} className="capitalize">
            {status}
        </Badge>
    )
}

export const createColumns = (onRefresh?: () => void, onDashboardRefresh?: () => void): ColumnDef<TableUser>[] => [
    {
        accessorKey: "full_name",
        header: "Username",
        cell: ({ row }) => {
            const fullName = row.getValue("full_name") as string
            const userId = row.original.id
            return (
                <Link 
                    href={`/admin/users/${userId}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                    <span className="size-8 bg-primary rounded-full flex items-center justify-center text-white">{fullName[0]}</span>
                    <span className="font-medium">{fullName}</span>
                </Link>
            )
        }
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
        accessorKey: "created_at",
        header: "Join Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at") as string)
            return date.toLocaleDateString()
        }
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const user = row.original
            return <ActionCell user={user} onRefresh={onRefresh} onDashboardRefresh={onDashboardRefresh} />
        },
    },
]

export const columns = createColumns()
