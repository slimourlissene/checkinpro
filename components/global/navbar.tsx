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
import { ToggleTheme } from "./toggleTheme";
import Login from "../auth/login";
import Logout from "../auth/logout";
import { auth } from "@/app/auth";

export default async function Navbar() {
  const session = await auth();
  const left: NavbarItem[] = [
    {
      label: "Accueil",
      href: "/",
    },
    ...(session ? [{ label: "Mes émargements", href: "/checkins" }] : []),
  ];
  const right: NavbarItem[] = [
    ...(session
      ? [{ label: "Mon compte", href: "/account" }, { component: <Logout /> }]
      : [
          { component: <Login /> },
          { label: "Comment obtenir un compte ?", href: "/register" },
        ]),
    { component: <ToggleTheme /> },
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
