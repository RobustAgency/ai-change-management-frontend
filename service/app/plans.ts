import { api } from '@/lib/api'
import type {
    Plan,
    Invoice,
    UpcomingInvoice
} from '@/interfaces/Plan'

export class PlansService {
    /**
     * Get all active plans
     */
    static async getPlans() {
        return api.get<Plan[]>('/plans')
    }

    /**
     * Subscribe to a plan (for new subscriptions)
     */
    static async subscribe(planId: number) {
        return api.get<{ checkout_url?: string }>(`/plans/subscribe/${planId}`)
    }

    /**
     * Switch to a different plan (for existing subscriptions)
     */
    static async switchPlan(planId: number) {
        return api.get(`/plans/switch/${planId}`)
    }

    /**
     * Cancel current subscription
     */
    static async cancel() {
        return api.get(`/plans/cancel`)
    }

    /**
     * Get user invoices
     */
    static async getInvoices() {
        return api.get<Invoice[]>('/plans/invoices')
    }

    /**
     * Get upcoming invoice
     */
    static async getUpcomingInvoice() {
        return api.get<UpcomingInvoice>('/plans/upcoming-invoice')
    }
}
