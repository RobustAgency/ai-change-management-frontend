import React from 'react'
import UsersTable from '@/components/admin/dashboard/UsersTable'
import ContainerCard from '@/components/custom/ContainerCard';
import Metrics from '@/components/admin/dashboard/Metrics';

export const runtime = "edge";

const AdminDashboardPage = () => {
    return (
        <React.Fragment>
            <ContainerCard title="Admin Dashboard" description="Manage users, monitor platform usage, and oversee subscriptions.">
                <Metrics />
                <UsersTable />
            </ContainerCard>
        </React.Fragment>
    )
}

export default AdminDashboardPage