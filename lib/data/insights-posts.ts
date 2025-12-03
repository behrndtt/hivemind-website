import { Post } from "./posts";

/**
 * Insights posts data
 * Separate from page configuration to keep content modular
 */
export const insightsPosts: Post[] = [
  // Published insights
  {
    id: "getting-started-with-copilot",
    type: "insight",
    title: "Getting Started with Microsoft Copilot: A Practical Guide",
    category: "Copilot",
    summary:
      "A comprehensive guide to rolling out Microsoft Copilot in your organisation, including licensing, training, and best practices for adoption.",
    content: `
## Why Copilot Matters for Your Business

Microsoft Copilot represents a fundamental shift in how we interact with productivity tools. By embedding AI directly into the Microsoft 365 apps your team already uses, Copilot can dramatically reduce time spent on routine tasks while improving the quality of outputs.

## Before You Begin: Prerequisites

Before rolling out Copilot, ensure your organisation has:

- **Microsoft 365 E3 or E5 licenses** (or equivalent)
- **Copilot for Microsoft 365 licenses** for each user
- **Azure AD properly configured** with appropriate security policies
- **Data governance policies** in place (Copilot can access what users can access)

## Rolling Out Copilot: A Phased Approach

### Phase 1: Pilot Group (Weeks 1-4)

Start with a small group of enthusiastic early adopters. Select 10-20 users across different departments who are:

- Comfortable with technology
- Willing to provide feedback
- Representative of your broader user base

### Phase 2: Department Rollout (Weeks 5-8)

Expand to entire departments based on pilot learnings. Focus on teams that will see the most immediate benefit, such as:

- Marketing teams (content creation)
- Sales teams (email and proposal writing)
- HR teams (policy documentation)

### Phase 3: Organisation-Wide (Weeks 9-12)

Complete the rollout with comprehensive training and support resources in place.

## Training Best Practices

Effective Copilot adoption requires more than just turning on licenses. Consider:

1. **Hands-on workshops** demonstrating real-world use cases
2. **Department-specific training** tailored to each team's workflows
3. **Prompt engineering basics** to help users get better results
4. **Regular check-ins** to address questions and share tips

## Measuring Success

Track these metrics to measure your Copilot ROI:

- Time saved on document creation
- Meeting summary adoption rates
- User satisfaction scores
- Reduction in repetitive tasks

## Common Pitfalls to Avoid

- **Rushing the rollout** without proper training
- **Ignoring data governance** considerations
- **Setting unrealistic expectations** about AI capabilities
- **Failing to gather feedback** from users

## Next Steps

Ready to get started with Copilot? Contact our team for a personalised assessment of your organisation's readiness and a tailored rollout plan.
    `,
    tags: ["Copilot", "Microsoft 365", "AI", "Productivity"],
    author: {
      name: "Heath B.",
      role: "Senior Consultant",
    },
    readingTime: 8,
    publishedAt: "2024-11-15",
    featured: true,
  },
  {
    id: "essential-eight-compliance-guide",
    type: "insight",
    title: "Essential Eight Compliance: What Adelaide Businesses Need to Know",
    category: "Security",
    summary:
      "Understanding the Essential Eight security framework and how to achieve compliance using Microsoft technologies.",
    content: `
## What is the Essential Eight?

The Essential Eight is a set of baseline mitigation strategies developed by the Australian Cyber Security Centre (ACSC). Originally designed for Australian government agencies, these strategies have become the gold standard for cybersecurity across all sectors.

## The Eight Strategies

### 1. Application Control

Prevent execution of unapproved programs. Microsoft solutions include:

- **Windows Defender Application Control (WDAC)**
- **AppLocker policies** via Group Policy or Intune

### 2. Patch Applications

Keep applications up to date. Leverage:

- **Microsoft Endpoint Manager** for application updates
- **Windows Update for Business** for automatic patching

### 3. Configure Microsoft Office Macro Settings

Block macros from the internet. Use:

- **Attack Surface Reduction rules** in Microsoft Defender
- **Office cloud policy service** for consistent settings

### 4. User Application Hardening

Block web ads, Java, and Flash. Implement:

- **Microsoft Edge security policies**
- **Defender SmartScreen** for browser protection

### 5. Restrict Administrative Privileges

Limit admin access. Use:

- **Azure AD Privileged Identity Management (PIM)**
- **Just-in-time admin access** policies

### 6. Patch Operating Systems

Keep Windows updated. Deploy:

- **Windows Autopatch** for automated updates
- **Update compliance reporting** via Intune

### 7. Multi-Factor Authentication

Require MFA everywhere. Implement:

- **Azure AD Conditional Access**
- **Microsoft Authenticator** app

### 8. Regular Backups

Protect against ransomware. Use:

- **Microsoft 365 retention policies**
- **Azure Backup** for comprehensive protection

## Achieving Compliance

Most organisations can achieve Essential Eight Maturity Level 2 using native Microsoft 365 and Azure tools. Our team can assess your current state and create a roadmap to compliance.
    `,
    tags: ["Security", "Essential Eight", "Compliance", "Microsoft 365"],
    author: {
      name: "Sam B.",
      role: "Consultant",
    },
    readingTime: 12,
    publishedAt: "2024-10-20",
  },
  {
    id: "azure-cost-optimisation",
    type: "insight",
    title: "Azure Cost Optimisation: Tips from the Field",
    category: "Azure",
    summary:
      "Practical strategies for reducing your Azure spending without sacrificing performance or reliability.",
    content: `
## Why Azure Costs Spiral

We've seen it countless times: organisations migrate to Azure expecting cost savings, only to find their bills higher than anticipated. The good news? Most overspending is preventable with the right strategies.

## Quick Wins

### 1. Right-Size Your VMs

Over 70% of Azure VMs are over-provisioned. Use Azure Advisor to identify opportunities:

- **Review CPU and memory utilisation** over 30 days
- **Downsize underutilised VMs** one tier at a time
- **Consider B-series VMs** for variable workloads

### 2. Use Reserved Instances

Commit to 1 or 3-year terms for predictable workloads:

- **Save up to 72%** compared to pay-as-you-go
- **Exchange or cancel** with flexibility options
- **Start with production workloads** you know will run continuously

### 3. Shut Down Dev/Test Resources

Non-production resources don't need to run 24/7:

- **Implement auto-shutdown schedules** via Azure Automation
- **Use Azure DevTest Labs** for developer environments
- **Consider Azure Spot VMs** for fault-tolerant workloads

### 4. Optimise Storage

Storage costs accumulate quickly:

- **Move cold data** to Archive tier
- **Delete orphaned disks** and snapshots
- **Review blob lifecycle policies**

## Governance Strategies

### Implement Budgets and Alerts

- Set budgets at the subscription and resource group level
- Configure alerts at 50%, 75%, and 90% thresholds
- Review spending weekly with stakeholders

### Use Tags Consistently

- Tag resources with cost centre, environment, and owner
- Run monthly reports by tag to identify trends
- Automate tag enforcement with Azure Policy

## Long-Term Optimisation

- **Consider Azure Hybrid Benefit** for Windows Server and SQL
- **Evaluate PaaS alternatives** to IaaS workloads
- **Review architecture** for serverless opportunities

## Need Help?

Our team can conduct an Azure cost review and identify savings opportunities specific to your environment.
    `,
    tags: ["Azure", "Cost Optimisation", "Cloud", "Infrastructure"],
    author: {
      name: "Will W.",
      role: "Director",
    },
    readingTime: 10,
    publishedAt: "2024-09-10",
  },

  // Draft insights (coming soon)
  {
    id: "intune-vs-traditional-mdm",
    type: "insight",
    title: "Intune vs Traditional MDM: Why Modern Endpoint Management Wins",
    category: "Intune",
    summary:
      "A comparison of Microsoft Intune with traditional MDM solutions and why modern endpoint management is the future.",
    tags: ["Intune", "MDM", "Endpoint Management", "Security"],
    author: {
      name: "Sam B.",
      role: "Consultant",
    },
    readingTime: 7,
    draft: true,
  },
  {
    id: "microsoft-365-security-best-practices",
    type: "insight",
    title: "Microsoft 365 Security Best Practices for 2025",
    category: "Security",
    summary:
      "Essential security configurations and best practices to protect your Microsoft 365 environment.",
    tags: ["Security", "Microsoft 365", "Best Practices"],
    author: {
      name: "Heath B.",
      role: "Senior Consultant",
    },
    readingTime: 15,
    draft: true,
  },
  {
    id: "cloud-migration-planning",
    type: "insight",
    title: "Planning Your Cloud Migration: A Step-by-Step Approach",
    category: "Azure",
    summary:
      "A comprehensive guide to planning and executing a successful cloud migration to Microsoft Azure.",
    tags: ["Azure", "Cloud Migration", "Planning", "Infrastructure"],
    author: {
      name: "Will W.",
      role: "Director",
    },
    readingTime: 12,
    draft: true,
  },
];

// Helper functions for insights posts
export const getPublishedInsights = () =>
  insightsPosts.filter((post) => !post.draft);

export const getDraftInsights = () =>
  insightsPosts.filter((post) => post.draft);

export const getFeaturedInsight = () =>
  insightsPosts.find((post) => post.featured && !post.draft);

export const getInsightById = (id: string) =>
  insightsPosts.find((post) => post.id === id);
