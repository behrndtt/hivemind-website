"use client";

import { ArrowUp, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { name: "Consulting Services", href: "/services/consulting" },
      { name: "Support Services", href: "/services/support" },
      { name: "Cloud Architecture", href: "/services/consulting#cloud-architecture" },
      { name: "Migration & Deployment", href: "/services/consulting#migration" },
      { name: "Endpoint Management", href: "/services/support#endpoint" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Insights", href: "/insights" },
      { name: "Contact", href: "/contact" },
    ],
    specialties: [
      { name: "Microsoft 365", href: "/services/consulting" },
      { name: "Azure", href: "/services/consulting" },
      { name: "Intune & Endpoint", href: "/services/support#endpoint" },
      { name: "Entra ID & Security", href: "/services/consulting#identity" },
    ],
  };

  const contactInfo = {
    email: "hello@hivemindsolutions.com.au",
    phone: "+61 8 8123 4567",
    location: "Adelaide, South Australia",
  };

  return (
    <footer className="relative bg-black border-t border-zinc-800">
      {/* Gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Logo className="text-white" />
            </Link>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed max-w-sm">
              Adelaide-based Microsoft cloud consulting specialists. Expert solutions 
              for Microsoft 365, Azure, Intune & Entra ID.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <MapPin className="w-4 h-4" />
                {contactInfo.location}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com/company/hivemindsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-primary/50 hover:text-primary transition-all text-zinc-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-primary/50 hover:text-primary transition-all text-zinc-400"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Links */}
          <div>
            <h4 className="text-white mb-4">
              Specialties
            </h4>
            <ul className="space-y-3">
              {footerLinks.specialties.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Hivemind Solutions. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-primary hover:border-primary/50 transition-all text-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
