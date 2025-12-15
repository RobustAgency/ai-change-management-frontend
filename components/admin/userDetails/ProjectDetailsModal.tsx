"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, Clock, Target, Building } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import type { Project } from '@/interfaces/Project'

interface ProjectDetailsModalProps {
    project: Project
}

const ProjectDetailsModal = ({ project }: ProjectDetailsModalProps) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "completed":
                return { color: "bg-green-100 text-green-800 border-green-200", label: "Completed", dot: "bg-green-500" }
            case "in-progress":
            case "active":
                return { color: "bg-indigo-100 text-indigo-800 border-indigo-200", label: "In Progress", dot: "bg-indigo-500" }
            case "draft":
                return { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Draft", dot: "bg-gray-500" }
            case "cancelled":
                return { color: "bg-red-100 text-red-800 border-red-200", label: "Cancelled", dot: "bg-red-500" }
            default:
                return { color: "bg-gray-100 text-gray-800 border-gray-200", label: status, dot: "bg-gray-500" }
        }
    }

    const status = getStatusConfig(project.status)

    return (
        <DialogContent className="lg:min-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <div className="flex items-center flex-wrap  gap-3 mb-2">
                    <DialogTitle className="text-left text-base lg:text-xl font-semibold text-gray-900">
                        {project.name}
                    </DialogTitle>
                    <Badge className={`${status.color} border text-xs font-medium`}>
                        <span className={`w-2 h-2 rounded-full ${status.dot} mr-2`}></span>
                        {status.label}
                    </Badge>
                </div>
                <DialogDescription className='text-left'>
                    Complete project details and information
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                {/* Project Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Created</p>
                            <p className="text-sm font-medium">
                                {project.created_at ? formatDate(project.created_at) : 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Modified</p>
                            <p className="text-sm font-medium">
                                {project.updated_at ? formatDate(project.updated_at) : 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Launch Date</p>
                            <p className="text-sm font-medium">
                                {project.launch_date ? formatDate(project.launch_date) : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Project Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.type && (
                        <Badge variant="outlined" color="default" className="capitalize rounded-sm text-xs">
                            {project.type}
                        </Badge>
                    )}
                    {project.client_organization && (
                        <Badge variant="outlined" color="default" className="capitalize rounded-sm text-xs">
                            <Building className="w-3 h-3 mr-1" />
                            {project.client_organization}
                        </Badge>
                    )}
                    {project.template_id && (
                        <Badge variant="outlined" color="default" className="capitalize rounded-sm text-xs">
                            Template #{project.template_id}
                        </Badge>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Project Content */}
                    <div className="space-y-4">
                        {project.summary && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Project Summary</h4>
                                <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-lg border">
                                    {project.summary}
                                </p>
                            </div>
                        )}

                        {project.business_goals && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Business Goals</h4>
                                <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-lg border">
                                    {project.business_goals}
                                </p>
                            </div>
                        )}

                        {project.expected_outcomes && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Expected Outcomes</h4>
                                <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-lg border">
                                    {project.expected_outcomes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - People & Organization */}
                    <div className="space-y-4">
                        {/* Project Sponsor */}
                        {(project.sponsor_name || project.sponsor_title) && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Project Sponsor</h4>
                                <div className="bg-white p-4 rounded-lg border">
                                    {project.sponsor_name && (
                                        <p className="font-medium text-gray-900 text-sm">
                                            {project.sponsor_name}
                                        </p>
                                    )}
                                    {project.sponsor_title && (
                                        <p className="text-sm text-gray-600">
                                            {project.sponsor_title}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {project.stakeholders && project.stakeholders.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Stakeholders 
                                </h4>
                                <div className="space-y-2">
                                    {project.stakeholders.map((stakeholder, index) => (
                                        <div key={index} className="bg-white p-3 rounded-lg border">
                                            <p className="font-medium text-gray-900 text-sm">
                                                {stakeholder.role_level}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {stakeholder.department}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Information */}
                        {project.ai_content && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">AI Content Available</h4>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        This project has AI-generated content available
                                    </p>
                                </div>
                            </div>
                        )}

                        {project.media && project.media.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Media Files ({project.media.length})
                                </h4>
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                    <p className="text-sm text-green-800">
                                        {project.media.length} media file{project.media.length > 1 ? 's' : ''} attached
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ProjectDetailsModal
