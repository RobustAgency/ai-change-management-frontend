import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { projectService } from '@/service/app/projects';
import type { Project, ProjectFormData, ProjectFilters, ProjectsResponse } from '@/interfaces/Project';

export const useProjects = () => {
    const [projects, setProjects] = useState<ProjectsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async (filters?: ProjectFilters) => {
        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getProjects(filters);
            setProjects(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (data: ProjectFormData): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await projectService.createProject(data);
            toast.success('Project created successfully');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (id: string, data: ProjectFormData): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await projectService.updateProject(id, data);
            toast.success('Project updated successfully');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string): Promise<boolean> => {
        try {
            setDeleteLoading(true);
            setError(null);
            await projectService.deleteProject(id);
            toast.success('Project deleted successfully');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setDeleteLoading(false);
        }
    };

    return {
        projects,
        loading,
        deleteLoading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    };
};

export const useProject = (id?: string) => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);

    const fetchProject = async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getProject(id);
            setProject(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const generateContent = async (): Promise<boolean> => {
        if (!id) return false;
        try {
            setIsGeneratingContent(true);
            setError(null);
            const response = await projectService.generateContent(id);
            if (response && response.error === false) {
                return true;
            } else {
                const errorMessage = response?.message || 'Failed to generate content';
                setError(errorMessage);
                toast.error(errorMessage);
                return false;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setIsGeneratingContent(false);
        }
    };

    useEffect(() => {
        if (id && id !== 'create') {
            fetchProject();
        }
    }, [id]);

    return {
        project,
        loading,
        error,
        fetchProject,
        generateContent,
        isGeneratingContent,
    };
};
