'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Briefcase, Users, CheckCircle } from 'lucide-react';
import type { Project, ProjectFormData, Stakeholder } from '@/interfaces/Project';

// Step Components
import BasicInformation from './steps/BasicInformation';
import ProjectDetails from './steps/ProjectDetails';
import Stakeholders from './steps/Stakeholders';
import Review from './steps/Review';
import NavigationButtons from './NavigationButtons';
import ProgressHeader from './ProgressHeader';
import FormContainer from './FormContainer';

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: ProjectFormData) => Promise<boolean | Project | null>;
    loading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, loading = false }) => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [clientLogo, setClientLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [customType, setCustomType] = useState('');

    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        launch_date: '',
        type: '',
        sponsor_name: '',
        sponsor_title: '',
        business_goals: '',
        summary: '',
        expected_outcomes: '',
        client_organization: '',
        status: 'draft',
        stakeholders: [],
    });

    const steps = [
        {
            id: 1,
            title: 'Basic Info',
            icon: FileText,
        },
        {
            id: 2,
            title: 'Project Details',
            icon: Briefcase,
        },
        {
            id: 3,
            title: 'Stakeholders',
            icon: Users,
        },
        {
            id: 4,
            title: 'Review',
            icon: CheckCircle,
        },
    ];

    const currentStepData = steps.find(step => step.id === currentStep) || steps[0];
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

    // Populate form when editing
    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || '',
                launch_date: project.launch_date ? project.launch_date.split('T')[0] : '',
                type: project.type || '',
                sponsor_name: project.sponsor_name || '',
                sponsor_title: project.sponsor_title || '',
                business_goals: project.business_goals || '',
                summary: project.summary || '',
                expected_outcomes: project.expected_outcomes || '',
                client_organization: project.client_organization || '',
                status: project.status || 'draft',
                stakeholders: project.stakeholders || [],
            });

            // Check if type is a custom type (not in predefined options)
            const predefinedTypes = ['system', 'process', 'structure', 'strategy', 'culture', 'org design'];
            if (project.type && !predefinedTypes.includes(project.type)) {
                setCustomType(project.type);
                setFormData(prev => ({ ...prev, type: 'other' }));
            }

            // If there's an existing logo URL, set it as preview
            if (typeof project.client_logo === 'string' && project.client_logo) {
                setLogoPreview(project.client_logo);
            }
        }
    }, [project]);

    const validateCurrentStep = (): boolean => {
        const errors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.name?.trim()) {
                errors.name = 'Project name is required';
            }
            if (!formData.launch_date) {
                errors.launch_date = 'Launch date is required';
            }
            if (!formData.status) {
                errors.status = 'Status is required';
            }
            if (formData.type === 'other' && !customType.trim()) {
                errors.customType = 'Please specify the type of change';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (field: keyof ProjectFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        // Clear validation error
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleTypeChange = (value: string) => {
        setFormData(prev => ({ ...prev, type: value }));
        if (value !== 'other') {
            setCustomType('');
        }
        // Clear validation errors
        if (validationErrors.type) {
            setValidationErrors(prev => ({ ...prev, type: '' }));
        }
        if (validationErrors.customType) {
            setValidationErrors(prev => ({ ...prev, customType: '' }));
        }
    };

    const handleCustomTypeChange = (value: string) => {
        setCustomType(value);
        if (validationErrors.customType) {
            setValidationErrors(prev => ({ ...prev, customType: '' }));
        }
    };

    const handleStakeholderChange = (index: number, field: keyof Stakeholder, value: string) => {
        const newStakeholders = [...(formData.stakeholders || [])];
        newStakeholders[index] = {
            ...newStakeholders[index],
            [field]: value,
        };
        setFormData(prev => ({
            ...prev,
            stakeholders: newStakeholders,
        }));
    };

    const addStakeholder = () => {
        setFormData(prev => ({
            ...prev,
            stakeholders: [...(prev.stakeholders || []), { name: '', department: '', role_level: '' }],
        }));
    };

    const removeStakeholder = (index: number) => {
        setFormData(prev => ({
            ...prev,
            stakeholders: prev.stakeholders?.filter((_, i) => i !== index) || [],
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setClientLogo(file);
            const reader = new FileReader();
            reader.onload = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setClientLogo(null);
        setLogoPreview(null);
    };

    const handleNext = () => {
        if (validateCurrentStep() && currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateCurrentStep()) {
            return;
        }

        const submitData: ProjectFormData = {
            ...formData,
            type: formData.type === 'other' ? customType : formData.type,
            client_logo: clientLogo || undefined,
        };

        const result = await onSubmit(submitData);
        if (result) {
            router.push('/dashboard');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <BasicInformation
                        formData={formData}
                        validationErrors={validationErrors}
                        customType={customType}
                        clientLogo={clientLogo}
                        logoPreview={logoPreview}
                        onInputChange={handleInputChange}
                        onTypeChange={handleTypeChange}
                        onCustomTypeChange={handleCustomTypeChange}
                        onLogoChange={handleLogoChange}
                        onRemoveLogo={removeLogo}
                    />
                );
            case 2:
                return (
                    <ProjectDetails
                        formData={formData}
                        onInputChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <Stakeholders
                        formData={formData}
                        onStakeholderChange={handleStakeholderChange}
                        onAddStakeholder={addStakeholder}
                        onRemoveStakeholder={removeStakeholder}
                    />
                );
            case 4:
                return (
                    <Review
                        formData={formData}
                        customType={customType}
                        project={project}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <ProgressHeader
                    currentStep={currentStep}
                    steps={steps}
                    progress={progress}
                    project={project}
                />

                <FormContainer
                    currentStep={currentStep}
                    currentStepData={currentStepData}
                >
                    {renderStepContent()}
                </FormContainer>

                <NavigationButtons
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    loading={loading}
                    project={project}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                    onCancel={() => router.push('/dashboard')}
                />
            </div>
        </div>
    );
};

export default ProjectForm;
