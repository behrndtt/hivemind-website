"use client";
import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Logo } from "@/components/ui/logo";
import { getIcon } from "@/lib/icons";
import { tinaField } from "tinacms/dist/react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const footer = globalSettings?.footer;

  if (!footer) return null;

  return (
    <footer className="bg-background border-t border-border">
      {/* Gradient separator */}
      <div className="h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Logo iconOnly className="h-12 w-auto" />
            </Link>
            {footer.tagline && (
              <p 
                className="text-muted-foreground text-sm leading-relaxed"
                data-tina-field={tinaField(footer, "tagline")}
              >
                {footer.tagline}
              </p>
            )}
            
            {/* Contact Info */}
            {footer.contact && (
              <div className="space-y-3" data-tina-field={tinaField(footer, "contact")}>
                {footer.contact.email && (
                  <a 
                    href={`mailto:${footer.contact.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    {footer.contact.email}
                  </a>
                )}
                {footer.contact.phone && (
                  <a 
                    href={`tel:${footer.contact.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    {footer.contact.phone}
                  </a>
                )}
                {footer.contact.address && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    {footer.contact.address}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Columns */}
          {footer.columns?.map((column, idx) => (
            <div key={idx} data-tina-field={tinaField(column)} className="flex flex-col gap-4">
              <h3 className="text-foreground font-semibold">{column?.title}</h3>
              <ul className="space-y-3">
                {column?.links?.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link?.href || "#"}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      data-tina-field={tinaField(link)}
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p 
            className="text-muted-foreground text-sm"
            data-tina-field={tinaField(footer, "copyright")}
          >
            {footer.copyright || `© ${new Date().getFullYear()} Hivemind Solutions. All rights reserved.`}
          </p>

          {/* Social Links */}
          {footer.social && footer.social.length > 0 && (
            <div className="flex items-center gap-4">
              {footer.social.map((link, idx) => {
                const IconComponent = getIcon(link?.platform || "Linkedin");
                return (
                  <a
                    key={idx}
                    href={link?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link?.platform || undefined}
                    data-tina-field={tinaField(link)}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
