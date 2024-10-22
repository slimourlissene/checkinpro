import Login from "@/components/auth/login";
import { ToggleTheme } from "@/components/navigation/toggleTheme";
import { ISidebarItem } from "@/types";
import {
  BookOpen,
  CircleHelp,
  CirclePlus,
  Cookie,
  Handshake,
  Home,
  QrCode,
  Scale,
  Send,
} from "lucide-react";
import { User } from "next-auth";

export function computeSidebarGeneralItems({
  user,
}: {
  user: User | undefined;
}): ISidebarItem[] {
  return [
    {
      title: "Accueil",
      url: "/",
      icon: Home,
    },
    ...(user === undefined
      ? [
          {
            component: <Login />,
          },
          {
            title: "Comment s'inscrire ?",
            url: "/register",
            icon: CircleHelp,
          },
          { component: <ToggleTheme /> },
        ]
      : [
          {
            title: "Comment ça fonctionne ?",
            url: "/documentation",
            icon: BookOpen,
          },
          { component: <ToggleTheme /> },
        ]),
  ];
}

export function computeSidebarCheckInItems(): ISidebarItem[] {
  return [
    {
      title: "Créer un émargement",
      url: "/create",
      icon: CirclePlus,
    },
    {
      title: "Mes émargements",
      url: "/checkin",
      icon: QrCode,
    },
  ];
}

export function computeSidebarLegalItems(): ISidebarItem[] {
  return [
    {
      title: "Mentions légales",
      url: "/legal",
      icon: Scale,
    },
    {
      title: "Conditions d'utilisation",
      url: "/terms",
      icon: Handshake,
    },
    {
      title: "Politique de confidentialité",
      url: "/privacy",
      icon: Cookie,
    },
    {
      title: "Nous contacter",
      url: "/contact",
      icon: Send,
    },
  ];
}
