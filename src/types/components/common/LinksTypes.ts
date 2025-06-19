import { UsefulService, Pagination } from "../../api/UsefulServicesResponse";

export interface LinkCardProps {
  link: UsefulService;
  onLinkClick?: (url: string) => void;
}

export interface LinksListProps {
  links: UsefulService[];
  pagination?: Pagination;
  onLinkClick?: (url: string) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}
