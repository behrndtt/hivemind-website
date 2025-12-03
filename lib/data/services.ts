import { IconName } from "../icons";

// Types co-located with services data
export interface ServiceCard {
  icon: IconName;
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface SupportPlan {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface ResponseMetric {
  metric: string;
  label: string;
  icon: IconName;
}

// Consulting page data
export const consultingHero = {
  badge: "Consulting Services",
  title: "Strategic Microsoft",
  highlightedWord: "Consulting",
  subtitle:
    "From cloud architecture to AI integration, our consulting services help you plan, design, and implement Microsoft solutions that transform your business.",
  primaryCta: { label: "Start a Conversation", href: "/contact" },
  secondaryCta: { label: "View Case Studies", href: "/case-studies" },
};

export const consultingServices: ServiceCard[] = [
  {
    icon: "Cloud",
    title: "Cloud Architecture & Design",
    description:
      "Strategic cloud architecture that aligns with your business objectives. We design scalable, secure Microsoft 365 and Azure environments built for growth.",
    features: [
      "Microsoft 365 tenant architecture",
      "Azure infrastructure design",
      "Hybrid cloud strategies",
      "Scalability planning",
      "Cost optimisation",
    ],
  },
  {
    icon: "Workflow",
    title: "Migration & Implementation",
    description:
      "Seamless migrations with minimal disruption. From on-premises Exchange to Microsoft 365, or traditional infrastructure to Azure, we ensure smooth transitions.",
    features: [
      "Email and data migration",
      "SharePoint and Teams rollout",
      "Azure VM migrations",
      "Application modernisation",
      "User adoption support",
    ],
  },
  {
    icon: "Bot",
    title: "Copilot & AI Integration",
    description:
      "Unlock the power of Microsoft Copilot across your organisation. We help you prepare, deploy, and maximise value from AI-powered productivity tools.",
    features: [
      "Copilot readiness assessment",
      "Data preparation and governance",
      "Pilot program design",
      "User training and enablement",
      "ROI measurement",
    ],
  },
  {
    icon: "ShieldCheck",
    title: "Identity & Access (Entra ID)",
    description:
      "Secure your organisation with modern identity management. We implement Zero Trust principles and streamline access across your Microsoft ecosystem.",
    features: [
      "Entra ID configuration",
      "Conditional Access policies",
      "Multi-factor authentication",
      "Privileged Identity Management",
      "SSO integration",
    ],
  },
  {
    icon: "LineChart",
    title: "Strategy & Roadmapping",
    description:
      "Technology strategy that drives business outcomes. We help you plan your Microsoft journey with clear milestones and measurable goals.",
    features: [
      "Current state assessment",
      "Gap analysis",
      "Technology roadmap creation",
      "Budget planning",
      "Executive stakeholder alignment",
    ],
  },
];

export const consultingProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, challenges, and goals through in-depth consultation.",
  },
  {
    step: "02",
    title: "Assessment",
    description:
      "Our team audits your current environment and identifies opportunities for improvement.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "We create a tailored solution architecture with clear recommendations and a phased approach.",
  },
  {
    step: "04",
    title: "Implement",
    description:
      "Expert execution with minimal disruption, following Microsoft best practices throughout.",
  },
  {
    step: "05",
    title: "Optimise",
    description:
      "Continuous improvement and knowledge transfer to ensure long-term success.",
  },
];

export const consultingBenefits: BenefitItem[] = [
  {
    icon: "Users",
    title: "Dedicated Expertise",
    description:
      "Work directly with senior Microsoft specialists who understand your industry.",
  },
  {
    icon: "Zap",
    title: "Faster Time to Value",
    description:
      "Proven methodologies that accelerate deployment and adoption.",
  },
  {
    icon: "Target",
    title: "Business-Aligned Solutions",
    description:
      "Technology decisions driven by your strategic objectives, not just features.",
  },
];

export const consultingCta = {
  title: "Need Ongoing Support?",
  subtitle:
    "Our managed support services complement our consulting work, ensuring your Microsoft environment stays optimised and secure.",
  primaryCta: { label: "Explore Support Services", href: "/services/support" },
};

// Support page data
export const supportHero = {
  badge: "Support Services",
  title: "Managed Microsoft",
  highlightedWord: "Support",
  subtitle:
    "Expert ongoing support to keep your Microsoft environment secure, optimised, and running smoothly. We're your dedicated IT team without the overhead.",
  primaryCta: { label: "Discuss Your Needs", href: "/contact" },
  secondaryCta: { label: "View Support Plans", href: "#plans" },
};

export const supportMetrics: ResponseMetric[] = [
  { metric: "< 1 hour", label: "Critical Response", icon: "AlertTriangle" },
  { metric: "< 4 hours", label: "Priority Response", icon: "Clock" },
  { metric: "98%", label: "First-Call Resolution", icon: "CheckCircle2" },
  { metric: "4.9/5", label: "Customer Satisfaction", icon: "Wrench" },
];

export const supportServices: ServiceCard[] = [
  {
    icon: "Laptop",
    title: "Endpoint & Intune Management",
    description:
      "Comprehensive device management and security through Microsoft Intune. We keep your endpoints secure, compliant, and performing at their best.",
    features: [
      "Device enrolment and configuration",
      "Application deployment",
      "Compliance policy management",
      "Autopilot configuration",
      "Remote troubleshooting",
    ],
  },
  {
    icon: "Shield",
    title: "Security & Essential Eight",
    description:
      "Proactive security management aligned with the Australian Cyber Security Centre's Essential Eight framework. We help you meet and maintain compliance.",
    features: [
      "Essential Eight assessment",
      "Security baseline configuration",
      "Patch management",
      "Application whitelisting",
      "Incident response support",
    ],
  },
  {
    icon: "Activity",
    title: "Monitoring & Alerting",
    description:
      "24/7 monitoring of your Microsoft environment with intelligent alerting. We catch issues before they become problems.",
    features: [
      "Microsoft 365 health monitoring",
      "Azure resource monitoring",
      "Performance tracking",
      "Automated alerting",
      "Monthly health reports",
    ],
  },
  {
    icon: "Headphones",
    title: "Helpdesk & User Support",
    description:
      "Responsive IT support for your team. Whether it's a password reset or a complex technical issue, we're here to help.",
    features: [
      "Phone and email support",
      "Remote assistance",
      "Issue escalation management",
      "User training and guidance",
      "Knowledge base access",
    ],
  },
  {
    icon: "FileCheck",
    title: "Managed Support Plans",
    description:
      "Flexible support packages designed for your business. From ad-hoc assistance to fully managed services, we have options to suit every need.",
    features: [
      "Hourly support blocks",
      "Monthly retainer plans",
      "Dedicated account management",
      "Quarterly business reviews",
      "Priority response times",
    ],
  },
];

export const supportPlans: SupportPlan[] = [
  {
    name: "Essential",
    description: "For businesses needing occasional expert support",
    features: [
      "10 hours monthly support",
      "Business hours coverage",
      "Email and phone support",
      "48-hour response time",
      "Monthly health report",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Our most popular plan for growing organisations",
    features: [
      "25 hours monthly support",
      "Extended hours coverage",
      "Priority response (4 hours)",
      "Proactive monitoring",
      "Quarterly business review",
      "Dedicated account manager",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Comprehensive support for complex environments",
    features: [
      "Unlimited support hours",
      "24/7 emergency coverage",
      "1-hour critical response",
      "Advanced monitoring & alerting",
      "Monthly business review",
      "On-site support available",
      "Security incident response",
    ],
    highlighted: false,
  },
];

export const supportTestimonial = {
  quote:
    "Hivemind's support team feels like an extension of our own IT department. Their response times are excellent, and they genuinely understand our business needs.",
  author: "Michael R.",
  role: "IT Manager, Professional Services",
  rating: 5,
};

export const supportCta = {
  title: "Ready for Better IT Support?",
  subtitle:
    "Let's discuss how our managed support services can help your organisation run more smoothly.",
  primaryCta: { label: "Get in Touch", href: "/contact" },
  secondaryCta: { label: "View Consulting Services", href: "/services/consulting" },
};
