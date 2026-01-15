import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"]
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
