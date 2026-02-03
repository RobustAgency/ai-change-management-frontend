"use client"
import React from 'react'
import Greetings from '@/components/app/dashboard/Greetings';
import Metrics from '@/components/app/dashboard/Metrics';
import Projects from '@/components/app/dashboard/Projects';
import ClientFooter from '@/components/app/dashboard/ClientFooter';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const dynamic = 'force-dynamic'


const DashboardPage = () => {
    useDocumentTitle(
        'Dashboard',
        'Your Innovative Dialogs dashboard. View project metrics, recent activity, and manage your change management initiatives.'
    );

    return (
        <>
            <Greetings />
            <Metrics />
            <Projects />
            <ClientFooter />
        </>
    )
}

export default DashboardPage
