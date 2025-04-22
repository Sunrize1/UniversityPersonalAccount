interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface SidebarProps {
  menuItems: MenuItem[];
}