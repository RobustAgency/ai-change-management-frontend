import React from 'react'
import ContainerCard from '@/components/custom/ContainerCard';
import AdminDashboardClient from '@/components/admin/dashboard/AdminDashboardClient';

export const dynamic = 'force-dynamic'

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
