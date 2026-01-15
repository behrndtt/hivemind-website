"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { tinaField } from "tinacms/dist/react";
import type { GlobalHeaderNav } from "@/tina/__generated__/types";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings?.header;
  
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!header) return null;

  const navItems = (header.nav || []) as GlobalHeaderNav[];
  const cta = header.cta;

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
              <Logo className="text-foreground" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {menuState ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation - Only render after mount to prevent hydration mismatch */}
            {mounted && (
              <div className="hidden lg:flex items-center gap-1">
                <NavigationMenu delayDuration={0}>
                  <NavigationMenuList>
                    {navItems.map((item, idx) => {
                    // Check if this is a dropdown item
                    if (item.__typename === "GlobalHeaderNavDropdown") {
                      const columns = item.columns || [];
                      const columnCount = Math.min(columns.length, 3);
                      
                      return (
                        <NavigationMenuItem key={idx}>
                          <NavigationMenuTrigger 
                            className="bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50 focus:bg-muted/50 focus:text-foreground active:bg-muted/50 active:text-foreground data-[state=open]:bg-muted/50 data-[state=open]:text-foreground"
                            onPointerEnter={(e) => e.preventDefault()}
                            onPointerMove={(e) => e.preventDefault()}
                            data-tina-field={tinaField(item, "label")}
                          >
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div 
                              className={cn(
                                "p-6 bg-card border border-border rounded-xl",
                                columnCount === 1 && "w-100",
                                columnCount === 2 && "w-175",
                                columnCount === 3 && "w-250"
                              )}
                            >
                              <div 
                                className={cn(
                                  "grid gap-8",
                                  columnCount === 1 && "grid-cols-1",
                                  columnCount === 2 && "grid-cols-2",
                                  columnCount === 3 && "grid-cols-3"
                                )}
                              >
                                {columns.map((column, colIdx) => (
                                  <div key={colIdx} data-tina-field={tinaField(column)}>
                                    <Link
                                      href={column?.href || "#"}
                                      className="mb-4 block text-sm font-semibold text-primary hover:underline"
                                    >
                                      {column?.title} →
                                    </Link>
                                    <ul className="space-y-3">
                                      {column?.items?.slice(0, 4).map((subItem, subIdx) => {
                                        const IconComponent = getIcon(subItem?.icon || "Cloud");
                                        return (
                                          <li key={subIdx}>
                                            <NavigationMenuLink asChild>
                                              <Link
                                                href={subItem?.href || "#"}
                                                className="group flex gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors"
                                                data-tina-field={tinaField(subItem)}
                                              >
                                                {IconComponent && (
                                                  <IconComponent className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                                )}
                                                <div>
                                                  <div className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                                                    {subItem?.title}
                                                  </div>
                                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {subItem?.description}
                                                  </p>
                                                </div>
                                              </Link>
                                            </NavigationMenuLink>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }

                    // Simple link item
                    if (item.__typename === "GlobalHeaderNavLink") {
                      return (
                        <NavigationMenuItem key={idx}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href || "#"}
                              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground focus:outline-none"
                              data-tina-field={tinaField(item)}
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }

                    return null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            )}

            {/* Desktop CTA */}
            {cta && (
              <div className="hidden lg:flex items-center" data-tina-field={tinaField(header, "cta")}>
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
                  <Link href={cta.href || "/contact"}>{cta.label || "Contact Us"}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuState 
              ? "max-h-[500px] opacity-100" 
              : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-4 mb-4 p-6 bg-card border border-border rounded-xl shadow-xl">
            <div className="space-y-6">
              {navItems.map((item, idx) => {
                // Dropdown: show section header + column titles only (no feature/icon items)
                if (item.__typename === "GlobalHeaderNavDropdown") {
                  const columns = item.columns || [];
                  return (
                    <div key={idx}>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {item.label}
                      </div>
                      <div className="space-y-2">
                        {columns.map((column, colIdx) => (
                          <Link
                            key={colIdx}
                            href={column?.href || "#"}
                            onClick={() => setMenuState(false)}
                            className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                          >
                            {column?.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Simple link
                if (item.__typename === "GlobalHeaderNavLink") {
                  return (
                    <Link
                      key={idx}
                      href={item.href || "#"}
                      onClick={() => setMenuState(false)}
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return null;
              })}

              {/* Mobile CTA */}
              {cta && (
                <div className="pt-4 border-t border-border">
                  <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    <Link href={cta.href || "/contact"} onClick={() => setMenuState(false)}>
                      {cta.label || "Contact Us"}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-[72px]" />
    </header>
  );
};
