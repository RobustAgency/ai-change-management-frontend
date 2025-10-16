export interface Project {
  id?: number;
  name: string;
  is_editable: boolean;
  launch_date: string;
  type?: string;
  sponsor_name?: string;
  sponsor_title?: string;
  business_goals?: string;
  summary?: string;
  expected_outcomes?: string;
  client_organization?: string;
  template_id?: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled' | 'in-progress';
  stakeholders?: Stakeholder[];
  client_logo?: File | string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  media?: MediaFile[] | string[];
  ai_content?: AIContent;
}

export interface AIContent {
  id: number;
  project_id: number;
  slides_content: {
    benefits: string[];
    key_stakeholders: string[];
    executive_summary: string;
    change_management_strategy: string;
  };
  faqs: any | null;
  video_script: any | null;
  created_at: string;
  updated_at: string;
}

export interface MediaFile {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
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
