import { api, type ApiResponse } from '@/lib/api';

export interface AddPaymentMethodResponse {
    error: boolean;
    message: string;
    data: {
        redirect_url: string;
    };
}

export interface AddPaymentMethodResult {
    success: boolean;
    redirectUrl: string | null;
    error: boolean;
    errorCode?: number;
    message?: string;
}

export class PaymentMethodService {
    private baseUrl = '/payment-method';

    async addPaymentMethod(): Promise<AddPaymentMethodResult> {
        try {
            const response: ApiResponse<AddPaymentMethodResponse['data']> = await api.get(`${this.baseUrl}/add`);

            if (response.error) {
                return {
                    success: false,
                    redirectUrl: null,
                    error: true,
                    errorCode: 400,
                    message: response.message
                };
            }

            return {
                success: true,
                redirectUrl: response.data.redirect_url,
                error: false
            };
        } catch (error: any) {
            return {
                success: false,
                redirectUrl: null,
                error: true,
                errorCode: error?.status || 500,
                message: error?.message || 'An unexpected error occurred'
            };
        }
    }
}

export const paymentMethodService = new PaymentMethodService();

export async function addPaymentMethod(): Promise<AddPaymentMethodResult> {
    return paymentMethodService.addPaymentMethod();
}
