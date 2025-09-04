import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Project } from '@/interfaces/Project';

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    loading: boolean;
    project?: Project | null;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentStep,
    totalSteps,
    loading,
    project,
    onPrevious,
    onNext,
    onSubmit,
    onCancel,
}) => {
    return (
        <div className="flex justify-between mt-8">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 1}
                className="h-12 px-6 bg-transparent"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Step
            </Button>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="h-12 px-6"
                >
                    Cancel
                </Button>

                {currentStep < totalSteps ? (
                    <Button
                        onClick={onNext}
                        className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={onSubmit}
                        disabled={loading}
                        className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                        {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default NavigationButtons;