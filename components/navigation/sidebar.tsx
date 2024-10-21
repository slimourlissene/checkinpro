"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  CircleHelp,
  Command,
  Frame,
  Home,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { GeneralSidebar } from "./generalSidebar";
import { ProjectsSidebar } from "./projectsSidebar";
import { SecondarySidebar } from "./secondarySidebar";
import { UserSidebar } from "./userSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { User } from "next-auth";

function computeSidebarGeneralItems(user: User | undefined) {
  const result = [
    {
      title: "Accueil",
      url: "/",
      icon: Home,
      isActive: true,
    },
  ];

  if (user === undefined) {
    result.push({
      title: "Comment s'inscrire",
      url: "/register",
      icon: CircleHelp,
      isActive: false,
    });
  }

  return result;
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Accueil",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Comment s'inscrire",
      url: "#",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export default async function AppSidebar({
  user,
  ...props
}: { user: User | undefined } & React.ComponentProps<typeof Sidebar>) {
  const navMainItems = computeSidebarGeneralItems(user);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">L'USINE</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <GeneralSidebar items={navMainItems} />
        <ProjectsSidebar projects={data.projects} />
        <SecondarySidebar items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserSidebar user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
