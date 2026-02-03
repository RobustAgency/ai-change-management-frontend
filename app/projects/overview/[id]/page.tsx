import React from 'react'
import ProjectOverview from '@/components/app/projects/overview/ProjectOverview'
import type { Metadata } from 'next'

;

export const metadata: Metadata = {
  title: 'Project Overview',
  description: 'View comprehensive project details, progress tracking, and stakeholder information for your change management initiative.',
  robots: {
    index: false,
    follow: false,
  },
}

const ProjectOverviewPage = () => {
    return (
        <React.Fragment>
            <ProjectOverview />
        </React.Fragment>
    )
}

export default ProjectOverviewPage