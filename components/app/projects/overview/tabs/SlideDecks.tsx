import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Edit, Eye } from "lucide-react"
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
                            Export all {slideDecks.length + 2} slides as a single PowerPoint presentation
                        </p>
                    </div>
                    <DownloadPPTX project={project} />
                </div>
            </div>

            {/* Slide Deck Cards */}
            <div className="grid gap-6">
                {slideDecks.map((deck) => (
                    <Card key={deck.id} className="border-0 shadow-sm bg-white">
                        <CardHeader className="bg-indigo-600 text-white rounded-t-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <FileText className="w-5 h-5" />
                                        {deck.title}
                                    </CardTitle>
                                    <CardDescription className="text-indigo-100 mt-2">
                                        {deck.slides} slides • Target: {deck.audience} • Modified{" "}
                                        {new Date(deck.lastModified).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <Badge className="bg-white/20 text-white border-white/30">Ready</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex gap-3 justify-end">
                                {/* Preview and Edit buttons commented out for now */}
                                {/* <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview Slides
                                </Button> */}
                                {/* <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Content
                                </Button> */}
                                <div className="text-sm text-gray-500 py-3">
                                    Included in complete presentation
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SlideDecks
