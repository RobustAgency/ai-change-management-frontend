'use client'

import React from 'react'
import UsersTable from './UsersTable'
import Metrics from './Metrics'
import { useDashboard } from '@/hooks/admin/useDashboard'

const AdminDashboardClient = () => {
    const dashboardData = useDashboard()

    return (
        <>
            <Metrics dashboardData={dashboardData} />
            <UsersTable onDashboardRefresh={dashboardData.refetch} />
        </>
    )
}

export default AdminDashboardClient