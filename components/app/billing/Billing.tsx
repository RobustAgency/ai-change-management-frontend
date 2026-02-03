"use client"
import BillingTabs from "./BillingTabs"
import ContainerCard from "@/components/custom/ContainerCard"
import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { AlertCircle, X } from 'lucide-react'

export default function Billing() {
    const { profile } = useAuth();
    const [showAlert, setShowAlert] = useState(true);
    return (
        <div>
            {showAlert && profile?.plan_id == null && (
                <div className="mb-4 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-amber-800">Subscribe to a Plan to unlock exclusive features</p>
                            <button onClick={() => setShowAlert(false)} className="text-amber-600 hover:underline cursor-pointer"><X size={18} /></button>
                        </div>
                        <p className="text-sm text-amber-700 mt-1">Choose a plan to unlock all features and remove limitations.</p>
                    </div>
                </div>
            )}

            <ContainerCard
                title="Billing & Subscription"
                description="Manage your subscription, view usage, and billing history."
            >
                <BillingTabs />
            </ContainerCard>
        </div>
    )
}
