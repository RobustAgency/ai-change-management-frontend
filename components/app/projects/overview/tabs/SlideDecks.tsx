import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download } from "lucide-react"
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
const renderSlideContent = (deck: SlideDeck, slideIndex: number) => {
    if (deck.title.toLowerCase().includes('executive')) {
        return renderExecutiveSummarySlide(slideIndex)
    } else if (deck.title.toLowerCase().includes('stakeholder')) {
        return renderStakeholderSlide(slideIndex)
    } else if (deck.title.toLowerCase().includes('strategy')) {
        return renderStrategySlide(slideIndex)
    } else if (deck.title.toLowerCase().includes('communication')) {
        return renderCommunicationSlide(slideIndex)
    }

    return renderDefaultSlide(slideIndex)
}

const renderExecutiveSummarySlide = (slideIndex: number) => {
    const slides = [
        // Project Overview
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Project Scope</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            Digital transformation initiative
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            Cross-functional team alignment
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            Process optimization
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Objectives</h4>
                    <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-medium text-blue-800">Efficiency</div>
                            <div className="text-sm text-blue-600">Improve operational efficiency by 30%</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-medium text-green-800">Adoption</div>
                            <div className="text-sm text-green-600">Achieve 95% user adoption rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Business Impact
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">$2.5M</div>
                    <div className="text-sm text-blue-800">Annual Savings</div>
                </div>
                <div className="text-center bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">30%</div>
                    <div className="text-sm text-green-800">Efficiency Gain</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">500+</div>
                    <div className="text-sm text-purple-800">Users Impacted</div>
                </div>
            </div>
            <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Expected Benefits</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="text-sm text-gray-600">Process Automation: 85%</div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <div className="text-sm text-gray-600">Cost Reduction: 70%</div>
                    </div>
                </div>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderStakeholderSlide = (slideIndex: number) => {
    const slides = [
        // Stakeholder Mapping
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">High Impact</h4>
                    <div className="space-y-3">
                        <div className="bg-red-50 border-l-4 border-red-400 p-3">
                            <div className="font-medium text-red-800">Executive Leadership</div>
                            <div className="text-sm text-red-600">CEO, CTO, Department Heads</div>
                        </div>
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
                            <div className="font-medium text-orange-800">Project Managers</div>
                            <div className="text-sm text-orange-600">Direct project oversight</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Medium Impact</h4>
                    <div className="space-y-3">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                            <div className="font-medium text-yellow-800">End Users</div>
                            <div className="text-sm text-yellow-600">Daily system interaction</div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                            <div className="font-medium text-blue-800">IT Support</div>
                            <div className="text-sm text-blue-600">Technical implementation</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderStrategySlide = (slideIndex: number) => {
    const slides = [
        // Change Framework
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">8-Step Change Process</h4>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[
                    { step: 1, title: 'Urgency', color: 'bg-red-100 text-red-800' },
                    { step: 2, title: 'Coalition', color: 'bg-orange-100 text-orange-800' },
                    { step: 3, title: 'Vision', color: 'bg-yellow-100 text-yellow-800' },
                    { step: 4, title: 'Communicate', color: 'bg-green-100 text-green-800' }
                ].map((item, idx) => (
                    <div key={idx} className={`${item.color} p-4 rounded-lg text-center`}>
                        <div className="text-2xl font-bold">{item.step}</div>
                        <div className="text-sm font-medium">{item.title}</div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {[
                    { step: 5, title: 'Empower', color: 'bg-blue-100 text-blue-800' },
                    { step: 6, title: 'Wins', color: 'bg-indigo-100 text-indigo-800' },
                    { step: 7, title: 'Sustain', color: 'bg-purple-100 text-purple-800' },
                    { step: 8, title: 'Anchor', color: 'bg-pink-100 text-pink-800' }
                ].map((item, idx) => (
                    <div key={idx} className={`${item.color} p-4 rounded-lg text-center`}>
                        <div className="text-2xl font-bold">{item.step}</div>
                        <div className="text-sm font-medium">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderCommunicationSlide = (slideIndex: number) => {
    const slides = [
        // Communication Channels
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Email Updates</h5>
                    <p className="text-sm text-gray-600">Weekly progress reports</p>
                </div>
                <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-500 rounded"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Town Halls</h5>
                    <p className="text-sm text-gray-600">Monthly all-hands meetings</p>
                </div>
                <div className="text-center">
                    <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Training</h5>
                    <p className="text-sm text-gray-600">Hands-on workshops</p>
                </div>
            </div>
        </div>
    ]

    return slides[slideIndex] || slides[0]
}

const renderDefaultSlide = (slideIndex: number) => {
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
                                                    <div className="text-sm opacity-75">
                                                        Slide {slideIndex + 1} of {deck.slides}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Slide Content */}
                                            <div className="p-6 h-full">
                                                {renderSlideContent(deck, slideIndex)}
                                            </div>
                                        </div>

                                        {/* Slide Number Indicator */}
                                        <div className="text-center mt-2 text-sm text-gray-500">
                                            {deck.title} - Slide {slideIndex + 1}
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
