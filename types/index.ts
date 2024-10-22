import { ReactNode } from "react";

export interface INavbarItem {
  label?: string;
  href?: string;
  component?: React.ReactNode;
}

export interface ISidebarItem {
  title?: string;
  url?: string;
  icon?: React.ComponentType;
  component?: React.ReactNode;
}
