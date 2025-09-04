import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Edit, Eye } from "lucide-react"
import { SlideDeck } from '../types'

interface SlideDecksProps {
    slideDecks: SlideDeck[]
}

const SlideDecks = ({ slideDecks }: SlideDecksProps) => {
    return (
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
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Slides
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Content
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PPTX
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default SlideDecks
