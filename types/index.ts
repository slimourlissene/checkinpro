import { Checkin, CheckinSession, Company, Record, User } from "@prisma/client";

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
  isChief: boolean;
  isPasswordSet: boolean;
}

export interface ICheckinByCompany extends Checkin {
  company: Company & { users: User[] };
  sessions: (CheckinSession & { records: (Record & { user: User })[] })[];
}

export interface ICheckinSessionWithRecords extends CheckinSession {
  records: (Record & { user: User })[];
}

export interface ICheckinRecordsWithUsers extends Record {
  user: User;
}
