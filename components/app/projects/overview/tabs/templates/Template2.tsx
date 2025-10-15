import React from 'react'
import { ProjectData } from '../../types'

interface Template2Props {
    project?: ProjectData
}

const getSlideTitle = (slideIndex: number) => {
    const slideNames = [
        'Change Management Strategy',
        'Agenda', 
        'Executive Summary',
        'Benefits',
        'Stakeholders',
        'Change Management Strategy'
    ];
    
    return slideNames[slideIndex] || `Slide ${slideIndex + 1}`;
}

// Template 2 - Modern Red Theme Design
const renderTitleSlide = (project?: ProjectData) => {
    return (
        <div className="h-full flex bg-white relative">
            {/* Red accent header bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            
            {/* Left side - main content area */}
            <div className="w-3/5 flex flex-col justify-center pl-12 pr-8">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                    Change<br />
                    Management<br />
                    Strategy
                </h1>
                {project?.name && (
                    <p className="text-lg text-gray-600 mt-6">
                        {project.name}
                    </p>
                )}
            </div>
            
            {/* Right side - red accent area with geometric shapes */}
            <div className="w-2/5 bg-red-600 relative flex items-center justify-center">
                {/* Geometric shapes for modern design */}
                <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-red-500 rounded-full opacity-70"></div>
                <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-red-700 transform rotate-45 opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 border-4 border-white rounded-full opacity-60"></div>
                </div>
            </div>
        </div>
    )
}

const renderAgendaSlide = (project?: ProjectData) => {
    const agendaItems = [
        { number: '01', text: 'Executive Summary', icon: '📊' },
        { number: '02', text: 'Benefits', icon: '💡' },
        { number: '03', text: 'Key Stakeholders', icon: '👥' },
        { number: '04', text: 'Change Management Strategy', icon: '🎯' }
    ];

    return (
        <div className="space-y-8 p-6">
            <div className="grid gap-6">
                {agendaItems.map((item, index) => (
                    <div key={index} className="flex items-center bg-white border-l-4 border-red-600 shadow-md rounded-r-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mr-6">
                            {item.number}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {item.text}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderExecutiveSummarySlide = (project?: ProjectData) => {
    const execSummaryData = (project?.ai_content as any)?.slides_content?.executive_summary_slide;

    return (
        <div className="space-y-6 p-6">
            {/* Main content card */}
            <div className="bg-white rounded-lg shadow-lg border-t-4 border-red-600 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                    <h3 className="text-2xl font-bold">Project Overview</h3>
                </div>
                <div className="p-6">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Key highlights grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg shadow-md border-l-4 border-red-500 p-6">
                    <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        Key Benefits
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            Enhanced operational efficiency
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            Improved decision-making capabilities
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            Increased stakeholder engagement
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md border-l-4 border-red-500 p-6">
                    <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        Success Metrics
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            50% reduction in reporting time
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            95% user adoption rate
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            Improved data accessibility
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const renderBenefitsSlide = (project?: ProjectData) => {
    const benefitCards = (project?.ai_content as any)?.slides_content?.benefits_slide?.benefit_cards || [
        { title: 'Enhanced Decision Making', bullet_list: ['Real-time analytics', 'Data-driven insights', 'Strategic planning'] },
        { title: 'Cost Efficiency', bullet_list: ['Reduced operational costs', 'Streamlined processes', 'Resource optimization'] }
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Benefits grid - modern card layout */}
            <div className="grid grid-cols-2 gap-8">
                {benefitCards.slice(0, 4).map((benefit: any, index: number) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-t-4 border-red-600">
                        {/* Card header with gradient */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                                    {index === 0 ? '🎯' : index === 1 ? '💰' : index === 2 ? '⚡' : '📈'}
                                </div>
                                <h4 className="text-xl font-bold">
                                    {benefit.title || `Benefit ${index + 1}`}
                                </h4>
                            </div>
                        </div>
                        
                        {/* Card content */}
                        <div className="p-6">
                            {benefit.bullet_list && benefit.bullet_list.length > 0 && (
                                <ul className="space-y-3">
                                    {benefit.bullet_list.slice(0, 3).map((bullet: string, bulletIndex: number) => (
                                        <li key={bulletIndex} className="flex items-start text-gray-700">
                                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="text-sm leading-relaxed">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderStakeholdersSlide = (project?: ProjectData) => {
    const stakeholdersData = (project?.ai_content as any)?.slides_content?.key_stakeholders_slide?.stakeholder_table || [
        { title: 'Data & Analytics', bullet_list: ['Lead technical implementation', 'Ensure system architecture', 'Develop data quality standards'] },
        { title: 'Finance', bullet_list: ['Provide financial reporting needs', 'Test financial outputs', 'Define cost-benefit metrics'] },
        { title: 'IT', bullet_list: ['Manage cloud infrastructure', 'Support system interoperability', 'Provide technical support'] }
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Stakeholder cards - modern layout */}
            <div className="grid grid-cols-1 gap-6">
                {stakeholdersData.slice(0, 3).map((stakeholder: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start gap-6">
                                {/* Stakeholder icon/avatar */}
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                    {stakeholder.title?.charAt(0) || 'S'}
                                </div>
                                
                                {/* Stakeholder info */}
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                                        {stakeholder.title || `Stakeholder ${index + 1}`}
                                    </h4>
                                    
                                    {/* Responsibilities */}
                                    {stakeholder.bullet_list && stakeholder.bullet_list.length > 0 && (
                                        <div className="space-y-2">
                                            <h5 className="text-sm font-semibold text-red-700 uppercase tracking-wide">
                                                Key Responsibilities
                                            </h5>
                                            <ul className="space-y-1">
                                                {stakeholder.bullet_list.slice(0, 3).map((responsibility: string, respIndex: number) => (
                                                    <li key={respIndex} className="flex items-start text-gray-700">
                                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                        <span className="text-sm leading-relaxed">{responsibility}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderStrategySlide = (project?: ProjectData) => {
    const strategyData = (project?.ai_content as any)?.slides_content?.change_management_strategy_slide;
    const numbersList = strategyData?.numbers_list || [
        'Communicate clear project goals and progress to all stakeholders.',
        'Run workshops and training sessions to ensure user readiness.',
        'Implement a phased deployment to mitigate risks and gather feedback.',
        'Establish a dedicated support team to aid with the transition.',
        'Continuously monitor and optimize system performance post-deployment.'
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold">5-Step Implementation Strategy</h3>
                </div>
            </div>

            {/* Strategy steps */}
            <div className="space-y-4">
                {numbersList.slice(0, 5).map((step: string, index: number) => (
                    <div key={index} className="bg-white rounded-lg shadow-md border-l-4 border-red-600 hover:shadow-lg transition-shadow">
                        <div className="p-6 flex items-start gap-6">
                            {/* Step number */}
                            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                {index + 1}
                            </div>
                            
                            {/* Step content */}
                            <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed">
                                    {step}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom accent */}
            <div className="flex justify-center mt-8">
                <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full"></div>
            </div>
        </div>
    )
}

const Template2 = ({ project }: Template2Props) => {
    const renderSlideContent = (slideIndex: number) => {
        if (slideIndex === 0) {
            return renderTitleSlide(project)
        } else if (slideIndex === 1) {
            return renderAgendaSlide(project)
        } else if (slideIndex === 2) {
            return renderExecutiveSummarySlide(project)
        } else if (slideIndex === 3) {
            return renderBenefitsSlide(project)
        } else if (slideIndex === 4) {
            return renderStakeholdersSlide(project)
        } else if (slideIndex === 5) {
            return renderStrategySlide(project)
        }

        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Content Slide {slideIndex + 1}</h4>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    </div>
                </div>
            </div>
        )
    }

    return {
        getSlideTitle,
        renderSlideContent,
        slideCount: 6
    }
}

export default Template2