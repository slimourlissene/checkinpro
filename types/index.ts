import { Checkin, CheckinSession, Company, Record } from "@prisma/client";
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

export interface ICheckinByCompany extends Checkin {
  company: Company & { users: User[] };
  sessions: (CheckinSession & { records: (Record & { user: User })[] })[];
}
