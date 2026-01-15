import { IconName } from "../icons";

// Types co-located with home data
export interface PillarItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface ServiceOverview {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: IconName;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

export interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

// Home page data
export const homeHero = {
  badge: {
    icon: "Award" as IconName,
    text: "Adelaide's Microsoft Cloud Specialists",
  },
  title: "Transform Your Business with",
  highlightedWord: "Microsoft Cloud",
  subtitle:
    "Expert consulting and support for Microsoft 365, Azure, Intune, and Entra ID. Local Adelaide expertise with enterprise-grade solutions.",
  primaryCta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services/consulting" },
};

export const homeStats: StatItem[] = [
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Active Clients" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support Available" },
];

export const homePillars: PillarItem[] = [
  {
    title: "Microsoft 365",
    description:
      "Complete productivity suite implementation, migration, and optimisation for modern workplaces.",
    icon: "Cloud",
  },
  {
    title: "Azure",
    description:
      "Cloud infrastructure design, deployment, and management for scalable business solutions.",
    icon: "Cloud",
  },
  {
    title: "Intune & Endpoint",
    description:
      "Modern device management across all platforms with security-first approach.",
    icon: "Shield",
  },
  {
    title: "Entra ID & Security",
    description:
      "Identity management, Zero Trust architecture, and compliance frameworks.",
    icon: "Shield",
  },
];

export const homeServices: ServiceOverview[] = [
  {
    title: "Consulting Services",
    description:
      "Strategic planning, architecture design, migrations, Copilot integration, and identity solutions.",
    href: "/services/consulting",
    icon: "Cloud",
  },
  {
    title: "Support Services",
    description:
      "Endpoint management, security compliance, monitoring, and flexible helpdesk packages.",
    href: "/services/support",
    icon: "Headphones",
  },
];

export const homeWhyChooseUs = {
  title: "Why Adelaide Businesses Choose Hivemind",
  description:
    "We combine deep Microsoft technical expertise with genuine local understanding. As Adelaide's dedicated Microsoft cloud specialists, we deliver enterprise-grade solutions with the personalised service you deserve.",
  features: [
    "Microsoft certified consultants with real-world experience",
    "Local Adelaide team for responsive, face-to-face support",
    "Proven track record across healthcare, finance, and government",
    "Transparent pricing with no hidden costs",
    "24/7 monitoring and emergency support options",
  ],
  cta: { label: "Meet Our Team", href: "/about" },
};

export const homeTestimonials: Testimonial[] = [
  {
    quote:
      "Hivemind Solutions transformed our IT infrastructure. The migration to Microsoft 365 was seamless, and their ongoing support has been exceptional.",
    author: "Sarah T.",
    role: "IT Manager",
    company: "Allied Health Group",
    rating: 5,
  },
  {
    quote:
      "Their expertise in Entra ID and security compliance helped us achieve Essential Eight maturity faster than we thought possible.",
    author: "James R.",
    role: "CIO",
    company: "FinSecure",
    rating: 5,
  },
];

export const homeCta = {
  title: "Ready to Transform Your IT?",
  subtitle:
    "Let's discuss how Hivemind Solutions can help your business leverage the full power of Microsoft cloud technologies.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
};
