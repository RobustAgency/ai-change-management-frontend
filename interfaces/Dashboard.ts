export interface DashboardStats {
  total_projects: number;
  this_month: number;
  content_generated: number;
  pending_generation: number;
}

export interface AdminDashboardStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  total_projects: number;
}
