import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/navigation/sidebar";
import { auth } from "./auth";
import { useTheme } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "CheckInPro - Gestion d'émargement électronique",
  description: "CheckInPro votre application de gestion d'émargement",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      >
        <Providers>
          <Sidebar user={session?.user} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            {children}
          </SidebarInset>
          <Toaster richColors position="top-center" duration={1500} />
        </Providers>
      </body>
    </html>
  );
}
