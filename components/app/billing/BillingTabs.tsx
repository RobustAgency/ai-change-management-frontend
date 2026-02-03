"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './Overview'
import Plans from './Plans'
import InvoiceHistory from './InvoiceHistory'
import { useSearchParams, useRouter } from 'next/navigation'

const tabs = [
    { value: "overview", label: "Overview" },
    { value: "plans", label: "Plans" },
    { value: "invoice-history", label: "Invoices" },
]

const BillingTabs = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        const tabParam = searchParams?.get('tab')
        if (tabParam) {
            setActiveTab(tabParam)
        }
    }, [searchParams])

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set('tab', value)
        const query = params.toString()
        router.replace(`${window.location.pathname}${query ? `?${query}` : ''}`)
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 max-w-sm sm:max-w-md lg:max-w-lg bg-white border p-1 h-10 sm:h-12">
                {tabs.map(({ value, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white font-medium sm:font-semibold text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4"
                    >
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
                <Overview onSwitchToPlans={() => handleTabChange("plans")} />
            </TabsContent>
            <TabsContent value="plans" className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
                <Plans />
            </TabsContent>
            <TabsContent value="invoice-history" className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
                <InvoiceHistory />
            </TabsContent>
        </Tabs>
    )
}

export default BillingTabs
