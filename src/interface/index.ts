// from user generate default interface user one tab
export interface user {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  title: null;
  description: string;
  token: null;
  id: string;
  last_page: string;
  external_identifier: null;
  user_meta_id: number;
  user_statistic_id: number;
}

// from subject generate interface subject
export interface subject {
  id: number;
  status: string;
  sort: null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  subject_name: string;
  subject_description: string;
  subject_type: string;
  order: number;
  type_embed: string;
}

export interface project {
  id: number;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  project_title: string;
  project_link: string;
  status: string;
  project_state: string;
  lms_project_id: string;
  subject_id: string;
  project_thumbnail: string;
  project_description: string;
  upload_type: string;
  project_statistic_id: number;
  source_code: string;
  project_slug: string;
  is_hot: boolean;
  search_text: string;
  project_source: string;
  lms_view_link: string;
}
