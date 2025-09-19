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

// Helper function to generate slide titles
const getSlideTitle = (deck: SlideDeck, slideIndex: number): string => {
    const titles = {
        'Executive Summary': [
            'Project Overview',
            'Business Impact',
            'Key Success Metrics',
            'Implementation Timeline'
        ],
        'Stakeholder Analysis': [
            'Stakeholder Mapping',
            'Impact Assessment',
            'Communication Strategy',
            'Engagement Plan'
        ],
        'Change Management Strategy': [
            'Change Framework',
            'Implementation Phases',
            'Risk Mitigation',
            'Success Metrics'
        ],
        'Communication Plan': [
            'Communication Channels',
            'Key Messages',
            'Timeline & Milestones',
            'Feedback Mechanisms'
        ]
    }

    // Find matching deck type
    const deckType = Object.keys(titles).find(key =>
        deck.title.toLowerCase().includes(key.toLowerCase())
    ) as keyof typeof titles

    if (deckType && titles[deckType][slideIndex]) {
        return titles[deckType][slideIndex]
    }

    return `${deck.title} - Slide ${slideIndex + 1}`
}

// Helper function to render slide content
const renderSlideContent = (deck: SlideDeck, slideIndex: number, project?: ProjectData) => {
    if (deck.title.toLowerCase().includes('executive')) {
        return renderExecutiveSummarySlide(slideIndex, project)
    } else if (deck.title.toLowerCase().includes('stakeholder')) {
        return renderStakeholderSlide(slideIndex, project)
    } else if (deck.title.toLowerCase().includes('strategy')) {
        return renderStrategySlide(slideIndex, project)
    } else if (deck.title.toLowerCase().includes('communication')) {
        return renderCommunicationSlide(slideIndex, project)
    }

    return renderDefaultSlide(slideIndex, project)
}

const renderExecutiveSummarySlide = (slideIndex: number, project?: ProjectData) => {
    const aiContent = project?.ai_content?.slides_content

    const slides = [
        // Executive Summary
        <div key="executive-0" className="space-y-4">
            <div className="space-y-4">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Executive Summary</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {aiContent?.executive_summary || "No executive summary available"}
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Project Details</h4>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Project:</strong> {project?.name || "N/A"}</p>
                        <p><strong>Organization:</strong> {project?.client_organization || "N/A"}</p>
                        <p><strong>Launch Date:</strong> {project?.launch_date ? new Date(project.launch_date).toLocaleDateString() : "N/A"}</p>
                        <p><strong>Status:</strong> {project?.status || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>,

        // Benefits
        <div key="benefits-1" className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h4>
            <div className="space-y-2">
                {aiContent?.benefits && aiContent.benefits.length > 0 ? (
                    aiContent.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">{idx + 1}.</span>
                            <span className="text-gray-700">{benefit}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No benefits data available</p>
                )}
            </div>
        </div>,

        // Business Goals
        <div key="goals-2" className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Business Goals</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
                {project?.business_goals || "No business goals specified"}
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-3">Expected Outcomes</h4>
            <p className="text-gray-700 leading-relaxed">
                {project?.expected_outcomes || "No expected outcomes specified"}
            </p>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderStakeholderSlide = (slideIndex: number, project?: ProjectData) => {
    const stakeholders = project?.stakeholders || []
    const keyStakeholders = project?.ai_content?.slides_content?.key_stakeholders || []

    const slides = [
        // Stakeholder Analysis
        <div key="stakeholders-0" className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Stakeholder Analysis</h4>

            <div className="space-y-4">
                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Project Stakeholders</h5>
                    {stakeholders.length > 0 ? (
                        <div className="space-y-2">
                            {stakeholders.map((stakeholder, idx) => (
                                <div key={idx} className="text-gray-700">
                                    <strong>{stakeholder.name}</strong> - {stakeholder.department} ({stakeholder.role_level})
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No stakeholder data available</p>
                    )}
                </div>

                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Key Stakeholders</h5>
                    {keyStakeholders.length > 0 ? (
                        <div className="space-y-1">
                            {keyStakeholders.map((stakeholder, idx) => (
                                <div key={idx} className="text-gray-700">
                                    • {stakeholder}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No key stakeholder data available</p>
                    )}
                </div>

                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Project Sponsor</h5>
                    <div className="text-gray-700">
                        <p><strong>Name:</strong> {project?.sponsor_name || "Not specified"}</p>
                        <p><strong>Title:</strong> {project?.sponsor_title || "Not specified"}</p>
                    </div>
                </div>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderStrategySlide = (slideIndex: number, project?: ProjectData) => {
    const strategy = project?.ai_content?.slides_content?.change_management_strategy || "No strategy available"

    const slides = [
        // Change Management Strategy
        <div key="strategy-0" className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Change Management Strategy</h4>
            <p className="text-gray-700 leading-relaxed">
                {strategy}
            </p>

            <div className="mt-4">
                <h5 className="text-md font-semibold text-gray-700 mb-2">Project Summary</h5>
                <p className="text-gray-700 leading-relaxed">
                    {project?.summary || "No project summary available"}
                </p>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderCommunicationSlide = (slideIndex: number, project?: ProjectData) => {
    const slides = [
        // Communication Plan
        <div key="communication-0" className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Communication Plan</h4>

            <div className="space-y-3">
                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Email Updates</h5>
                    <p className="text-gray-700">Regular progress reports and milestone announcements</p>
                </div>

                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Town Hall Meetings</h5>
                    <p className="text-gray-700">Monthly all-hands meetings for transparency and updates</p>
                </div>

                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Training Sessions</h5>
                    <p className="text-gray-700">Hands-on workshops and skill development programs</p>
                </div>

                <div>
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Timeline</h5>
                    <div className="space-y-1 text-gray-700">
                        <p>• Week 1-2: Initial announcement</p>
                        <p>• Week 3-4: Training begins</p>
                        <p>• Week 5-8: Implementation phase</p>
                        <p>• Week 9+: Follow-up and support</p>
                    </div>
                </div>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderDefaultSlide = (slideIndex: number, project?: ProjectData) => {
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
    console.log("slideDecks", slideDecks)
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
                        {slideDecks.map((deck, deckIndex) => (
                            <div key={deck.id} className="space-y-6">
                                {/* Section Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                                        {deckIndex + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{deck.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            {deck.slides} slides • Target: {deck.audience}
                                        </p>
                                    </div>
                                </div>

                                {/* Slides for this deck */}
                                {Array.from({ length: deck.slides }, (_, slideIndex) => (
                                    <div key={slideIndex} className="mb-8">
                                        {/* Slide Preview */}
                                        <div className="bg-white rounded-lg shadow-lg mx-auto" style={{ width: '800px', height: '450px', aspectRatio: '16/9' }}>
                                            {/* Slide Header */}
                                            <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-bold">
                                                        {getSlideTitle(deck, slideIndex)}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Slide Content */}
                                            <div className="p-6 h-full">
                                                {renderSlideContent(deck, slideIndex, project)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideDecks
