"use client";

import { Menu, X, Cloud, Shield, Headphones, MonitorCog, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const consultingServices = [
  {
    title: "Cloud Architecture & Design",
    description: "Strategic planning and architecture for Microsoft 365, Azure, and hybrid environments",
    href: "/services/consulting#cloud-architecture",
    icon: Cloud,
  },
  {
    title: "Migration & Deployment",
    description: "Seamless transitions to cloud platforms with zero disruption",
    href: "/services/consulting#migration",
    icon: Building2,
  },
  {
    title: "Copilot & AI Integration",
    description: "Harness Microsoft Copilot to transform productivity across your organisation",
    href: "/services/consulting#copilot",
    icon: MonitorCog,
  },
  {
    title: "Identity & Entra ID",
    description: "Secure, streamlined identity management and Zero Trust architecture",
    href: "/services/consulting#identity",
    icon: Shield,
  },
];

const supportServices = [
  {
    title: "Endpoint Management (Intune)",
    description: "Modern device management across Windows, macOS, iOS, and Android",
    href: "/services/support#endpoint",
    icon: MonitorCog,
  },
  {
    title: "Security & Compliance",
    description: "Essential Eight maturity and Microsoft Defender implementation",
    href: "/services/support#security",
    icon: Shield,
  },
  {
    title: "Monitoring & Optimisation",
    description: "Proactive 24/7 monitoring, health checks, and performance tuning",
    href: "/services/support#monitoring",
    icon: Cloud,
  },
  {
    title: "Helpdesk & Support Plans",
    description: "Flexible support packages from ad-hoc to fully managed",
    href: "/services/support#helpdesk",
    icon: Headphones,
  },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={cn(
          "fixed z-50 w-full transition-all duration-300",
          scrolled 
            ? "bg-black/50 backdrop-blur-md" 
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo className="text-white" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {menuState ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavigationMenu delayDuration={0}>
                <NavigationMenuList>
                  {/* Services Mega Menu */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-800/50 focus:bg-zinc-800/50 focus:text-white active:bg-zinc-800/50 active:text-white data-[state=open]:bg-zinc-800/50 data-[state=open]:text-white"
                      onPointerEnter={(e) => e.preventDefault()}
                      onPointerMove={(e) => e.preventDefault()}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Consulting Column */}
                          <div>
                            <Link
                              href="/services/consulting"
                              className="mb-4 block text-sm font-semibold text-primary hover:underline"
                            >
                              Consulting Services →
                            </Link>
                            <ul className="space-y-3">
                              {consultingServices.map((service) => (
                                <li key={service.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={service.href}
                                      className="group flex gap-3 rounded-lg p-3 hover:bg-zinc-800/50 transition-colors"
                                    >
                                      <service.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                      <div>
                                        <div className="text-sm font-medium text-zinc-200 group-hover:text-primary transition-colors">
                                          {service.title}
                                        </div>
                                        <p className="text-sm text-zinc-500 line-clamp-2">
                                          {service.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Support Column */}
                          <div>
                            <Link
                              href="/services/support"
                              className="mb-4 block text-sm font-semibold text-primary hover:underline"
                            >
                              Support Services →
                            </Link>
                            <ul className="space-y-3">
                              {supportServices.map((service) => (
                                <li key={service.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={service.href}
                                      className="group flex gap-3 rounded-lg p-3 hover:bg-zinc-800/50 transition-colors"
                                    >
                                      <service.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                      <div>
                                        <div className="text-sm font-medium text-zinc-200 group-hover:text-primary transition-colors">
                                          {service.title}
                                        </div>
                                        <p className="text-sm text-zinc-500 line-clamp-2">
                                          {service.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Flat Nav Links */}
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/50 hover:text-white focus:bg-zinc-800/50 focus:text-white focus:outline-none"
                        >
                          {link.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel - Positioned outside the relative container */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuState 
              ? "max-h-[500px] opacity-100" 
              : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-4 mb-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
            <div className="space-y-6">
              {/* Services Section */}
              <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Services
                </div>
                <div className="space-y-2">
                  <Link
                    href="/services/consulting"
                    onClick={() => setMenuState(false)}
                    className="block py-2 text-zinc-300 hover:text-primary transition-colors"
                  >
                    Consulting Services
                  </Link>
                  <Link
                    href="/services/support"
                    onClick={() => setMenuState(false)}
                    className="block py-2 text-zinc-300 hover:text-primary transition-colors"
                  >
                    Support Services
                  </Link>
                </div>
              </div>

              {/* Nav Links */}
              <div className="space-y-2 border-t border-zinc-800 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuState(false)}
                    className="block py-2 text-zinc-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-zinc-800">
                <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  <Link href="/contact" onClick={() => setMenuState(false)}>
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-[72px]" />
    </header>
  );
}
