import { useState, useEffect, useCallback } from 'react'
import { PlansService } from '@/service/app/plans'
import { apiUtils } from '@/lib/api'
import { toast } from 'react-toastify'
import type { Plan, Invoice, UpcomingInvoice } from '@/interfaces/Plan'

export const usePlans = () => {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPlans = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await PlansService.getPlans()
            if (!response.error) {
                setPlans(response.data)
            } else {
                setError(response.message)
            }
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to fetch plans')
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPlans()
    }, [fetchPlans])

    return { plans, loading, error, refetch: fetchPlans }
}

export const useInvoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchInvoices = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await PlansService.getInvoices()
            if (!response.error) {
                setInvoices(response.data)
            } else {
                setError(response.message)
            }
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to fetch invoices')
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    return { invoices, loading, error, refetch: fetchInvoices }
}

export const useUpcomingInvoice = () => {
    const [upcomingInvoice, setUpcomingInvoice] = useState<UpcomingInvoice | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUpcomingInvoice = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await PlansService.getUpcomingInvoice()
            if (!response.error) {
                setUpcomingInvoice(response.data)
            } else {
                setError(response.message)
            }
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to fetch upcoming invoice')
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUpcomingInvoice()
    }, [fetchUpcomingInvoice])

    return { upcomingInvoice, loading, error, refetch: fetchUpcomingInvoice }
}

export const useSubscribeToPlan = () => {
    const [loading, setLoading] = useState(false)

    const subscribe = useCallback(async (planId: number, onSuccess?: () => Promise<void>) => {
        try {
            setLoading(true)
            const response = await PlansService.subscribe(planId)

            if (!response.error) {
                if (response.data?.checkout_url) {
                    // Redirect to Stripe checkout
                    window.location.href = response.data.checkout_url
                } else {
                    toast.success(response.message || 'Successfully subscribed to plan')
                    if (onSuccess) {
                        await onSuccess()
                    }
                }
            } else {
                toast.error(response.message || 'Failed to subscribe to plan')
            }

            return response
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to subscribe to plan')
            toast.error(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return { subscribe, loading }
}

export const useSwitchPlan = () => {
    const [loading, setLoading] = useState(false)

    const switchPlan = useCallback(async (planId: number, onSuccess?: () => Promise<void>) => {
        try {
            setLoading(true)
            const response = await PlansService.switchPlan(planId)

            if (!response.error) {
                toast.success(response.message || 'Successfully switched plan')
                if (onSuccess) {
                    await onSuccess()
                }
            } else {
                toast.error(response.message || 'Failed to switch plan')
            }

            return response
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to switch plan')
            toast.error(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return { switchPlan, loading }
}

export const useCancelSubscription = () => {
    const [loading, setLoading] = useState(false)

    const cancel = useCallback(async (onSuccess?: () => Promise<void>) => {
        try {
            setLoading(true)
            const response = await PlansService.cancel()

            if (response.error) {
                toast.error(response.message || 'Failed to cancel subscription')
            } else {
                toast.success(response.message || 'Successfully cancelled subscription')
                if (onSuccess) {
                    await onSuccess()
                }
            }
            return response
        } catch (err) {
            const errorMessage = apiUtils.handleError(err, 'Failed to cancel subscription')
            toast.error(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return { cancel, loading }
}
