"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ISidebarItem } from "@/types";

export function CheckInSidebar({ items }: { items: ISidebarItem[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Émargements</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: ISidebarItem) =>
          item.url && item.title && item.icon ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : null
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
