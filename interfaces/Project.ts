export interface Project {
  id?: number;
  name: string;
  launch_date: string;
  type?: string;
  sponsor_name?: string;
  sponsor_title?: string;
  business_goals?: string;
  summary?: string;
  expected_outcomes?: string;
  client_organization?: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  stakeholders?: Stakeholder[];
  client_logo?: File | string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Stakeholder {
  name?: string;
  department?: string;
  role_level?: string;
}

export interface ProjectFormData extends Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  client_logo?: File;
  // Additional fields for the multi-step form
  projectName?: string;
  launchDate?: string;
  description?: string;
  audiences?: string[];
  keyMessages?: string[];
  benefits?: string[];
  timeline?: string;
  changeType?: string;
  urgency?: string;
  template?: string;
}

export interface ProjectFilters {
  term?: string;
  status?: string;
  per_page?: number;
  page?: number;
}

export interface ProjectsResponse {
  data: Project[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
