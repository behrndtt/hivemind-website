import { IconName } from "../icons";

// Types co-located with about data
export interface TeamMember {
  name: string;
  role: string;
  description: string;
  linkedin?: string;
  avatar?: string;
}

export interface ValueItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  event: string;
}

// About page data
export const aboutHero = {
  badge: "About Hivemind Solutions",
  title: "Adelaide's Trusted",
  highlightedWord: "Microsoft Partner",
  subtitle:
    "We're a passionate team of Microsoft specialists dedicated to helping South Australian businesses thrive in the cloud. From startups to enterprises, we deliver solutions that work.",
};

export const aboutStory = {
  badge: "Our Story",
  title: "Born from a Vision for Better IT",
  paragraphs: [
    "Hivemind Solutions was founded with a simple but powerful idea: that every business deserves access to enterprise-grade Microsoft technology, implemented by people who genuinely care about outcomes.",
    "Based in Adelaide, we've grown from a small consultancy into a trusted partner for organisations across South Australia. Our team combines deep technical expertise with a genuine passion for solving complex problems.",
    "We specialise in Microsoft 365, Azure, Intune, and Entra ID—the four pillars that power modern workplaces. Whether you're migrating to the cloud, securing your endpoints, or optimising your existing environment, we bring the expertise to make it happen.",
  ],
};

export const aboutMilestones: Milestone[] = [
  { year: "2021", event: "Hivemind Solutions founded in Adelaide" },
  { year: "2022", event: "Established Microsoft partnership and core services" },
  { year: "2023", event: "First employees hired and expanded interstate and internationally" },
  { year: "2024", event: "Shifted to strategic long-term partnership approach" },
  { year: "2025", event: "Advanced IaC automation with Terraform and team upskilling" },
];

export const aboutValues: ValueItem[] = [
  {
    icon: "Target",
    title: "Client-Focused",
    description:
      "Every solution we deliver is tailored to your unique business needs and objectives.",
  },
  {
    icon: "Shield",
    title: "Security-First",
    description:
      "We embed security best practices into every project, protecting your data and reputation.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation-Driven",
    description:
      "We stay ahead of the curve, bringing you the latest Microsoft technologies and practices.",
  },
  {
    icon: "Heart",
    title: "Partnership Mindset",
    description:
      "We build long-term relationships, becoming an extension of your team.",
  },
];

export const aboutTeam: TeamMember[] = [
  {
    name: "Will W.",
    role: "Director",
    description:
      "Leading Hivemind's strategic vision with over 15 years of experience in enterprise technology solutions and Microsoft partnerships.",
    linkedin: "#",
  },
  {
    name: "Heath B.",
    role: "Senior Consultant",
    description:
      "Specialising in complex cloud migrations and Microsoft 365 architecture, bringing deep technical expertise to every engagement.",
    linkedin: "#",
  },
  {
    name: "Dave H.",
    role: "Consultant",
    description:
      "Expert in Intune deployment and endpoint management, helping organisations achieve seamless device management at scale.",
    linkedin: "#",
  },
  {
    name: "Sam B.",
    role: "Consultant",
    description:
      "Focused on security and compliance, ensuring clients meet Essential Eight and industry standards across their Microsoft environments.",
    linkedin: "#",
  },
];

export const aboutCta = {
  icon: "Award",
  title: "Ready to Work Together?",
  subtitle:
    "Let's discuss how Hivemind Solutions can help transform your Microsoft environment and drive real business results.",
  ctas: [
    { label: "Get in Touch", href: "/contact", variant: "primary" as const },
    { label: "Explore Our Services", href: "/services/consulting", variant: "outline" as const },
  ],
};
