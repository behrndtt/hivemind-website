import React from "react";
import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hivemind Solutions | Microsoft 365, Azure & Intune Consulting | Adelaide",
    template: "%s | Hivemind Solutions",
  },
  description:
    "Adelaide-based Microsoft cloud consulting specialists. Expert solutions for Microsoft 365, Azure, Intune & Entra ID. Transform your business with trusted local expertise.",
  keywords: [
    "Microsoft 365 consulting",
    "Azure consulting Adelaide",
    "Intune MDM",
    "Entra ID",
    "Microsoft cloud migration",
    "IT consulting Adelaide",
    "Essential Eight compliance",
    "Microsoft Copilot",
  ],
  authors: [{ name: "Hivemind Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Hivemind Solutions",
    title: "Hivemind Solutions | Microsoft Cloud Consulting Adelaide",
    description:
      "Adelaide-based Microsoft cloud consulting specialists. Expert solutions for Microsoft 365, Azure, Intune & Entra ID.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hivemind Solutions | Microsoft Cloud Consulting Adelaide",
    description:
      "Adelaide-based Microsoft cloud consulting specialists. Expert solutions for Microsoft 365, Azure, Intune & Entra ID.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} min-h-screen bg-background font-sans antialiased flex flex-col text-foreground`}>
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
