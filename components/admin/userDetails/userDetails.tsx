"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Mail, User, FileText, Eye, Calendar, Clock, Target, Building } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import type { User as UserType } from '@/interfaces/User'
import type { Project } from '@/interfaces/Project'
import ProjectDetailsModal from './ProjectDetailsModal'

interface UserDetailsProps {
    user: UserType
}

const UserDetails = ({ user }: UserDetailsProps) => {
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

    const getStakeholdersInfo = (stakeholders?: Project['stakeholders']) => {
        if (!stakeholders || stakeholders.length === 0) {
            return { text: "No stakeholders" }
        }
        return { text: `${stakeholders.length} stakeholder${stakeholders.length > 1 ? "s" : ""}` }
    }

    return (
        <div className="space-y-6">
            {/* User Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        User Information
                    </CardTitle>
                    <CardDescription>
                        Basic user details and account information
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-gray-900 mt-1 break-words">{user.name || 'N/A'}</p>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <div className="flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <p className="text-gray-900 truncate">{user.email}</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Role</label>
                            <p className="text-gray-900 mt-1 capitalize">{user.role}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <div className="mt-1">
                                <Badge
                                    variant="light"
                                    color={user.is_active ? "success" : "error"}
                                    className="w-fit"
                                >
                                    {user.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Plan ID</label>
                            <p className="text-gray-900 mt-1 break-words">{user.plan_id || 'No plan assigned'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email Verified</label>
                            <div className="mt-1">
                                <Badge
                                    variant="light"
                                    color={user.email_verified_at ? "success" : "warning"}
                                    className="w-fit"
                                >
                                    {user.email_verified_at ? "Verified" : "Not Verified"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Projects
                    </CardTitle>
                    <CardDescription>
                        Projects associated with this user
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user.projects && user.projects.length > 0 ? (
                        <div className="space-y-4">
                            {user.projects.map((project) => {
                                const status = getStatusConfig(project.status)
                                const stakeholders = getStakeholdersInfo(project.stakeholders)

                                return (
                                    <div key={project.id} className="border rounded-lg p-4 sm:p-6 hover:shadow-md bg-gray-50">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
                                                    <Badge className={`${status.color} border text-xs font-medium w-fit`}>
                                                        <span className={`w-2 h-2 rounded-full ${status.dot} mr-2`}></span>
                                                        {status.label}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">Created {project.created_at ? formatDate(project.created_at) : 'N/A'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">Modified {project.updated_at ? formatDate(project.updated_at) : 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                        <span className="truncate">{stakeholders.text}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                        <span className="truncate">Launch: {project.launch_date ? formatDate(project.launch_date) : 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <ProjectDetailsModal project={project} />
                                                </Dialog>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                                            <div className="flex flex-wrap gap-2">
                                                {project.stakeholders?.slice(0, 3).map((stake, i) => (
                                                    <Badge key={i} className="rounded-sm text-xs bg-white truncate">
                                                        {stake.role_level || stake.department || `Stakeholder ${i + 1}`}
                                                    </Badge>
                                                ))}
                                                {project.stakeholders && project.stakeholders.length > 3 && (
                                                    <Badge className="text-xs bg-white flex-shrink-0">
                                                        +{project.stakeholders.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-500">This user hasn't been assigned to any projects yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetails
