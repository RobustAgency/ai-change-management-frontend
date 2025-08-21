import { useState } from 'react';
import { addPaymentMethod, type AddPaymentMethodResult } from '@/service/app/paymentMethod';

export const usePaymentMethod = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddPaymentMethod = async (): Promise<AddPaymentMethodResult> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await addPaymentMethod();

            if (result.success && result.redirectUrl) {
                window.location.href = result.redirectUrl;
            } else {
                setError(result.message || 'Failed to add payment method');
            }

            return result;
        } catch (err: any) {
            const errorMessage = err?.message || 'An unexpected error occurred';
            setError(errorMessage);

            return {
                success: false,
                redirectUrl: null,
                error: true,
                errorCode: err?.status || 500,
                message: errorMessage
            };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        addPaymentMethod: handleAddPaymentMethod,
        isLoading,
        error,
        clearError: () => setError(null)
    };
};
