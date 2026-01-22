import React from 'react'
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { SlideDeck, ProjectData } from '../types'
import dynamic from 'next/dynamic'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'

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
            <div className="loader"></div>
        </Button>
    )
})

interface SlideDecksProps {
    slideDecks: SlideDeck[]
    project?: ProjectData
}

// Get the appropriate template component based on template_id
const getTemplate = (templateId: number, project?: ProjectData) => {
    switch (templateId) {
        case 2:
            return Template2({ project });
        case 3:
            return Template3({ project });
        default:
            return Template1({ project });
    }
}

const SlideDecks = ({ project }: SlideDecksProps) => {
    // Get the template based on project template_id (default to 1)
    const templateId = project?.template_id || 1;
    const template = getTemplate(templateId, project);

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
                        {/* Show slides based on template */}
                        {Array.from({ length: template.slideCount }, (_, slideIndex) => (
                            <div key={slideIndex} className="mb-8">
                                {/* Slide Preview */}
                                <div className="bg-white rounded-lg shadow-lg mx-auto" style={{ minWidth: '800px', aspectRatio: '16/9' }}>
                                    <div className="p-6 pt-4 h-full flex flex-col">
                                        {/* Title at top with small margin */}
                                        {slideIndex > 0 && (
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                                {template.getSlideTitle(slideIndex)}
                                            </h3>
                                        )}

                                        {/* Slide Content */}
                                        <div className="flex-1">
                                            {template.renderSlideContent(slideIndex)}
                                        </div>
                                        
                                        {/* Copyright Footer */}
                                        <div className="mt-auto pt-4 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 text-center">
                                                (c)2025 Life Vision, LLC - Innovative Dialogs(R)
                                            </p>
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