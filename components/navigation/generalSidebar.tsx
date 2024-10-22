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

export function GeneralSidebar({ items }: { items: ISidebarItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Général</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: ISidebarItem, key: Key) => (
          <SidebarMenuItem key={key}>
            {item.url && item.icon ? (
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                </Link>
              </SidebarMenuButton>
            ) : (
              item.component
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
