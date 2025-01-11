"use client";

import { GeneralSidebar } from "./generalSidebar";
import { CheckInSidebar } from "./checkInSidebar";
import { LegalSidebar } from "./legalSidebar";
import { UserSidebar } from "./userSidebar";
import { Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar";
import { ISidebarItem, IUserWithCompany } from "@/types";
import { CompanyHeader } from "./companyHeader";
import {
  computeSidebarCheckInItems,
  computeSidebarGeneralItems,
  computeSidebarLegalItems,
} from "@/utils/navigation";

export default function AppSidebar({
  user,
  ...props
}: { user: IUserWithCompany | undefined } & React.ComponentProps<
  typeof Sidebar
>) {
  const navMainItems: ISidebarItem[] = computeSidebarGeneralItems({ user });
  const navCheckInItems: ISidebarItem[] = user
    ? computeSidebarCheckInItems({ user })
    : [];
  const navLegalItems: ISidebarItem[] = computeSidebarLegalItems();

  return (
    <Sidebar variant="inset" {...props}>
      {user && <CompanyHeader user={user} />}
      <SidebarContent>
        <GeneralSidebar items={navMainItems} />
        {user && <CheckInSidebar items={navCheckInItems} />}
        <LegalSidebar items={navLegalItems} />
      </SidebarContent>
      <SidebarFooter>{user && <UserSidebar user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
