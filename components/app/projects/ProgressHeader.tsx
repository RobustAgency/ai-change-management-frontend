import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Step {
    id: number;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

import { Project } from '@/interfaces/Project';

interface Step {
    id: number;
    title: string;
    description: string;
}

interface ProgressHeaderProps {
    currentStep: number;
    steps: Step[];
    progress: number;
    project?: Project | null;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
    currentStep,
    steps,
    progress,
    project,
}) => {
    return (
        <div className="mb-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {project ? 'Edit Project' : 'Create New Project'}
                </h1>
                <p className="text-xl text-gray-600">
                    {project
                        ? 'Update your project information step by step'
                        : 'Set up your change management project step by step'
                    }
                </p>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-600">
                        Step {currentStep} of {steps.length}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted
                                    ? "bg-green-500 text-white"
                                    : isActive
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-200 text-gray-400"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <span
                                className={`text-sm text-center font-medium max-w-20 ${isActive ? "text-indigo-600" : isCompleted ? "text-green-600" : "text-gray-400"
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressHeader;