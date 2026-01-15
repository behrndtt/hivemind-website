// Re-export posts and helpers from dedicated posts file
export {
  insightsPosts as insights,
  getPublishedInsights,
  getDraftInsights,
  getFeaturedInsight,
  getInsightById,
} from "./insights-posts";

// Types for insights page
export interface Category {
  name: string;
  slug: string;
  count: number;
  active?: boolean;
}

// Insights page configuration
export const insightsHero = {
  badge: "Insights & Resources",
  title: "Microsoft",
  highlightedWord: "Insights",
  titleSuffix: "from the Hivemind",
  subtitle:
    "Practical guidance, industry updates, and expert perspectives on Microsoft technologies—helping you make informed decisions for your business.",
};

export const insightsCategories: Category[] = [
  { name: "All", slug: "all", count: 0, active: true },
  { name: "Microsoft 365", slug: "microsoft-365", count: 0 },
  { name: "Azure", slug: "azure", count: 0 },
  { name: "Security", slug: "security", count: 0 },
  { name: "Intune", slug: "intune", count: 0 },
  { name: "Copilot", slug: "copilot", count: 0 },
];

export const insightsCta = {
  title: "Need Expert Guidance Now?",
  subtitle:
    "While we're building our insights library, our team is ready to answer your Microsoft questions directly.",
  primaryCta: { label: "Talk to an Expert", href: "/contact" },
  secondaryCta: { label: "Learn About Us", href: "/about" },
};
