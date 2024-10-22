"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { SidebarMenuButton } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { SunMoon } from "lucide-react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <SidebarMenuButton onClick={toggleTheme}>
      <SunMoon />
      <span>Changer de theme</span>
    </SidebarMenuButton>
  );
}
