'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProjectFormData } from '@/interfaces/Project';

interface ProjectDetailsProps {
    formData: ProjectFormData;
    onInputChange: (field: keyof ProjectFormData, value: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    formData,
    onInputChange,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="sponsor_name" className="text-base font-semibold text-gray-700">
                        Sponsor Name
                    </Label>
                    <Input
                        id="sponsor_name"
                        value={formData.sponsor_name}
                        onChange={(e) => onInputChange('sponsor_name', e.target.value)}
                        placeholder="Enter sponsor name"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sponsor_title" className="text-base font-semibold text-gray-700">
                        Sponsor Title
                    </Label>
                    <Input
                        id="sponsor_title"
                        value={formData.sponsor_title}
                        onChange={(e) => onInputChange('sponsor_title', e.target.value)}
                        placeholder="Enter sponsor title"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="business_goals" className="text-base font-semibold text-gray-700">
                    Business Goals
                </Label>
                <Textarea
                    id="business_goals"
                    value={formData.business_goals}
                    onChange={(e) => onInputChange('business_goals', e.target.value)}
                    placeholder="Describe the business goals and what you want to achieve with this change..."
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="expected_outcomes" className="text-base font-semibold text-gray-700">
                    Expected Outcomes
                </Label>
                <Textarea
                    id="expected_outcomes"
                    value={formData.expected_outcomes}
                    onChange={(e) => onInputChange('expected_outcomes', e.target.value)}
                    placeholder="Describe the expected outcomes and benefits this change will bring..."
                    rows={4}
                />
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h3 className="font-semibold text-indigo-900 mb-2">Project Details Tip</h3>
                <p className="text-indigo-700">
                    Clear business goals and expected outcomes help stakeholders understand the purpose and value of the change initiative. Be specific about what success looks like.
                </p>
            </div>
        </div>
    );
};

export default ProjectDetails;
