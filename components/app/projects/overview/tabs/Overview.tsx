import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    FileText,
    Mail,
    Video,
    HelpCircle,
    User,
    Clock,
    Users,
    TrendingUp,
    Building,
    CheckCircle,
    AlertCircle
} from "lucide-react"
import { AssetData } from '../types'

interface OverviewProps {
    assetData: AssetData
}

const Overview = ({ assetData }: OverviewProps) => {
    const project = assetData.project

    // Calculate completion percentage based on actual data structure
    const totalAssets = 4 // slides, emails, video, faqs
    const completedAssets = [
        project?.ai_content?.slides_content ? true : false,
        project?.ai_content?.emails ? Object.keys(project.ai_content.emails || {}).length > 0 : false,
        project?.ai_content?.video_script ? true : false,
        project?.ai_content?.faqs ? (project.ai_content.faqs || []).length > 0 : false
    ].filter(Boolean).length

    const completionPercentage = Math.round((completedAssets / totalAssets) * 100)

    // Calculate total word count across all content including slides
    const calculateWordCount = () => {
        let totalWords = 0;

        // Helper function to count words in nested objects
        const countWordsInObject = (obj: any): number => {
            let words = 0;
            if (typeof obj === 'string') {
                words += obj.split(' ').length;
            } else if (Array.isArray(obj)) {
                obj.forEach(item => {
                    words += countWordsInObject(item);
                });
            } else if (typeof obj === 'object' && obj !== null) {
                Object.values(obj).forEach(value => {
                    words += countWordsInObject(value);
                });
            }
            return words;
        };

        // Count words from emails
        if (project?.ai_content?.emails) {
            Object.values(project.ai_content.emails).forEach((email: any) => {
                if (email.body) {
                    totalWords += email.body.split(' ').length;
                }
            });
        }

        // Count words from slides content
        if (project?.ai_content?.slides_content) {
            totalWords += countWordsInObject(project.ai_content.slides_content);
        }

        // Count words from FAQs
        if (project?.ai_content?.faqs) {
            project.ai_content.faqs.forEach((faq: any) => {
                if (faq.question) totalWords += faq.question.split(' ').length;
                if (faq.answer) totalWords += faq.answer.split(' ').length;
            });
        }

        // Count words from video script (when available)
        if (project?.ai_content?.video_script) {
            totalWords += countWordsInObject(project.ai_content.video_script);
        }

        return totalWords;
    };

    const totalWordCount = calculateWordCount();

    return (
        <React.Fragment>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Slide Decks</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {project?.ai_content?.slides_content ? Object.keys(project.ai_content.slides_content || {}).length : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Email Series</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {project?.ai_content?.emails ? Object.keys(project.ai_content.emails || {}).length : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Video Script</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {project?.ai_content?.video_script ? 1 : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Video className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">FAQ Sets</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {project?.ai_content?.faqs ? project.ai_content.faqs.length : 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Project Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-indigo-600" />
                            Project Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {project && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Project Name</p>
                                        <p className="text-gray-900 font-semibold">{project.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Launch Date</p>
                                        <p className="text-gray-900">{new Date(project.launch_date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Project Type</p>
                                        <Badge variant="outlined" className="mt-1">{project.type}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Status</p>
                                        <Badge
                                            variant="outlined"
                                            className={`mt-1 ${project.status === 'active' ? 'border-green-200 text-green-700 bg-green-50' : 'border-gray-200'}`}
                                        >
                                            {project.status}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">Project Sponsor</p>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-900 font-medium">{project.sponsor_name}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-600">{project.sponsor_title}</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">Business Goals</p>
                                    <p className="text-gray-700 text-sm leading-relaxed">{project.business_goals}</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Progress & Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Progress Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Completion Progress */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Content Completion</span>
                                <span className="text-sm font-semibold text-gray-900">{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Content Statistics */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total Words Generated</span>
                                <span className="font-semibold text-gray-900">{totalWordCount.toLocaleString()}</span>
                            </div>

                            {project?.stakeholders && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Stakeholder Groups</span>
                                    <span className="font-semibold text-gray-900">{project.stakeholders.length}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Role-Based Emails</span>
                                <span className="font-semibold text-gray-900">
                                    {project?.ai_content?.emails ? Object.keys(project.ai_content.emails || {}).length : 0}
                                </span>
                            </div>
                        </div>

                        {/* Status Indicators */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                {project?.ai_content?.slides_content ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                )}
                                <span className="text-sm text-gray-600">Slide Decks</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {project?.ai_content?.emails && Object.keys(project.ai_content.emails || {}).length > 0 ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                )}
                                <span className="text-sm text-gray-600">Email Series</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {project?.ai_content?.video_script ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                )}
                                <span className="text-sm text-gray-600">Video Script</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {project?.ai_content?.faqs && (project?.ai_content?.faqs || []).length > 0 ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                                )}
                                <span className="text-sm text-gray-600">FAQ Sets</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stakeholders Overview */}
            {project?.stakeholders && project.stakeholders.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            Key Stakeholders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.stakeholders.slice(0, 6).map((stakeholder: any, index: number) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{stakeholder.name || 'N/A'}</p>
                                        <p className="text-xs text-gray-600 truncate">{stakeholder.department}</p>
                                        <Badge variant="outlined" className="text-xs mt-1">{stakeholder.role_level}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {project.stakeholders.length > 6 && (
                            <p className="text-sm text-gray-500 mt-4 text-center">
                                +{project.stakeholders.length - 6} more stakeholders
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

        </React.Fragment>
    )
}

export default Overview
