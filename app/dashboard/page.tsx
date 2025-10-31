"use client"
import React from 'react'
import Greetings from '@/components/app/dashboard/Greetings';
import Metrics from '@/components/app/dashboard/Metrics';
import Projects from '@/components/app/dashboard/Projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const dynamic = 'force-dynamic'

const DashboardPage = () => {
    useDocumentTitle(
        'Dashboard',
        'Your AI Change Management dashboard. View project metrics, recent activity, and manage your change management initiatives.'
    );

    return (
        <React.Fragment>
            <Greetings />
            <Metrics />
            <Projects />
        </React.Fragment>
    )
}

export default DashboardPage
