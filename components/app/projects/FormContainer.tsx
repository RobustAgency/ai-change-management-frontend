import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Step {
    id: number;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface FormContainerProps {
    currentStep: number;
    currentStepData: Step;
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({
    currentStep,
    currentStepData,
    children,
}) => {
    const getStepDescription = (step: number): string => {
        switch (step) {
            case 1:
                return "Let's start with the basic information about your change initiative.";
            case 2:
                return "Provide detailed information about your project goals and outcomes.";
            case 3:
                return "Add key stakeholders who will be involved in this change.";
            case 4:
                return "Review your information before creating the project.";
            default:
                return "";
        }
    };

    return (
        <Card className="border-0 shadow-lg bg-white py-0">
            <CardHeader className="bg-primary text-white rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                    {React.createElement(currentStepData.icon, { className: "w-6 h-6" })}
                    {currentStepData.title}
                </CardTitle>
                <CardDescription className="text-indigo-100 text-lg">
                    {getStepDescription(currentStep)}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
                {children}
            </CardContent>
        </Card>
    );
};

export default FormContainer;