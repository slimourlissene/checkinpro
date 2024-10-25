export interface ISidebarItem {
  title?: string;
  url?: string;
  icon?: React.ComponentType;
  component?: React.ReactNode;
}

export interface IPartialUser {
  email: string;
  firstname: string;
  lastname: string;
}
