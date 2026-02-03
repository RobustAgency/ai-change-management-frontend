import { useState, useEffect, useCallback } from 'react'
import { usersService } from '@/service/admin/users'
import { UserFilters, User } from '@/interfaces/User'
import { toast } from 'react-toastify'

export type TableUser = {
    id: string
    full_name: string
    email: string
    created_at?: string
    status: "active" | "inactive"
}

interface PaginationState {
    page: number
    limit: number
    total: number
    totalPages: number
}

interface UseUsersReturn {
    users: TableUser[]
    loading: boolean
    error: string | null
    pagination: PaginationState
    filters: UserFilters
    fetchUsers: () => Promise<void>
    handleSearch: (searchTerm: string) => void
    handlePageChange: (page: number) => void
    handleRefresh: () => void
    handleClearSearch: () => void
    setFilters: (filters: UserFilters) => void
}

export const useUsers = (): UseUsersReturn => {
    const [users, setUsers] = useState<TableUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<UserFilters>({
        page: 1,
        status: undefined,
        search: undefined
    })
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    })

    const transformUserToTableUser = (user: User): TableUser => ({
        id: user.id.toString(),
        full_name: user.name || 'N/A',
        email: user.email,
        created_at: user.created_at,
        status: user.is_active ? 'active' : 'inactive'
    })

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // If there's a search term, use search API, otherwise use regular getUsers
            if (filters.search && filters.search.trim() !== '') {
                const response = await usersService.searchUsers(filters.search.trim())
                if (response.error) {
                    toast.error(response.message)
                    setError(response.message)
                    return
                }

                const transformedUsers: TableUser[] = response.data.map(transformUserToTableUser)
                setUsers(transformedUsers)

                // For search results, we don't have pagination from backend
                setPagination({
                    page: 1,
                    limit: response.data.length,
                    total: response.data.length,
                    totalPages: 1
                })
            } else {
                const response = await usersService.getUsers(filters)
                if (response.error) {
                    toast.error(response.message)
                    setError(response.message)
                    return
                }

                const transformedUsers: TableUser[] = response.data.data.map(transformUserToTableUser)

                setUsers(transformedUsers)

                setPagination({
                    page: response.data.current_page,
                    limit: response.data.per_page,
                    total: response.data.total,
                    totalPages: response.data.last_page
                })
            }
        } catch (err) {
            const errorMessage = 'Error fetching users'
            toast.error(errorMessage)
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [filters])

    const handleSearch = useCallback((searchTerm: string) => {
        // If search term is empty, immediately clear search and fetch all users
        if (!searchTerm || searchTerm.trim() === '') {
            setFilters(prev => ({
                ...prev,
                search: undefined,
                page: 1
            }))
            return
        }

        // Set search filter immediately since DataTable already handles debouncing
        setFilters(prev => ({
            ...prev,
            search: searchTerm.trim(),
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
    }, [fetchUsers])

    const handleClearSearch = useCallback(() => {
        setFilters(prev => ({
            ...prev,
            search: undefined,
            page: 1
        }))
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return {
        users,
        loading,
        error,
        pagination,
        filters,
        fetchUsers,
        handleSearch,
        handlePageChange,
        handleRefresh,
        handleClearSearch,
        setFilters
    }
}
