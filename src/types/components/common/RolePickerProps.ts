interface RoleOption {
  id: string;
  label: string;
}

export interface RolePickerProps {
  options: RoleOption[];
  selectedRole?: string;
  onRoleChange?: (roleId: string) => void;
  className?: string;
} 