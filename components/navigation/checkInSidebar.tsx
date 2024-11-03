"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ISidebarItem } from "@/types";
import { Key } from "react";

export function CheckInSidebar({ items }: { items: ISidebarItem[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Émargements</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: ISidebarItem, key: Key) =>
          item.url && item.title && item.icon ? (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            item.component && <span key={key}>{item.component}</span>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
