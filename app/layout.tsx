import React from "react";
import { Metadata } from "next";
import { DM_Sans, Urbanist } from "next/font/google";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700", "800"],
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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Hivemind Solutions",
    description:
      "Adelaide-based Microsoft cloud consulting specialists. Expert solutions for Microsoft 365, Azure, Intune & Entra ID.",
    url: "https://hivemindsolutions.com.au",
    email: "hello@hivemindsolutions.com.au",
    telephone: "+61881234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      addressCountry: "AU",
    },
    areaServed: "AU",
    sameAs: ["https://www.linkedin.com/company/hivemind-solutions"],
    knowsAbout: [
      "Microsoft 365",
      "Microsoft Azure",
      "Microsoft Intune",
      "Microsoft Entra ID",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${urbanist.variable} min-h-screen bg-background font-sans antialiased flex flex-col text-foreground`}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
