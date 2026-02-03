import React from 'react'
import { ProjectData } from '../../types'

interface Template3Props {
    project?: ProjectData
}

interface BenefitCard {
    title: string;
    bullet_list?: string[];
}

interface StakeholderData {
    title: string;
    stakeholder_name?: string;
    bullet_list?: string[];
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
        'Key Stakeholders',
        'Change Management Strategy'
    ];

    return slideNames[slideIndex] || `Slide ${slideIndex + 1}`;
}

// Template 3 - Clean Design (matches reference images)
const renderTitleSlide = () => {
    return (
        <div className="h-full flex bg-white">
            {/* Left side - white background with title */}
            <div className="w-1/2 flex flex-col justify-center pl-8">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight">
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

const renderAgendaSlide = () => {
    const agendaItems = [
        { number: '•', text: 'Executive Summary' },
        { number: '•', text: 'Benefits' },
        { number: '•', text: 'Key Stakeholders' },
        { number: '•', text: 'High-Level Change Management Strategy' }
    ];

    return (
        <div className="space-y-6 p-8">
            {agendaItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-800">
                        {item.number}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {decodeHtmlEntities(item.text)}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

const renderExecutiveSummarySlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const execSummaryData = (project?.ai_content as any)?.slides_content?.executive_summary_slide;
    const executiveSummary = execSummaryData?.project_overview;
    const decodedSummary = decodeHtmlEntities(executiveSummary || 'Executive summary content will be displayed here.');

    return (
        <div className="p-8 space-y-6">
            {/* Simple bordered box matching reference image */}
            <div className="border-2 border-gray-300 rounded-lg p-8 min-h-[300px]">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Project Overview:</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                    {decodedSummary}
                </p>
            </div>
        </div>
    )
}

const renderBenefitsSlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const benefitCards: BenefitCard[] = (project?.ai_content as any)?.slides_content?.benefits_slide?.benefit_cards || [];

    // Default benefits if none provided (matching reference image - 8 benefits in 2 columns)
    const defaultBenefits = [
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' },
        { title: 'Benefit' }
    ];

    const benefits = benefitCards.length > 0 ? benefitCards : defaultBenefits;

    return (
        <div className="p-8">
            <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                {benefits.slice(0, 8).map((benefit: BenefitCard, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800">
                                {benefit.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderStakeholdersSlide = (project?: ProjectData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stakeholderTable: StakeholderData[] = (project?.ai_content as any)?.slides_content?.key_stakeholders_slide?.stakeholder_table || [];

    // Default stakeholders if none provided (matching reference image - 6 stakeholders in 2 columns)
    const defaultStakeholders = [
        { title: 'Stakeholder Group' },
        { title: 'Stakeholder Group' },
        { title: 'Stakeholder Group' },
        { title: 'Stakeholder Group' },
        { title: 'Stakeholder Group' },
        { title: 'Stakeholder Group' }
    ];

    const stakeholders = stakeholderTable.length > 0 ? stakeholderTable : defaultStakeholders;

    return (
        <div className="p-8">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="space-y-4">
                        {stakeholders.slice(0, 3).map((stakeholder: StakeholderData, index: number) => (
                            <div key={index} className="relative">
                                {/* Arrow shape with lighter colors for items 2 & 3 */}
                                <div className={`${index === 0 ? 'bg-[#8296B0]' : 'bg-gray-300'} text-white px-6 py-4 flex items-center gap-4`}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                                    }}>
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-xl">{index + 1}</span>
                                    </div>
                                    <h4 className={`text-base font-semibold ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                                        {stakeholder.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="space-y-4">
                        {stakeholders.slice(3, 6).map((stakeholder: StakeholderData, index: number) => (
                            <div key={index} className="relative">
                                {/* Arrow shape with lighter colors for items 2 & 3 */}
                                <div className={`${index === 0 ? 'bg-[#8296B0]' : 'bg-gray-300'} text-white px-6 py-4 flex items-center gap-4`}
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                                    }}>
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-xl">{index + 4}</span>
                                    </div>
                                    <h4 className={`text-base font-semibold ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                                        {stakeholder.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderStrategySlide = (project?: ProjectData) => {
    const strategyData = (project?.ai_content as { slides_content?: { change_management_strategy_slide?: { heading?: string; proposed_ocm_approach?: unknown } } })?.slides_content?.change_management_strategy_slide;
    const heading = strategyData?.heading || 'Enable stakeholder understanding, readiness, and adoption by reinforcing the change through leadership alignment, manager engagement, and ongoing reinforcement.';

    // Default OCM data matching reference image
    const defaultApproach = [
        {
            activity: 'Executive Sponsorship',
            approach: 'Active, visible support, lead the vision'
        },
        {
            activity: 'Leadership Enablement',
            approach: 'Leader toolkits'
        },
        {
            activity: 'Stakeholder Engagement',
            approach: 'Identify impacted departments\nClarify the Why? and impacts to their daily work'
        },
        {
            activity: 'Feedback Loops',
            approach: 'Create two-way channels for addressing issues, asking questions, mitigating resistance, and training resources'
        },
        {
            activity: 'Adoption Support',
            approach: 'Monitor readiness throughout via surveys, pulse checks, interviews, or formal assessments'
        }
    ];

    return (
        <div className="p-8 space-y-6">
            {/* Heading */}
            <p className="text-sm leading-relaxed text-gray-700">
                {heading}
            </p>

            {/* Table Header */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Proposed OCM Approach</h3>

                {/* Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Activity</th>
                            <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Approach</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defaultApproach.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-900 font-medium">
                                    {item.activity}
                                </td>
                                <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                                    {item.approach}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const renderSlideContent = (slideIndex: number, project?: ProjectData) => {
    switch (slideIndex) {
        case 0:
            return renderTitleSlide();
        case 1:
            return renderAgendaSlide();
        case 2:
            return renderExecutiveSummarySlide(project);
        case 3:
            return renderBenefitsSlide(project);
        case 4:
            return renderStakeholdersSlide(project);
        case 5:
            return renderStrategySlide(project);
        default:
            return <div>Slide content not available</div>;
    }
}

const Template3 = ({ project }: Template3Props) => {
    return {
        slideCount: 6,
        getSlideTitle,
        renderSlideContent: (slideIndex: number) => renderSlideContent(slideIndex, project)
    }
}

export default Template3