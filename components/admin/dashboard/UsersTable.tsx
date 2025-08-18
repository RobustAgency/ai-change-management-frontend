'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { DataTable } from '@/components/custom/DataTable'
import { createColumns, TableUser } from './columns'
import TableCard from '@/components/custom/TableCard'
import { usersService } from '@/service/admin/users'
import { UserFilters, User } from '@/interfaces/User'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'

const UsersTable = () => {
    const [users, setUsers] = useState<TableUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<UserFilters>({
        page: 1,
        status: undefined,
        search: undefined
    })
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    })

    const fetchUsers = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await usersService.getUsers(filters)
            if (response.error) {
                toast.error(response.message)
                return
            }

            const transformedUsers: TableUser[] = response.data.data.map((user: User) => ({
                id: user.id.toString(),
                full_name: user.name || 'N/A',
                email: user.email,
                status: user.is_approved ? 'approved' : 'pending'
            }))

            setUsers(transformedUsers)

            setPagination({
                page: response.data.current_page,
                limit: response.data.per_page,
                total: response.data.total,
                totalPages: response.data.last_page
            })
        } catch (err) {
            toast.error('Error fetching users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchUsers()
    }, [filters])

    const handleSearch = useCallback((searchTerm: string) => {
        setFilters(prev => ({
            ...prev,
            search: searchTerm || undefined,
            page: 1
        }))
    }, [])

    const handlePageChange = useCallback((page: number) => {
        setFilters(prev => ({
            ...prev,
            page
        }))
    }, [])

    const handleRefresh = useCallback(() => {
        fetchUsers()
    }, [])

    const columns = useMemo(() => createColumns(handleRefresh), [handleRefresh])

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
        <TableCard title="Users">
            <DataTable
                columns={columns}
                data={users}
                searchKey="full_name"
                searchPlaceholder="Search users by name..."
                pagination={pagination}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                loading={loading}
                serverSide={false}
            />
        </TableCard>
    )
}

export default UsersTable
