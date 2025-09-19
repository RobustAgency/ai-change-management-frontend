import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './Overview'
import Plans from './Plans'
import InvoiceHistory from './InvoiceHistory'

const tabs = [
    { value: "overview", label: "Overview", component: <Overview /> },
    { value: "plans", label: "Plans", component: <Plans /> },
    { value: "invoice-history", label: "Invoices", component: <InvoiceHistory /> },
]

const BillingTabs = () => {
    return (
        <Tabs defaultValue="overview">
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
            {tabs.map(({ value, component }) => (
                <TabsContent key={value} value={value} className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
                    {component}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default BillingTabs
