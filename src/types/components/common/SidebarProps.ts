interface MenuItem {
  id: string;
  label: string;
  activeIcon: React.ReactNode;
  basicIcon: React.ReactNode
  active: boolean;
}

export interface SidebarProps {
  menuItems: MenuItem[];
}