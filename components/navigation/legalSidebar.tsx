import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ISidebarItem } from "@/types";
import Link from "next/link";
import { Key } from "react";

export function LegalSidebar({
  items,
  ...props
}: {
  items: ISidebarItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Contenu légal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {" "}
          {items.map((item: ISidebarItem, key: Key) => (
            <SidebarMenuItem key={key}>
              {item.icon && item.url ? (
                <SidebarMenuButton asChild>
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
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
