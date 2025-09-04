'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Project, ProjectFormData } from '@/interfaces/Project';

// Context
import { ProjectFormProvider, useProjectForm } from '../../../providers/app/ProjectFormProvider';

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

const ProjectFormContent: React.FC<{ onSubmit: (data: ProjectFormData) => Promise<boolean | Project | null> }> = ({ onSubmit }) => {
    const router = useRouter();
    const {
        currentStep,
        formData,
        customType,
        steps,
        validateCurrentStep,
        handleNext,
        handlePrevious,
        project,
        loading,
        clientLogo,
    } = useProjectForm();

    const currentStepData = steps.find(step => step.id === currentStep) || steps[0];
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

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
                return <BasicInformation />;
            case 2:
                return <ProjectDetails />;
            case 3:
                return <Stakeholders />;
            case 4:
                return <Review />;
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
                    loading={loading || false}
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

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, loading = false }) => {
    return (
        <ProjectFormProvider project={project} loading={loading}>
            <ProjectFormContent onSubmit={onSubmit} />
        </ProjectFormProvider>
    );
};

export default ProjectForm;
