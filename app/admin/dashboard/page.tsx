import React from 'react'
import ContainerCard from '@/components/custom/ContainerCard';
import AdminDashboardClient from '@/components/admin/dashboard/AdminDashboardClient';
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'AI Change Management admin dashboard. Manage users, monitor platform usage, oversee subscriptions, and access administrative tools.',
  robots: {
    index: false,
    follow: false,
  },
}

const AdminDashboardPage = () => {
    return (
        <React.Fragment>
            <ContainerCard title="Admin Dashboard" description="Manage users, monitor platform usage, and oversee subscriptions.">
                <AdminDashboardClient />
            </ContainerCard>
        </React.Fragment>
    )
}

export default AdminDashboardPage
