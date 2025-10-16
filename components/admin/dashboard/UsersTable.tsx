'use client'

import React, { useMemo } from 'react'
import { DataTable } from '@/components/custom/DataTable'
import { createColumns } from './columns'
import TableCard from '@/components/custom/TableCard'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle, Users } from 'lucide-react'
import { useUsers } from '@/hooks/admin/useUsers'

interface UsersTableProps {
    onDashboardRefresh?: () => void
}

const UsersTable = ({ onDashboardRefresh }: UsersTableProps) => {
    const {
        users,
        loading,
        error,
        pagination,
        filters,
        handleSearch,
        handlePageChange,
        handleRefresh
    } = useUsers()

    const columns = useMemo(() => createColumns(handleRefresh, onDashboardRefresh), [handleRefresh, onDashboardRefresh])

    const isSearching = filters.search && filters.search.trim() !== ''
    const currentPagination = isSearching ? { ...pagination, totalPages: 1 } : pagination

    if (error) {
        return (
            <TableCard title="Users">
                <div className="flex flex-col items-center justify-center py-8">
                    <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={handleRefresh} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </div>
            </TableCard>
        )
    }

    return (
        <TableCard>
            <DataTable
                title="User Management"
                description="Manage application users and their roles"
                icon={Users}
                columns={columns}
                data={users}
                searchKey="full_name"
                searchPlaceholder="Search users by name or email..."
                pagination={currentPagination}
                onPageChange={isSearching ? undefined : handlePageChange}
                onSearch={handleSearch}
                cellPadding={'15px'}
                loading={loading}
                serverSide={true}
            />
        </TableCard>
    )
}

export default UsersTable
