"use client";

import { Building2, Plus } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import Link from "next/link";
import { IUser } from "@/types";
import CreateCompanyDialog from "../company/createCompany";

export function CompanyHeader({ user }: { user: IUser }) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        {user.company === null && user.isChief && <CreateCompanyDialog />}
        {user.company !== null && <MyCompany user={user} />}
      </SidebarMenu>
    </SidebarHeader>
  );
}

function MyCompany({ user }: { user: IUser }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" asChild>
        <Link href={`/company/${user.company?.id}`}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Building2 className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.company?.name}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
