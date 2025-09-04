"use client"
import BillingTabs from "./BillingTabs"
import ContainerCard from "@/components/custom/ContainerCard"

export default function Billing() {
    return (
        <ContainerCard
            title="Billing & Subscription"
            description="Manage your subscription, view usage, and billing history."
        >
            <BillingTabs />
        </ContainerCard>
    )
}
