import { api } from '@/lib/api';
import type { Project, ProjectFormData, ProjectFilters, ProjectsResponse } from '@/interfaces/Project';

export const projectService = {
  async getProjects(filters?: ProjectFilters): Promise<ProjectsResponse> {
    const params = new URLSearchParams();

    if (filters?.term) params.append('term', filters.term);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.per_page) params.append('per_page', filters.per_page.toString());
    if (filters?.page) params.append('page', filters.page.toString());

    const response = await api.get<ProjectsResponse>(`/projects?${params.toString()}`);
    return response.data;
  },

  async getProject(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async createProject(data: ProjectFormData): Promise<void> {
    const formData = new FormData();

    // Add all the fields to FormData
    formData.append('name', data.name);
    formData.append('launch_date', data.launch_date);
    formData.append('status', data.status);

    if (data.type) formData.append('type', data.type);
    if (data.sponsor_name) formData.append('sponsor_name', data.sponsor_name);
    if (data.sponsor_title) formData.append('sponsor_title', data.sponsor_title);
    if (data.business_goals) formData.append('business_goals', data.business_goals);
    if (data.summary) formData.append('summary', data.summary);
    if (data.expected_outcomes) formData.append('expected_outcomes', data.expected_outcomes);
    if (data.client_organization) formData.append('client_organization', data.client_organization);
    if (data.template_id) formData.append('template_id', data.template_id.toString());

    if (data.stakeholders && data.stakeholders.length > 0) {
      data.stakeholders.forEach((stakeholder, index) => {
        if (stakeholder.name) {
          formData.append(`stakeholders[${index}][name]`, stakeholder.name);
        }
        if (stakeholder.department) {
          formData.append(`stakeholders[${index}][department]`, stakeholder.department);
        }
        if (stakeholder.role_level) {
          formData.append(`stakeholders[${index}][role_level]`, stakeholder.role_level);
        }
      });
    }

    if (data.client_logo instanceof File) {
      formData.append('client_logo', data.client_logo);
    }

    await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updateProject(id: string, data: ProjectFormData): Promise<Project> {
    const formData = new FormData();

    // Add all the fields to FormData
    formData.append('name', data.name);
    formData.append('launch_date', data.launch_date);
    formData.append('status', data.status);

    if (data.type) formData.append('type', data.type);
    if (data.sponsor_name) formData.append('sponsor_name', data.sponsor_name);
    if (data.sponsor_title) formData.append('sponsor_title', data.sponsor_title);
    if (data.business_goals) formData.append('business_goals', data.business_goals);
    if (data.summary) formData.append('summary', data.summary);
    if (data.expected_outcomes) formData.append('expected_outcomes', data.expected_outcomes);
    if (data.client_organization) formData.append('client_organization', data.client_organization);
    if (data.template_id) formData.append('template_id', data.template_id.toString());

    // Add stakeholders as individual FormData fields
    if (data.stakeholders && data.stakeholders.length > 0) {
      data.stakeholders.forEach((stakeholder, index) => {
        if (stakeholder.name) {
          formData.append(`stakeholders[${index}][name]`, stakeholder.name);
        }
        if (stakeholder.department) {
          formData.append(`stakeholders[${index}][department]`, stakeholder.department);
        }
        if (stakeholder.role_level) {
          formData.append(`stakeholders[${index}][role_level]`, stakeholder.role_level);
        }
      });
    }

    if (data.client_logo instanceof File) {
      formData.append('client_logo', data.client_logo);
    }

    const response = await api.post<Project>(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  async generateContent(id: string): Promise<any> {
    const response = await api.get(`/projects/generate-content/${id}`);
    return response;
  },
};
