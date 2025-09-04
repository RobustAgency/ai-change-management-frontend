'use client';

import React from 'react';
import { CheckCircle, FileText, Users, Calendar, Building, Target, Briefcase } from 'lucide-react';
import type { ProjectFormData } from '@/interfaces/Project';

interface ReviewProps {
    formData: ProjectFormData;
    customType: string;
    project?: any;
}

const Review: React.FC<ReviewProps> = ({ formData, customType, project }) => {
    const getTypeDisplay = () => {
        if (formData.type === 'other') {
            return customType || 'Not specified';
        }
        return formData.type || 'Not specified';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Project Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Project Name
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1">{formData.name || "Not specified"}</p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Launch Date
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1">{formatDate(formData.launch_date)}</p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Change Type
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1 capitalize">{getTypeDisplay()}</p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                Status
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1 capitalize">{formData.status || "Not specified"}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                Client Organization
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1">{formData.client_organization || "Not specified"}</p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Stakeholders
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1">{formData.stakeholders?.length || 0} added</p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                Sponsor
                            </span>
                            <p className="text-lg font-medium text-gray-900 mt-1">
                                {formData.sponsor_name ? `${formData.sponsor_name}${formData.sponsor_title ? ` - ${formData.sponsor_title}` : ''}` : "Not specified"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details Section */}
            {(formData.summary || formData.business_goals || formData.expected_outcomes) && (
                <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-900 mb-6">Project Details</h3>
                    <div className="space-y-4">
                        {formData.summary && (
                            <div>
                                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Summary</span>
                                <p className="text-blue-800 mt-1">{formData.summary}</p>
                            </div>
                        )}
                        {formData.business_goals && (
                            <div>
                                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Business Goals</span>
                                <p className="text-blue-800 mt-1">{formData.business_goals}</p>
                            </div>
                        )}
                        {formData.expected_outcomes && (
                            <div>
                                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Expected Outcomes</span>
                                <p className="text-blue-800 mt-1">{formData.expected_outcomes}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Stakeholders Section */}
            {formData.stakeholders && formData.stakeholders.length > 0 && (
                <div className="bg-green-50 p-8 rounded-lg border border-green-100">
                    <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Stakeholders ({formData.stakeholders.length})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {formData.stakeholders.map((stakeholder, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{stakeholder.name || 'Unnamed Stakeholder'}</p>
                                    <p className="text-sm text-gray-600">
                                        {stakeholder.department && stakeholder.role_level 
                                            ? `${stakeholder.department} - ${stakeholder.role_level}`
                                            : stakeholder.department || stakeholder.role_level || 'No details provided'
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Items */}
            <div className="bg-indigo-50 p-8 rounded-lg border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-6">Ready to Submit</h3>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-indigo-900 mb-2">
                            {project ? 'Update Project' : 'Create Project'}
                        </p>
                        <p className="text-indigo-700 mb-4">
                            {project 
                                ? 'Your project updates are ready to be saved. Click "Update Project" to apply the changes.'
                                : 'Your project information is complete and ready to be created. Click "Create Project" to save your new project.'
                            }
                        </p>
                        <div className="flex items-center gap-2 text-sm text-indigo-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>All required fields completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
