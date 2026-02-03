'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjects, useProject } from '@/hooks/app/useProjects';
import ProjectForm from '@/components/app/projects/ProjectForm';
import Spinner from '@/components/ui/spinner';
import type { ProjectFormData } from '@/interfaces/Project';
import { Button } from '@/components/ui/button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'



const ProjectPage = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const isCreating = projectId === 'create';

    const { createProject, updateProject } = useProjects();
    const { project, loading: projectLoading, error } = useProject(isCreating ? undefined : projectId);

    useDocumentTitle(
        isCreating ? 'Create Project' : `Edit Project${project?.name ? ` - ${project.name}` : ''}`,
        isCreating 
            ? 'Create a new change management project to track and manage your organizational transformation initiatives.'
            : 'Edit your change management project details, timeline, and objectives.'
    );

    const handleSubmit = async (data: ProjectFormData) => {
        if (isCreating) {
            const success = await createProject(data);
            return success;
        } else {
            const result = await updateProject(projectId, data);
            return result;
        }
    };
    if (!isCreating && projectLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (!isCreating && error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-8">
                <ProjectForm
                    project={isCreating ? null : project}
                    onSubmit={handleSubmit}
                    loading={projectLoading}
                />
            </div>
        </div>
    );
};

export default ProjectPage;
