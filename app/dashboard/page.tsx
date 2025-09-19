"use client"
import React from 'react'
import Greetings from '@/components/app/dashboard/Greetings';
import Metrics from '@/components/app/dashboard/Metrics';
import Projects from '@/components/app/dashboard/Projects';

export const dynamic = 'force-dynamic'

const DashboardPage = () => {
    return (
        <React.Fragment>
            <Greetings />
            <Metrics />
            <Projects />
        </React.Fragment>
    )
}

export default DashboardPage
