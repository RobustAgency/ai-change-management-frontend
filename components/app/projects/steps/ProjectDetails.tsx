'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Palette, Sparkles } from 'lucide-react';
import { useProjectForm } from '../../../../providers/app/ProjectFormProvider';

const ProjectDetails: React.FC = () => {
    const { formData, handleInputChange } = useProjectForm();

    const templates = [
        {
            id: 1,
            name: 'Professional Blue',
            description: 'Clean and professional design with blue accents. Perfect for corporate presentations.',
            color: '#3B82F6',
            bgColor: '#EFF6FF',
            icon: <FileText className="w-6 h-6" />,
            features: ['Clean typography', 'Professional layout', 'Blue color scheme']
        },
        {
            id: 2,
            name: 'Modern Red',
            description: 'Bold and dynamic design with red accents. Perfect for impactful business presentations.',
            color: '#DC2626',
            bgColor: '#FEF2F2',
            icon: <Sparkles className="w-6 h-6" />,
            features: ['Bold design', 'Dynamic layout', 'Red accent scheme']
        },
        {
            id: 3,
            name: 'Corporate Purple',
            description: 'Elegant corporate design with purple accents. Great for executive presentations.',
            color: '#8B5CF6',
            bgColor: '#FAF5FF',
            icon: <Palette className="w-6 h-6" />,
            features: ['Executive style', 'Elegant design', 'Purple theme']
        }
    ];

    const handleTemplateSelect = (templateId: number) => {
        handleInputChange('template_id', templateId);
    };
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
                        onChange={(e) => handleInputChange('sponsor_name', e.target.value)}
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
                        onChange={(e) => handleInputChange('sponsor_title', e.target.value)}
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
                    onChange={(e) => handleInputChange('business_goals', e.target.value)}
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
                    onChange={(e) => handleInputChange('expected_outcomes', e.target.value)}
                    placeholder="Describe the expected outcomes and benefits this change will bring..."
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700">
                    Presentation Template
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                    Choose a template design for your Change Management Strategy presentation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map((template) => (
                        <Card
                            key={template.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${formData.template_id === template.id
                                    ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-lg border-indigo-200'
                                    : 'hover:shadow-md border-gray-200'
                                }`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <CardHeader className="pb-3">
                                <div
                                    className="w-full h-24 rounded-lg mb-3 flex items-center justify-center"
                                    style={{ backgroundColor: template.bgColor }}
                                >
                                    <div
                                        className="p-3 rounded-full"
                                        style={{ backgroundColor: template.color, color: 'white' }}
                                    >
                                        {template.icon}
                                    </div>
                                </div>
                                <CardTitle className="text-base font-semibold text-gray-900">
                                    {template.name}
                                </CardTitle>
                                <CardDescription className="text-xs text-gray-600">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-700">Features:</p>
                                    <ul className="space-y-1">
                                        {template.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="text-xs text-gray-600 flex items-center"
                                            >
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                                                    style={{ backgroundColor: template.color }}
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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
