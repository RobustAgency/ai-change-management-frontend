import { useState, useEffect, useCallback } from 'react'
import { usersService } from '@/service/admin/users'
import { User } from '@/interfaces/User'
import { toast } from 'react-toastify'

interface UseUserDetailsReturn {
    user: User | null
    loading: boolean
    error: string | null
    fetchUser: () => Promise<void>
    refetch: () => void
}

export const useUserDetails = (userId: string): UseUserDetailsReturn => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = useCallback(async () => {
        if (!userId) {
            setError('User ID is required')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const response = await usersService.getUserById(userId)
            
            if (response.error) {
                toast.error(response.message)
                setError(response.message)
                return
            }

            setUser(response.data)
        } catch (err) {
            const errorMessage = 'Error fetching user details'
            toast.error(errorMessage)
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [userId])

    const refetch = useCallback(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return {
        user,
        loading,
        error,
        fetchUser,
        refetch
    }
}