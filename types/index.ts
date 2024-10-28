import { Company } from "@prisma/client";
import { User } from "next-auth";

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

export interface IUser extends User {
  company: Company | null;
  companyId: string | null;
  isChief: boolean;
  isPasswordSet: boolean;
}
