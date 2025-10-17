"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/ui/spinner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Plus,
    Search,
    MoreVertical,
    FileText,
    Calendar,
    Edit,
    Trash2,
    Clock,
    Target,
    RefreshCcw,
} from "lucide-react"
import Link from "next/link"
import { useProjects } from "@/hooks/app/useProjects"
import ConfirmationDialog from "@/components/custom/ConfirmationDialog"
import AIContentGenerationModal from "@/components/custom/AIContentGenerationModal"
import type { Project } from "@/interfaces/Project"

const SkeletonList = ({ count = 3 }: { count?: number }) => (
    <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse border rounded-lg p-6 bg-gray-50">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="flex gap-2">
                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
            </div>
        ))}
    </div>
)

const Projects = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
    const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false)
    const [projectToGenerate, setProjectToGenerate] = useState<Project | null>(null)
    const { projects, loading, deleteLoading, fetchProjects, deleteProject } = useProjects()

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim()) {
                fetchProjects({ term: searchTerm })
            } else {
                fetchProjects()
            }
        }, 500)
        return () => clearTimeout(timeout)
    }, [searchTerm, fetchProjects])

    const handleDeleteProject = async (id: number) => {
        const success = await deleteProject(id.toString())
        if (success) {
            fetchProjects()
            setIsDeleteDialogOpen(false)
            setProjectToDelete(null)
        }
    }

    const openDeleteDialog = (project: Project) => {
        setProjectToDelete(project)
        setIsDeleteDialogOpen(true)
    }

    const closeDeleteDialog = () => {
        if (!deleteLoading) {
            setIsDeleteDialogOpen(false)
            setProjectToDelete(null)
        }
    }

    const openGenerationModal = (project: Project) => {
        setProjectToGenerate(project)
        setIsGenerationModalOpen(true)
    }

    const closeGenerationModal = () => {
        setIsGenerationModalOpen(false)
        setProjectToGenerate(null)
        fetchProjects()
    }

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "completed":
                return { color: "bg-green-100 text-green-800 border-green-200", label: "Completed", dot: "bg-green-500" }
            case "approved":
                return { color: "bg-indigo-100 text-indigo-800 border-indigo-200", label: "Approved", dot: "bg-indigo-500" }
            case "draft":
                return { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Draft", dot: "bg-gray-500" }
            default:
                return { color: "bg-gray-100 text-gray-800 border-gray-200", label: status, dot: "bg-gray-500" }
        }
    }

    const getStakeholdersText = (stakeholders?: Project['stakeholders']) => {
        if (!stakeholders || stakeholders.length === 0) return "No stakeholders"
        return `${stakeholders.length} stakeholder${stakeholders.length > 1 ? "s" : ""}`
    }

    const getAssetButtonConfig = (project: Project) => {
        const { content_generation_status, status } = project

        // When content_generation_status is pending
        if (content_generation_status === 'pending') {
            if (status === 'draft') {
                return {
                    text: "Edit Project",
                    href: `/projects/${project.id}`,
                    type: 'edit' as const
                }
            }
            if (status === 'approved') {
                return {
                    text: "Generate Content",
                    type: 'generate' as const
                }
            }
        }

        // When content_generation_status is in_progress
        if (content_generation_status === 'in_progress') {
            return {
                text: "Generating",
                disabled: true,
                loading: true,
                type: 'generating' as const
            }
        }

        // When content_generation_status is completed
        if (content_generation_status === 'completed') {
            return {
                text: "View Assets",
                href: `/projects/overview/${project.id}`,
                type: 'view' as const
            }
        }

        // When content_generation_status is failed, treat like pending
        if (content_generation_status === 'failed') {
            if (status === 'draft') {
                return {
                    text: "Edit Project",
                    href: `/projects/${project.id}`,
                    type: 'edit' as const
                }
            }
            if (status === 'approved') {
                return {
                    text: "Generate Content",
                    type: 'generate' as const
                }
            }
        }

        // Default case
        return {
            text: "View Assets",
            href: `/projects/overview/${project.id}`,
            type: 'view' as const
        }
    }

    const projectsData = projects?.data || []

    return (
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Your Projects</CardTitle>
                        <CardDescription>Manage and track your change communication projects</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Link href="/projects/create">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white active:scale-90 duration-200">
                                <Plus className="w-4 h-4 mr-2" /> New Project
                            </Button>
                        </Link>
                        <Button
                            onClick={() => fetchProjects()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white active:scale-90 duration-200">
                            <RefreshCcw />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <SkeletonList count={3} />
                ) : projectsData.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {searchTerm ? "Try different keywords." : "Create your first project to get started."}
                        </p>
                        {!searchTerm && (
                            <Link href="/projects/create">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <Plus className="w-4 h-4 mr-2" /> Create Project
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projectsData.map((project: Project) => {
                            const status = getStatusConfig(project.status)
                            const stakeholdersText = getStakeholdersText(project.stakeholders)
                            const buttonConfig = getAssetButtonConfig(project)

                            // Determine card click behavior
                            const getCardClickBehavior = () => {
                                // When status is draft, redirect to edit page
                                if (project.status === 'draft') {
                                    return {
                                        type: 'link',
                                        href: `/projects/${project.id}`,
                                        clickable: true
                                    }
                                }

                                // When content_generation_status is pending and status is approved, open modal
                                if (project.content_generation_status === 'pending' && project.status === 'approved') {
                                    return {
                                        type: 'modal',
                                        clickable: true
                                    }
                                }

                                // When content_generation_status is completed, redirect to overview
                                if (project.content_generation_status === 'completed') {
                                    return {
                                        type: 'link',
                                        href: `/projects/overview/${project.id}`,
                                        clickable: true
                                    }
                                }

                                // Default: not clickable
                                return {
                                    type: 'none',
                                    clickable: false
                                }
                            }

                            const cardBehavior = getCardClickBehavior()

                            const CardContent = () => (
                                <div className={`border rounded-lg p-6 hover:shadow-md bg-gray-50 ${cardBehavior.clickable ? 'cursor-pointer' : ''}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                                <Badge className={`${status.color} border text-xs font-medium`}>
                                                    <span className={`w-2 h-2 rounded-full ${status.dot} mr-2`}></span>
                                                    {status.label}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" /> Created{" "}
                                                    {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> Modified{" "}
                                                    {project.updated_at ? new Date(project.updated_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-gray-500" />
                                                    <span>{stakeholdersText}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-gray-500" />{" "}
                                                    <span>Launch: {new Date(project.launch_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {project.status == "draft" && (
                                                    <Link href={`/projects/${project.id}`}>
                                                        <DropdownMenuItem>
                                                            <Edit className="w-4 h-4 mr-2" /> Edit Project
                                                        </DropdownMenuItem>
                                                    </Link>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openDeleteDialog(project)
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2 text-red-600" />{" "}
                                                    <span className="text-red-600">Delete Project</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {project.stakeholders?.map((stake, i) => (
                                                <Badge key={i} className="text-xs bg-white">
                                                    {stake.name || stake.department || `Stakeholder ${i + 1}`}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            {(() => {
                                                if (buttonConfig.href) {
                                                    return (
                                                        <Link href={buttonConfig.href}>
                                                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                                                {buttonConfig.type === 'edit' ? (
                                                                    <Edit className="w-4 h-4 mr-2" />
                                                                ) : (
                                                                    <FileText className="w-4 h-4 mr-2" />
                                                                )}
                                                                {buttonConfig.text}
                                                            </Button>
                                                        </Link>
                                                    )
                                                }

                                                return (
                                                    <Button
                                                        size="sm"
                                                        className={`bg-indigo-600 disabled:bg-indigo-600 hover:bg-indigo-700 text-white ${buttonConfig.disabled ? 'cursor-auto' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            if (buttonConfig.type === 'generate' || !buttonConfig.disabled) {
                                                                openGenerationModal(project)
                                                            }
                                                        }}
                                                    >
                                                        {buttonConfig.loading ? (
                                                            ""
                                                        ) : (
                                                            <FileText className="w-4 h-4 mr-2" />
                                                        )}
                                                        {buttonConfig.text}
                                                        {buttonConfig.loading ? (
                                                            <div className="loader"></div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </Button>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )

                            const handleCardClick = () => {
                                if (cardBehavior.type === 'modal') {
                                    openGenerationModal(project)
                                }
                            }

                            return (
                                <div key={project.id}>
                                    {cardBehavior.type === 'link' && cardBehavior.href ? (
                                        <Link href={cardBehavior.href}>
                                            <CardContent />
                                        </Link>
                                    ) : cardBehavior.type === 'modal' ? (
                                        <div onClick={handleCardClick}>
                                            <CardContent />
                                        </div>
                                    ) : (
                                        <CardContent />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>

            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                onConfirm={() => projectToDelete && handleDeleteProject(projectToDelete.id!)}
                title="Delete Project"
                description={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete Project"
                cancelText="Cancel"
                type="danger"
                isLoading={deleteLoading}
                loadingText="Deleting"
            />

            <AIContentGenerationModal
                isOpen={isGenerationModalOpen}
                projectId={projectToGenerate?.id}
                onCancel={closeGenerationModal}
                projectName={projectToGenerate?.name}
            />
        </Card>
    )
}

export default Projects
