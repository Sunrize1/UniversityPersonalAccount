import { UsefulService, Pagination } from "../../api/UsefulServicesResponse";

export interface UsefulServiceCardProps {
  link: UsefulService;
  onAction?: () => void;
  onEdit?: (service: UsefulService) => void;
}

export interface UsefulServiceCardListProps {
  links: UsefulService[];
  pagination?: Pagination;
  onAction: () => void
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  onEdit?: (service: UsefulService) => void;
}
