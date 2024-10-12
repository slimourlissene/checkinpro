import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme";
import Navbar from "@/components/global/navbar";
import { auth } from "./auth";
import Providers from "./providers";
import { Toaster } from "sonner";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster richColors position="top-center" duration={1500} />
        </Providers>
      </body>
    </html>
  );
}
