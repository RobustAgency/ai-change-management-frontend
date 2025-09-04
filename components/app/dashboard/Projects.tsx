"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Plus,
    Search,
    MoreVertical,
    FileText,
    Calendar,
    Edit,
    Trash2,
    Download,
    Clock,
    Target,
} from "lucide-react"
import Link from "next/link"

const projects = [
    {
        id: 1,
        name: "Q4 Digital Transformation",
        createdDate: "2024-01-15",
        status: "completed",
        audiences: ["Executives", "Managers", "Frontline Workers"],
        lastModified: "2024-01-20",
        assetsGenerated: 12,
    },
    {
        id: 2,
        name: "Remote Work Policy Update",
        createdDate: "2024-01-10",
        status: "in-progress",
        audiences: ["Managers", "HR Team"],
        lastModified: "2024-01-18",
        assetsGenerated: 8,
    },
    {
        id: 3,
        name: "New CRM Implementation",
        createdDate: "2024-01-05",
        status: "draft",
        audiences: ["Sales Team", "IT Team"],
        lastModified: "2024-01-12",
        assetsGenerated: 4,
    },
]
const Projects = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "completed":
                return {
                    color: "bg-green-100 text-green-800 border-green-200",
                    label: "Completed",
                    dot: "bg-green-500",
                }
            case "in-progress":
                return {
                    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
                    label: "In Progress",
                    dot: "bg-indigo-500",
                }
            case "draft":
                return {
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    label: "Draft",
                    dot: "bg-gray-500",
                }
            default:
                return {
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    label: status,
                    dot: "bg-gray-500",
                }
        }
    }

    const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                New Project
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filteredProjects.length > 0 ? (
                    <div className="space-y-4">
                        {filteredProjects.map((project) => {
                            const statusConfig = getStatusConfig(project.status)
                            return (
                                <div
                                    key={project.id}
                                    className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                                <Badge className={`${statusConfig.color} border text-xs font-medium`}>
                                                    <div className={`w-2 h-2 rounded-full ${statusConfig.dot} mr-2`}></div>
                                                    {statusConfig.label}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Created {new Date(project.createdDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    Modified {new Date(project.lastModified).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        {project.audiences.length} audience{project.audiences.length !== 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">{project.assetsGenerated} assets generated</span>
                                                </div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Link href={`/projects/${project.id}`}>
                                                    <DropdownMenuItem>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit Project
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem>
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export All Assets
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete Project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {project.audiences.map((audience) => (
                                                <Badge key={audience} className="text-xs bg-white">
                                                    {audience}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={`/project/${project.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Link href={`/project/${project.id}/assets`}>
                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    View Assets
                                                </Button>
                                            </Link>
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {searchTerm
                                ? "Try adjusting your search terms to find what you're looking for."
                                : "Create your first project to start generating professional change communication assets."}
                        </p>
                        {!searchTerm && (
                            <Link href="/projects/create">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Project
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Projects