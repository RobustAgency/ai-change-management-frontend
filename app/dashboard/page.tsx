"use client"
import React from 'react'
import Dashboard from '@/components/app/dashboard/Dashboard';

export const runtime = "edge";

const DashboardPage = () => {
    return (
        <React.Fragment>
            <Dashboard />
        </React.Fragment>
    )
}

export default DashboardPage