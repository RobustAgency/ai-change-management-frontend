import React from 'react'
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { SlideDeck, ProjectData } from '../types'
import dynamic from 'next/dynamic'

// Dynamically import DownloadPPTX to ensure it's only loaded on the client
const DownloadPPTX = dynamic(() => import('./DownloadPPTX'), {
    ssr: false,
    loading: () => (
        <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled
        >
            <Download className="w-4 h-4" />
            Loading...
        </Button>
    )
})

interface SlideDecksProps {
    slideDecks: SlideDeck[]
    project?: ProjectData
}

const getSlideTitle = (slideIndex: number) => {
    const slideNames = [
        'Change Management Strategy',
        'Agenda', 
        'Executive Summary',
        'Benefits',
        'Stakeholders',
        'High-Level Change Management Strategy'
    ];
    
    return slideNames[slideIndex] || `Slide ${slideIndex + 1}`;
}

const renderTitleSlide = (project?: ProjectData) => {
    return (
        <div className="h-full flex">
            {/* Left side - white background with title */}
            <div className="w-1/2 flex flex-col justify-center pl-8">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                    Change<br />
                    Management<br />
                    Strategy
                </h1>
            </div>
            {/* Right side - dark background */}
            <div className="w-1/2 bg-gray-700"></div>
        </div>
    )
}

const renderAgendaSlide = (project?: ProjectData) => {
    const agendaItems = [
        { number: '01', text: 'Executive Summary' },
        { number: '02', text: 'Benefits' },
        { number: '03', text: 'Key Stakeholders' },
        { number: '04', text: 'High Level Change Management Strategy' }
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {agendaItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-black w-8">
                            {item.number}
                        </span>
                        <span className="text-lg text-gray-800">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderExecutiveSummarySlide = (project?: ProjectData) => {
    const execSummaryData = (project?.ai_content as any)?.slides_content?.executive_summary_slide;

    return (
        <div className="space-y-4 h-full">
            <div className="space-y-3">
                {/* Table structure for Executive Summary */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Project Overview Row */}
                    <div className="flex border-b border-gray-300">
                        <div className="w-1/4 bg-gray-600 text-white p-3 font-semibold text-sm">
                            Project Overview
                        </div>
                        <div className="w-3/4 bg-gray-50 p-3 text-sm">
                            {execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.'}
                        </div>
                    </div>
                    
                    {/* Purpose of OCM Plan Row */}
                    <div className="flex border-b border-gray-300">
                        <div className="w-1/4 bg-gray-600 text-white p-3 font-semibold text-sm">
                            Purpose of the OCM Plan
                        </div>
                        <div className="w-3/4 bg-gray-50 p-3 text-sm">
                            {execSummaryData?.purpose_of_ocm_plan || 'This Organizational Change Management (OCM) Plan outlines a comprehensive, inclusive, and mission-aligned approach to support the successful adoption of the Project Name.'}
                        </div>
                    </div>
                    
                    {/* Aligned with Mission and Vision Row */}
                    <div className="flex border-b border-gray-300">
                        <div className="w-1/4 bg-gray-600 text-white p-3 font-semibold text-sm">
                            Aligned with Client's Org Mission and Vision
                        </div>
                        <div className="w-3/4 bg-gray-50 p-3 text-sm">
                            {Array.isArray(execSummaryData?.aligned_with_org_mission_and_vision) 
                                ? execSummaryData.aligned_with_org_mission_and_vision.map((item: string, index: number) => (
                                    <div key={index} className="mb-1">• {item}</div>
                                  ))
                                : '• Bulleted list'
                            }
                        </div>
                    </div>
                    
                    {/* Benefits Row */}
                    <div className="flex border-b border-gray-300">
                        <div className="w-1/4 bg-gray-600 text-white p-3 font-semibold text-sm">
                            Benefits
                        </div>
                        <div className="w-3/4 bg-gray-50 p-3 text-sm">
                            {Array.isArray(execSummaryData?.benefits)
                                ? execSummaryData.benefits.map((item: string, index: number) => (
                                    <div key={index} className="mb-1">• {item}</div>
                                  ))
                                : '• Bulleted list'
                            }
                        </div>
                    </div>
                    
                    {/* Strategic Objectives Row */}
                    <div className="flex">
                        <div className="w-1/4 bg-gray-600 text-white p-3 font-semibold text-sm">
                            Strategic Objectives of the OCM Plan
                        </div>
                        <div className="w-3/4 bg-gray-50 p-3 text-sm">
                            {Array.isArray(execSummaryData?.strategic_objectives_of_ocm_plan)
                                ? execSummaryData.strategic_objectives_of_ocm_plan.map((item: string, index: number) => (
                                    <div key={index} className="mb-1">• {item}</div>
                                  ))
                                : execSummaryData?.strategic_objectives_of_ocm_plan || 'Strategic objectives content'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderBenefitsSlide = (project?: ProjectData) => {
    const benefitCards = (project?.ai_content as any)?.slides_content?.benefits_slide?.benefit_cards || [
        { title: 'Improved operational efficiency', bullet_list: ['Streamlined processes', 'Faster response times'] },
        { title: 'Enhanced employee engagement', bullet_list: ['Better communication', 'Increased satisfaction'] }
    ];

    return (
        <div className="space-y-4">
            {/* Benefits Grid - 3x2 layout */}
            <div className="grid grid-cols-3 gap-4">
                {benefitCards.slice(0, 6).map((benefit: any, index: number) => (
                    <div key={index} className="border-2 border-blue-200 rounded-lg overflow-hidden">
                        {/* Blue header */}
                        <div className="bg-blue-800 text-white p-3 text-center">
                            <h4 className="font-semibold text-sm">
                                {benefit.title || `Benefit ${index + 1}`}
                            </h4>
                        </div>
                        {/* Content area */}
                        <div className="bg-white p-3 h-20">
                            {benefit.bullet_list && benefit.bullet_list.length > 0 && (
                                <div className="space-y-1">
                                    {benefit.bullet_list.slice(0, 2).map((bullet: string, bulletIndex: number) => (
                                        <div key={bulletIndex} className="text-xs text-gray-700">
                                            • {bullet}
                                        </div>
                                    ))}
                                </div>
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
        { title: 'Project Manager', project_role: 'Lead project execution' }
    ];

    return (
        <div className="space-y-4">
            {/* Stakeholder Table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-blue-500 text-white grid grid-cols-3 gap-0">
                    <div className="p-3 font-semibold border-r border-blue-400">
                        Stakeholder Name
                    </div>
                    <div className="p-3 font-semibold border-r border-blue-400">
                        Title
                    </div>
                    <div className="p-3 font-semibold">
                        Project Role
                    </div>
                </div>
                
                {/* Table Rows */}
                {stakeholdersData.slice(0, 4).map((stakeholder: any, index: number) => {
                    // Extract name from title (assuming format like "Name, Title")
                    const titleParts = stakeholder.title?.match(/^(.+?),\s*(.+?)$/) || [null, stakeholder.title || '', ''];
                    const stakeholderName = titleParts[1] || stakeholder.title || `Stakeholder ${index + 1}`;
                    const stakeholderTitle = titleParts[2] || 'Role';
                    
                    return (
                        <div key={index} className={`grid grid-cols-3 gap-0 border-b border-gray-300 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                            <div className="p-3 border-r border-gray-300 text-sm">
                                {stakeholderName}
                            </div>
                            <div className="p-3 border-r border-gray-300 text-sm">
                                {stakeholderTitle}
                            </div>
                            <div className="p-3 text-sm">
                                {stakeholder.project_role || 'Project participant'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

const renderStrategySlide = (project?: ProjectData) => {
    const strategyData = (project?.ai_content as any)?.slides_content?.high_level_change_management_strategy_slide;
    
    const columns = [
        {
            title: 'Stakeholder Alignment & Engagement',
            content: strategyData?.stakeholder_alignment_and_engagement || { title: 'Aligning Stakeholders', actions: ['Identify key departmental champions.', 'Regular update meetings with stakeholders.', 'Feedback loops to evaluate stakeholder concerns and suggestions.'] },
            headerColor: 'bg-blue-700',
            contentColor: 'bg-blue-100'
        },
        {
            title: 'Define the Why & WIIFM',
            content: strategyData?.define_the_why_and_wiifm || { title: 'Communicate Benefits', actions: ['Clarify the benefits of the new ERP to all users.', 'Determine impact on each role and communicate accordingly.', 'Highlight efficiency gains and error reduction in training sessions.'] },
            headerColor: 'bg-blue-600',
            contentColor: 'bg-blue-100'
        },
        {
            title: 'Change Management Plan',
            content: strategyData?.change_management_plan || { title: 'Execution Plan', actions: ['Develop comprehensive training programs.', 'Create detailed communication strategy targeting all user levels.', 'Implement a support and help desk for immediate post-launch assistance.'] },
            headerColor: 'bg-blue-700',
            contentColor: 'bg-blue-100'
        },
        {
            title: '"People" Measurement',
            content: strategyData?.people_measurement || { title: 'Evaluate Impact', actions: ['Track adoption rates across departments.', 'Assess user competency and comfort with the new system.', 'Gather feedback to refine ongoing support and training efforts.'] },
            headerColor: 'bg-blue-400',
            contentColor: 'bg-blue-100'
        }
    ];

    return (
        <div className="space-y-4">
            {/* 4-column layout */}
            <div className="grid grid-cols-4 gap-2">
                {columns.map((column, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                        {/* Column header */}
                        <div className={`${column.headerColor} text-white p-3 text-center`}>
                            <h4 className="font-semibold text-xs leading-tight">
                                {column.title}
                            </h4>
                        </div>
                        
                        {/* Column content */}
                        <div className={`${column.contentColor} p-3 h-48`}>
                            <div className="space-y-2">
                                {column.content.actions?.slice(0, 4).map((action: string, actionIndex: number) => (
                                    <div key={actionIndex} className="text-xs text-gray-800 leading-relaxed">
                                        • {action}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderSlideContent = (slideIndex: number, project?: ProjectData) => {
    // For the main presentation, we'll show the actual slides being generated
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
                {project && (
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-700">Project: {project.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const SlideDecks = ({ slideDecks, project }: SlideDecksProps) => {
    return (
        <div className="space-y-6">
            {/* Export All Button */}
            <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Complete Presentation Package
                        </h3>
                        <p className="text-gray-600">
                            Export all slides as a single PowerPoint presentation
                        </p>
                    </div>
                    <DownloadPPTX project={project} />
                </div>
            </div>

            {/* Slide Preview Container */}
            <div className="bg-white rounded-lg border">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Slide Preview
                    </h3>
                </div>

                {/* Scrollable Slides Container */}
                <div className="h-[70vh] overflow-y-auto bg-gray-100 p-6">
                    <div className="space-y-8">
                        {/* Show 6 slides that match the actual PowerPoint */}
                        {Array.from({ length: 6 }, (_, slideIndex) => (
                            <div key={slideIndex} className="mb-8">
                                {/* Slide Preview */}
                                <div className="bg-white rounded-lg shadow-lg mx-auto" style={{ minWidth: '800px', aspectRatio: '16/9' }}>
                                    {/* Remove the blue header to match actual slides */}
                                    <div className="p-6 pt-4 h-full flex flex-col">
                                        {/* Title at top with small margin */}
                                        {slideIndex > 0 && (
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                                {getSlideTitle(slideIndex)}
                                            </h3>
                                        )}
                                        
                                        {/* Slide Content */}
                                        <div className="flex-1">
                                            {renderSlideContent(slideIndex, project)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideDecks