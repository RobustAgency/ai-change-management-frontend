import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Video, Download, Edit, Play, Save, Clock } from "lucide-react"
import { VideoScript as VideoScriptType } from '../types'

interface VideoScriptProps {
    videoScript: VideoScriptType
}

const VideoScript = ({ videoScript }: VideoScriptProps) => {
    const [editingContent, setEditingContent] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (content: string) => {
        setEditingContent(content)
        setIsEditing(true)
    }

    const handleSave = () => {
        setIsEditing(false)
        // Save logic would go here
    }

    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="bg-indigo-600 text-white rounded-t-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <Video className="w-5 h-5" />
                            {videoScript.title}
                        </CardTitle>
                        <CardDescription className="text-indigo-100 mt-2 flex items-center gap-4">
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Duration: {videoScript.duration}
                            </span>
                            <span>{videoScript.wordCount} words</span>
                        </CardDescription>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">Ready</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {isEditing ? (
                    <div className="space-y-6">
                        <Textarea
                            value={editingContent || videoScript.content}
                            onChange={(e) => setEditingContent(e.target.value)}
                            rows={20}
                            className="font-mono text-sm"
                        />
                        <div className="flex gap-4">
                            <Button
                                onClick={handleSave}
                                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 h-12">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="bg-gray-50 p-6 rounded-lg border">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                                {videoScript.content}
                            </pre>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="flex-1 h-12 bg-transparent">
                                <Play className="w-4 h-4 mr-2" />
                                Preview Script
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-12 bg-transparent"
                                onClick={() => handleEdit(videoScript.content)}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Script
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download DOCX
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default VideoScript
