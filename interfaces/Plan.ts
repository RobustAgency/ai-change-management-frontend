export interface Plan {
    id: number
    name: string
    description: string
    limit: number
    price: number
    billing_cycle: 'monthly' | 'yearly'
    currency: string
    stripe_price_id: string
    active: boolean
    created_at: string
    updated_at: string
}

export interface Invoice {
    invoice_number: string
    created_at: string
    amount_paid: number
    status: string
    downloadUrl: string
}

export interface UpcomingInvoice {
    invoice_number: string | null
    created_at: string
    amount_due: number
    status: string
    download_url: string | null
}

export interface SubscriptionResponse {
    error: boolean
    message: string
    data: {
        redirect_url?: string
    } | null
}

export interface PlansApiResponse {
    data: Plan[]
    status: number
    message: string
    error: boolean
}

export interface InvoicesApiResponse {
    data: Invoice[]
    status: number
    message: string
    error: boolean
}

export interface UpcomingInvoiceApiResponse {
    data: UpcomingInvoice | null
    status: number
    message: string
    error: boolean
}
