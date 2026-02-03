import React from 'react'
import { ProjectData } from '../../types'

interface Template2Props {
    project?: ProjectData
}

interface BenefitCard {
    title: string;
    bullet_list: string[];
}

interface StakeholderData {
    title: string;
    bullet_list: string[];
}

// Utility function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
    if (!text) return text;
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
};

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

// Template 2 - Blue Theme Design (matching reference images)
const renderTitleSlide = (project?: ProjectData) => {
    return (
        <div className="h-full flex bg-white relative">
            {/* Left side - main content area */}
            <div className="w-3/5 flex flex-col justify-center pl-12 pr-8">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                    Change<br />
                    Management<br />
                    Strategy
                </h1>
                {project?.name && (
                    <p className="text-lg text-gray-600 mt-6">
                        {decodeHtmlEntities(project.name)}
                    </p>
                )}
            </div>

            {/* Right side - blue/dark area matching reference */}
            <div className="w-2/5 bg-slate-700 relative"></div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderAgendaSlide = (project?: ProjectData) => {
    const agendaItems = [
        { number: '01', text: 'Executive Summary' },
        { number: '02', text: 'Benefits' },
        { number: '03', text: 'Key Stakeholders' },
        { number: '04', text: 'High Level Change Management Strategy' }
    ];

    return (
        <div className="space-y-8 p-6">
            <div className="space-y-6">
                {agendaItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-10">
                        <div className="text-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                            {item.number}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                {decodeHtmlEntities(item.text)}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderExecutiveSummarySlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const execSummaryData = (project?.ai_content as any)?.slides_content?.executive_summary_slide;

    return (
        <div className="space-y-6 p-6">
            {/* Main content area with blue header bar */}
            <div className="bg-white">
                <div className="text-lg bg-blue-100 p-6 text-gray-800 min-h-[300px]">
                    {decodeHtmlEntities(execSummaryData?.project_overview || 'This project represents a strategic initiative to transform our organization through effective change management practices.')}
                </div>
            </div>
        </div>
    )
}

const renderBenefitsSlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const benefitCards: BenefitCard[] = (project?.ai_content as any)?.slides_content?.benefits_slide?.benefit_cards || [];

    return (
        <div className="space-y-6 p-6">
            {/* Benefits grid - 3x2 layout matching reference image */}
            <div className="grid grid-cols-3 gap-6">
                {benefitCards.map((benefit: BenefitCard, index: number) => (
                    <div
                        key={index}
                        className="relative border-2 border-dashed border-blue-300 rounded-lg pt-6"
                    >
                        {/* Title Tab */}
                        <div className="absolute text-center -top-5 left-1/2 transform -translate-x-1/2 bg-[#08475E] text-white px-2 py-2 rounded-lg flex items-center justify-center shadow-md">
                            <h4 className="font-medium text-xs">{decodeHtmlEntities(benefit.title)}</h4>
                        </div>

                        {/* Inner Content */}
                        <div className="p-4 mt-2 text-sm text-gray-700 min-h-[100px]">
                            {benefit.bullet_list && benefit.bullet_list.length > 0 ? (
                                <ul className="space-y-1 list-disc pl-6">
                                    {benefit.bullet_list.slice(0, 3).map((item: string, itemIndex: number) => (
                                        <li key={itemIndex}>{decodeHtmlEntities(item)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 italic">No benefits listed</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

const renderStakeholdersSlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stakeholdersData: StakeholderData[] = (project?.ai_content as any)?.slides_content?.key_stakeholders_slide?.stakeholder_table || [
        { title: 'Stakeholder Group 1', bullet_list: ['List', 'List'] },
        { title: 'Stakeholder Group 2', bullet_list: ['List', 'List'] },
        { title: 'Stakeholder Group 3', bullet_list: ['List', 'List'] },
        { title: 'Stakeholder Group 4', bullet_list: ['List', 'List'] },
        { title: 'Stakeholder Group 5', bullet_list: ['List', 'List'] },
        { title: 'Stakeholder Group 6', bullet_list: ['List', 'List'] }
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Stakeholder grid - 3x2 layout matching reference image */}
            <div className="grid grid-cols-3 gap-4">
                {stakeholdersData.map((stakeholder: StakeholderData, index: number) => {
                    return (
                        <div key={index}>
                            {/* Header */}
                            <div className="bg-[#08475E] text-white p-3 text-center">
                                <h4 className="font-semibold text-sm text-white">
                                    {decodeHtmlEntities(stakeholder?.title || `Stakeholder Group ${index + 1}`)}
                                </h4>
                            </div>

                            {/* Content area */}
                            <div className="bg-[#08475E] text-white p-3">
                                {stakeholder?.bullet_list && stakeholder.bullet_list.length > 0 ? (
                                    <ul className="space-y-1">
                                        {stakeholder.bullet_list.slice(0, 2).map((item: string, itemIndex: number) => (
                                            <li key={itemIndex} className="text-xs text-white">
                                                • {decodeHtmlEntities(item)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-white opacity-70">No items listed</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

const renderStrategySlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const strategyData = (project?.ai_content as any)?.slides_content?.change_management_strategy_slide;
    const numbersList = strategyData?.numbers_list || [
        'Create the Case for Change & Define The Why',
        'Identify Impacted Teams',
        'Establish Communications',
        'Complete Impact Analyses',
        'Define Success Criteria'
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Two-column layout matching reference image */}
            <div className="flex h-full">
                {/* Left column - Dark blue/teal with white text */}
                <div className="w-1/2 bg-[#08475E] text-white p-8 flex flex-col">
                    <h3 className="text-2xl font-bold mb-8 text-white">Change Management Strategy</h3>

                    {/* Numbered list */}
                    <div className="space-y-6 flex-1">
                        {numbersList.slice(0, 5).map((item: string, index: number) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className=" text-[white] w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-white leading-tight">
                                        {decodeHtmlEntities(item)}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column - Light blue background */}
                <div className="w-1/2 bg-blue-200">
                    {/* Empty space as shown in reference */}
                </div>
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