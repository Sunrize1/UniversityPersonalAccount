export interface BreadcrumbItem {
  id: string;
  label: string;
  path: string;
}

export interface BreadcrumbsState {
  items: BreadcrumbItem[];
} 