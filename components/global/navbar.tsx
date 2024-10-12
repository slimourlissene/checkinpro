"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { NavbarItem } from "@/types";
import { Key } from "react";
import { useSession } from "next-auth/react";
import { ToggleTheme } from "./toggleTheme";

export default function Navbar() {
  const { data: session } = useSession();
  const left: NavbarItem[] = [
    {
      label: "Accueil",
      href: "/",
    },
    ...(session ? [{ label: "Mes émargements", href: "/checkins" }] : []),
  ];
  console.log(left);
  const right: NavbarItem[] = [
    {
      label: "Se connecter",
      href: "/login",
    },
    {
      label: "Comment obtenir un compte ?",
      href: "/register",
    },
    {
      component: <ToggleTheme />,
    },
    ...(session ? [{ label: "Déconnexion", href: "/api/auth/signout" }] : []),
  ];

  return (
    <div className="border-b border-accent">
      <NavigationMenu className="max-w-full p-4">
        <NavigationMenuList className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            {left?.map((item: NavbarItem, index: Key) => (
              <NavigationMenuItem key={index}>
                {item.href ? (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base font-bold`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  item.component
                )}
              </NavigationMenuItem>
            ))}
          </div>
          <div className="flex flex-row gap-3">
            {right?.map((item: NavbarItem, index: Key) => (
              <NavigationMenuItem key={index}>
                {item.href ? (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-base font-bold`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  item.component
                )}
              </NavigationMenuItem>
            ))}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
