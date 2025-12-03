import { IconName } from "../icons";

// Re-export posts and helpers from dedicated posts file
export {
  caseStudiesPosts as caseStudies,
  getPublishedCaseStudies,
  getDraftCaseStudies,
  getFeaturedCaseStudy,
  getNonFeaturedPublishedCaseStudies,
  getCaseStudyById,
} from "./case-studies-posts";

// Re-export Post type for backwards compatibility
export type { Post as CaseStudy } from "./posts";

// Legacy types (kept for backwards compatibility)
export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface KeyOutcome {
  icon: IconName;
  value: string;
  label: string;
}

// Case studies page configuration
export const caseStudiesHero = {
  badge: "Case Studies",
  title: "Real Results for",
  highlightedWord: "Real Businesses",
  subtitle:
    "Explore how we've helped South Australian organisations transform their Microsoft environments and achieve measurable business outcomes.",
};

export const keyOutcomes: KeyOutcome[] = [
  {
    icon: "Clock",
    value: "100+",
    label: "Migrations Completed",
  },
  {
    icon: "Users",
    value: "5,000+",
    label: "Users Supported",
  },
  {
    icon: "Shield",
    value: "Zero",
    label: "Security Incidents",
  },
  {
    icon: "TrendingDown",
    value: "35%",
    label: "Average Cost Reduction",
  },
];

export const caseStudiesCta = {
  title: "Ready to Be Our Next Success Story?",
  subtitle:
    "Let's discuss how we can help your organisation achieve similar results.",
  ctas: [
    { label: "Start a Conversation", href: "/contact", variant: "primary" as const },
    { label: "Explore Our Services", href: "/services/consulting", variant: "outline" as const },
  ],
};
