import { IconName } from "../icons";

// Types co-located with contact data
export interface ContactMethod {
  icon: IconName;
  title: string;
  description: string;
  value: string;
  href: string;
  action: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfoItem {
  icon: IconName;
  title: string;
  lines: string[];
}

// Contact page data
export const contactHero = {
  badge: "Contact Us",
  title: "Let's Start a",
  highlightedWord: "Conversation",
  subtitle:
    "Ready to transform your Microsoft environment? Have a question about our services? We'd love to hear from you.",
};

export const contactMethods: ContactMethod[] = [
  {
    icon: "Mail",
    title: "Email Us",
    description: "Get in touch for general enquiries",
    value: "hello@hivemindsolutions.com.au",
    href: "mailto:hello@hivemindsolutions.com.au",
    action: "Send Email",
  },
  {
    icon: "Phone",
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+61 8 8123 4567",
    href: "tel:+61881234567",
    action: "Call Now",
  },
  {
    icon: "Linkedin",
    title: "Connect",
    description: "Follow us on LinkedIn",
    value: "Hivemind Solutions",
    href: "https://linkedin.com",
    action: "Follow Us",
  },
];

export const contactInfo: ContactInfoItem[] = [
  {
    icon: "MessageSquare",
    title: "Quick Response",
    lines: ["We typically respond to enquiries within 4 business hours."],
  },
  {
    icon: "Clock",
    title: "Business Hours",
    lines: [
      "Monday – Friday: 8:30 AM – 5:30 PM ACST",
      "Emergency support available for managed clients",
    ],
  },
  {
    icon: "MapPin",
    title: "Local Expertise",
    lines: [
      "Based in Adelaide, serving South Australian businesses with local knowledge and support.",
    ],
  },
];

export const contactFaqs: FaqItem[] = [
  {
    question: "What industries do you specialise in?",
    answer:
      "We work with organisations across all industries, with particular experience in healthcare, professional services, manufacturing, and education. Our Microsoft expertise applies regardless of your sector.",
  },
  {
    question: "Do you offer remote support?",
    answer:
      "Yes, most of our support and consulting services are delivered remotely. We use secure remote access tools and video conferencing to work with clients across South Australia and beyond.",
  },
  {
    question: "What size organisations do you work with?",
    answer:
      "We support organisations of all sizes, from growing businesses with 20 users to enterprises with thousands. Our solutions and support plans scale to match your needs.",
  },
  {
    question: "How quickly can you start a new project?",
    answer:
      "For most consulting engagements, we can begin within 1-2 weeks of agreement. Emergency support requests are typically addressed within hours.",
  },
];

export const contactCta = {
  title: "Ready to Get Started?",
  subtitle:
    "Take the first step toward a better Microsoft environment. Our team is ready to discuss your needs and how we can help.",
  ctas: [
    { label: "Email Us Now", href: "mailto:hello@hivemindsolutions.com.au", variant: "primary" as const },
    { label: "Call +61 8 8123 4567", href: "tel:+61881234567", variant: "outline" as const },
  ],
};
