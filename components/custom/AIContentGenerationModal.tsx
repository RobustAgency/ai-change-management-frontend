"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { projectService } from "@/service/app/projects"
import { toast } from "react-toastify"

interface AIContentGenerationModalProps {
    isOpen: boolean
    projectId?: number
    onGenerate?: () => Promise<boolean>
    onCancel: () => void
    isLoading?: boolean
    projectName?: string
}

const AIContentGenerationModal = ({
    isOpen,
    projectId,
    onGenerate,
    onCancel,
    isLoading = false,
    projectName = "this project"
}: AIContentGenerationModalProps) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [generating, setGenerating] = useState(false)

    // Reset states when modal opens/closes
    const handleCancel = () => {
        setIsGenerating(false)
        setGenerating(false)
        onCancel()
    }

    // Reset states when modal is closed
    useEffect(() => {
        if (!isOpen) {
            setIsGenerating(false)
            setGenerating(false)
        }
    }, [isOpen])

    const handleGenerate = async () => {
        try {
            setGenerating(true)
            let success = false

            // If onGenerate prop is provided, use it (for backward compatibility)
            if (onGenerate) {
                success = await onGenerate()
            }
            // Otherwise, use the built-in API call with projectId
            else if (projectId) {
                const response = await projectService.generateContent(projectId.toString())
                success = response && response.error === false
                if (!success) {
                    const errorMessage = response?.message || 'Failed to generate content'
                    toast.error(errorMessage)
                }
            } else {
                toast.error('No project ID provided for content generation')
                return
            }

            if (success) {
                setIsGenerating(true)
                toast.success('Content generation started successfully!')
                setTimeout(() => {
                    handleCancel()
                }, 3000)
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to generate content'
            toast.error(errorMessage)
        } finally {
            setGenerating(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { }} modal={true}>
            <DialogContent
                className="sm:max-w-[500px] border-0 shadow-xl"
                showCloseButton={false}
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="text-center pb-4">
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                        Generate AI Content
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 mt-2">
                        Ready to generate AI-powered change management content for <strong>{projectName}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {isGenerating ? (
                        // Success message with countdown
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div className="text-sm text-green-800">
                                    <p className="font-medium mb-1">Content Generation Started!</p>
                                    <p>Your content is being generated. Please check in a while.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Warning message for normal state
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div className="text-sm text-amber-800">
                                    <p className="font-medium mb-1">Important Notice:</p>
                                    <p>Once AI content is generated, you won&apos;t be able to edit the project details. Make sure all project information is accurate before proceeding.</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <DialogFooter className="gap-3">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading || generating || isGenerating}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading || generating || isGenerating}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isLoading || generating ? (
                            <>
                                Generating...
                            </>
                        ) : isGenerating ? (
                            <>
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Content
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AIContentGenerationModal