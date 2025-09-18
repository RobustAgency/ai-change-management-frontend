'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FileText, Briefcase, Users, CheckCircle } from 'lucide-react';
import type { Project, ProjectFormData, Stakeholder } from '@/interfaces/Project';

interface ProjectFormContextType {
    // Form Data
    formData: ProjectFormData;
    customType: string;
    clientLogo: File | null;
    logoPreview: string | null;
    validationErrors: Record<string, string>;

    // State Management
    currentStep: number;
    setCurrentStep: (step: number) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;

    // Form Actions
    handleInputChange: (field: keyof ProjectFormData, value: string) => void;
    handleTypeChange: (value: string) => void;
    handleCustomTypeChange: (value: string) => void;
    handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeLogo: () => void;

    // Stakeholder Actions
    handleStakeholderChange: (index: number, field: keyof Stakeholder, value: string) => void;
    addStakeholder: () => void;
    removeStakeholder: (index: number) => void;

    // Validation
    validateCurrentStep: () => boolean;
    clearValidationError: (field: string) => void;

    // Navigation
    handleNext: () => void;
    handlePrevious: () => void;

    // Form Configuration
    steps: Array<{
        id: number;
        title: string;
        description: string;
        icon: any;
    }>;

    // External Props
    project?: Project | null;
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined);

interface ProjectFormProviderProps {
    children: ReactNode;
    project?: Project | null;
    loading?: boolean;
}

export const ProjectFormProvider: React.FC<ProjectFormProviderProps> = ({
    children,
    project,
    loading: externalLoading = false,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [clientLogo, setClientLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [customType, setCustomType] = useState('');
    const [loading, setLoading] = useState(externalLoading);

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
            description: 'Project name, type, and logo',
            icon: FileText,
        },
        {
            id: 2,
            title: 'Project Details',
            description: 'Goals, outcomes, and summary',
            icon: Briefcase,
        },
        {
            id: 3,
            title: 'Stakeholders',
            description: 'Key project stakeholders',
            icon: Users,
        },
        {
            id: 4,
            title: 'Review',
            description: 'Review and submit',
            icon: CheckCircle,
        },
    ];

    // Sync external loading state with internal state
    useEffect(() => {
        setLoading(externalLoading);
    }, [externalLoading]);

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

    const clearValidationError = (field: string) => {
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }
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

    const value: ProjectFormContextType = {
        // Form Data
        formData,
        customType,
        clientLogo,
        logoPreview,
        validationErrors,

        // State Management
        currentStep,
        setCurrentStep,
        loading,
        setLoading,

        // Form Actions
        handleInputChange,
        handleTypeChange,
        handleCustomTypeChange,
        handleLogoChange,
        removeLogo,

        // Stakeholder Actions
        handleStakeholderChange,
        addStakeholder,
        removeStakeholder,

        // Validation
        validateCurrentStep,
        clearValidationError,

        // Navigation
        handleNext,
        handlePrevious,

        // Form Configuration
        steps,

        // External Props
        project,
    };

    return (
        <ProjectFormContext.Provider value={value}>
            {children}
        </ProjectFormContext.Provider>
    );
};

export const useProjectForm = () => {
    const context = useContext(ProjectFormContext);
    if (context === undefined) {
        throw new Error('useProjectForm must be used within a ProjectFormProvider');
    }
    return context;
};

export default ProjectFormContext;
