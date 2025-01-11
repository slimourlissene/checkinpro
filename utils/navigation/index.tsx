import Login from "@/components/auth/login";
import CreateCheckin from "@/components/checkin/createCheckin";
import ScanQRCode from "@/components/checkin/scanQRCode";
import { ToggleTheme } from "@/components/navigation/toggleTheme";
import { ISidebarItem, IUserWithCompany } from "@/types";
import {
  BookOpen,
  CircleHelp,
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

export function computeSidebarCheckInItems({
  user,
}: {
  user: IUserWithCompany;
}): ISidebarItem[] {
  return user?.isChief === true
    ? [
        {
          component: <CreateCheckin />,
        },
        {
          component: <ScanQRCode />,
        },
        {
          title: "Mes émargements",
          url: "/checkin",
          icon: QrCode,
        },
      ]
    : [
        {
          component: <ScanQRCode />,
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
