import { Post } from "./posts";

/**
 * Case studies posts data
 * Separate from page configuration to keep content modular
 */
export const caseStudiesPosts: Post[] = [
  // Published case studies
  {
    id: "allied-health-group",
    type: "case-study",
    title: "Allied Health Group",
    category: "Healthcare",
    summary:
      "Complete Microsoft 365 migration and Intune deployment for a multi-site allied health provider, achieving Essential Eight compliance.",
    content: `
## The Client

Allied Health Group is a multi-site allied health provider operating across metropolitan Adelaide. With over 150 staff across physiotherapy, occupational therapy, and speech pathology services, they needed a modern IT environment that could support their growth while meeting strict healthcare compliance requirements.

## The Challenge

Allied Health Group was operating on legacy on-premises infrastructure with outdated security practices. Their existing environment presented several critical issues:

- **Aging Exchange Server** requiring constant maintenance and presenting security risks
- **No mobile device management** leaving patient data vulnerable on staff devices
- **Manual patch management** resulting in inconsistent security updates
- **Limited remote work capability** impacting staff flexibility and recruitment

They needed to modernise their IT environment while meeting Essential Eight compliance requirements mandated by their healthcare industry partners.

## Our Solution

Hivemind designed and implemented a comprehensive Microsoft 365 migration strategy tailored to healthcare requirements:

### Phase 1: Assessment and Planning

- Conducted thorough infrastructure assessment
- Mapped data governance requirements for healthcare
- Designed migration approach with zero tolerance for downtime
- Created Essential Eight compliance roadmap

### Phase 2: Microsoft 365 Deployment

- Migrated all mailboxes to Exchange Online with hybrid coexistence
- Deployed SharePoint Online for document management
- Implemented Microsoft Teams for clinical collaboration
- Configured retention policies for healthcare compliance

### Phase 3: Intune and Security

- Enrolled all devices in Microsoft Intune
- Deployed Windows Autopilot for streamlined device provisioning
- Implemented Conditional Access policies
- Configured Microsoft Defender for Endpoint

### Phase 4: Essential Eight Implementation

- Deployed application control via WDAC
- Configured automated patching for OS and applications
- Implemented MFA across all user accounts
- Established comprehensive backup strategy

## The Results

The transformation delivered measurable improvements across all key metrics:

- **Zero downtime** during the entire migration process
- **40% reduction** in IT administrative workload
- **100% Essential Eight compliance** achieved at Maturity Level 2
- **3 weeks** from project start to full deployment

## Client Feedback

> "Hivemind made our migration seamless. Our staff barely noticed the transition, and our security posture has never been stronger. The team's healthcare experience meant they understood our compliance requirements from day one."

— Sarah T., Practice Manager
    `,
    challenge:
      "Allied Health Group was operating on legacy on-premises infrastructure with outdated security practices. They needed to modernise their IT environment while meeting strict healthcare compliance requirements.",
    solution:
      "Hivemind designed and implemented a comprehensive Microsoft 365 migration, including email, SharePoint, and Teams. We deployed Intune for device management across all clinical and administrative devices, and implemented Essential Eight security controls.",
    results: [
      { metric: "Zero", label: "Downtime during migration" },
      { metric: "40%", label: "Reduction in admin workload" },
      { metric: "100%", label: "Essential Eight compliance" },
      { metric: "3 weeks", label: "Full deployment timeline" },
    ],
    testimonial: {
      quote:
        "Hivemind made our migration seamless. Our staff barely noticed the transition, and our security posture has never been stronger.",
      author: "Sarah T.",
      role: "Practice Manager",
    },
    tags: ["Microsoft 365", "Intune", "Essential Eight", "Healthcare"],
    featured: true,
    publishedAt: "2024-06-15",
  },
  {
    id: "sa-manufacturing-co",
    type: "case-study",
    title: "SA Manufacturing Co",
    category: "Manufacturing",
    summary:
      "Azure infrastructure modernisation and hybrid cloud deployment for a South Australian manufacturing company, reducing IT costs by 35%.",
    content: `
## The Client

SA Manufacturing Co is a mid-sized manufacturing company based in Adelaide's northern suburbs. With 200+ employees across production, logistics, and administration, they were struggling with aging on-premises infrastructure that couldn't keep pace with business demands.

## The Challenge

The company faced several infrastructure challenges impacting their operations:

- **End-of-life servers** running critical ERP and production systems
- **Limited disaster recovery** capability putting business continuity at risk
- **Siloed IT systems** preventing visibility across operations
- **High capital expenditure** cycle for hardware refreshes
- **No remote access** for management and administrative staff

## Our Solution

Hivemind designed a phased hybrid cloud migration that balanced cost, performance, and risk:

### Phase 1: Azure Foundation

- Deployed Azure Virtual Network with site-to-site VPN
- Established Azure Active Directory Connect for hybrid identity
- Implemented Azure Backup for critical on-premises workloads
- Set up Azure Monitor for unified infrastructure visibility

### Phase 2: Workload Migration

- Migrated file servers to Azure Files with on-premises caching
- Deployed domain controllers in Azure for redundancy
- Moved non-production ERP environments to Azure VMs
- Implemented Azure Site Recovery for disaster recovery

### Phase 3: Optimisation

- Right-sized Azure VMs based on actual utilisation
- Implemented Reserved Instances for predictable workloads
- Deployed Azure Cost Management with departmental budgets
- Established governance policies via Azure Policy

## The Results

The hybrid cloud deployment delivered significant business outcomes:

- **35% reduction** in annual IT infrastructure costs
- **99.9% uptime** achieved with Azure-based redundancy
- **4-hour RTO** down from 48+ hours for disaster recovery
- **Enabled remote work** for all administrative staff

## Client Feedback

> "The move to Azure has transformed how we think about IT. We've gone from worrying about server failures to focusing on how technology can help us grow. Hivemind guided us through every step."

— Michael R., Operations Director
    `,
    challenge:
      "Aging on-premises infrastructure couldn't keep pace with business demands, with end-of-life servers, limited disaster recovery, and high capital expenditure cycles.",
    solution:
      "Hivemind designed a phased hybrid cloud migration to Azure, including infrastructure modernisation, workload migration, and cost optimisation strategies.",
    results: [
      { metric: "35%", label: "Reduction in IT costs" },
      { metric: "99.9%", label: "Uptime achieved" },
      { metric: "4hr", label: "Disaster recovery RTO" },
      { metric: "200+", label: "Employees supported" },
    ],
    testimonial: {
      quote:
        "The move to Azure has transformed how we think about IT. We've gone from worrying about server failures to focusing on how technology can help us grow.",
      author: "Michael R.",
      role: "Operations Director",
    },
    tags: ["Azure", "Infrastructure", "Hybrid Cloud", "Manufacturing"],
    publishedAt: "2024-04-20",
  },
  {
    id: "adelaide-legal-partners",
    type: "case-study",
    title: "Adelaide Legal Partners",
    category: "Professional Services",
    summary:
      "Microsoft 365 Copilot deployment and productivity transformation for a growing Adelaide law firm, saving 15+ hours per lawyer per month.",
    content: `
## The Client

Adelaide Legal Partners is a boutique law firm specialising in commercial and property law. With 25 lawyers and 15 support staff, they pride themselves on delivering high-quality legal services while maintaining competitive pricing.

## The Challenge

The firm faced increasing pressure on productivity and margins:

- **Document-heavy workflows** consuming significant lawyer time
- **Email overload** with lawyers spending hours managing correspondence
- **Inconsistent document quality** requiring multiple review cycles
- **Knowledge silos** making it difficult to leverage past work
- **Competitive pressure** from larger firms with more resources

The partners wanted to explore how AI could help their lawyers work more efficiently without compromising quality.

## Our Solution

Hivemind implemented a comprehensive Copilot rollout tailored to legal workflows:

### Phase 1: Readiness Assessment

- Audited Microsoft 365 environment and security settings
- Assessed data governance and sensitivity labelling
- Identified high-value use cases for legal workflows
- Selected pilot group of early adopter lawyers

### Phase 2: Pilot Deployment

- Deployed Copilot licenses to 8 pilot users
- Conducted hands-on training for legal-specific scenarios
- Developed custom prompts for common legal tasks
- Established feedback loops for continuous improvement

### Phase 3: Firm-Wide Rollout

- Extended Copilot to all lawyers and key support staff
- Created prompt library for document drafting, research, and communication
- Integrated Copilot into matter management workflows
- Established governance policies for AI-generated content

### Phase 4: Optimisation

- Refined prompts based on usage patterns
- Developed advanced use cases for complex legal work
- Created training materials for new staff
- Measured and reported on productivity gains

## The Results

The Copilot deployment delivered measurable productivity improvements:

- **15+ hours saved** per lawyer per month on routine tasks
- **50% faster** first-draft document creation
- **30% reduction** in email processing time
- **Improved quality** with consistent document formatting

## Client Feedback

> "Copilot has been a game-changer for our firm. Our lawyers are spending more time on high-value work and less on administrative tasks. Hivemind's legal-focused approach meant they understood exactly what we needed."

— Jennifer L., Managing Partner
    `,
    challenge:
      "Document-heavy workflows and email overload were consuming significant lawyer time, while competitive pressure demanded greater efficiency without compromising quality.",
    solution:
      "Hivemind implemented a comprehensive Copilot rollout tailored to legal workflows, including readiness assessment, pilot deployment, and firm-wide training with custom prompts.",
    results: [
      { metric: "15+hrs", label: "Saved per lawyer monthly" },
      { metric: "50%", label: "Faster document drafting" },
      { metric: "30%", label: "Less email processing time" },
      { metric: "40", label: "Staff using Copilot" },
    ],
    testimonial: {
      quote:
        "Copilot has been a game-changer for our firm. Our lawyers are spending more time on high-value work and less on administrative tasks.",
      author: "Jennifer L.",
      role: "Managing Partner",
    },
    tags: ["Microsoft 365", "Copilot", "AI", "Legal"],
    publishedAt: "2024-08-05",
  },

  // Draft case studies (coming soon)
  {
    id: "coming-soon-1",
    type: "case-study",
    title: "Education Sector Transformation",
    category: "Education",
    summary:
      "Microsoft Teams and Intune deployment for a private school network, enabling modern learning environments.",
    challenge: "Coming soon...",
    solution: "Coming soon...",
    results: [],
    tags: ["Microsoft 365", "Teams", "Education", "Intune"],
    draft: true,
  },
  {
    id: "coming-soon-2",
    type: "case-study",
    title: "Not-for-Profit Security Uplift",
    category: "Not-for-Profit",
    summary:
      "Essential Eight compliance and security modernisation for a large Adelaide-based charity.",
    challenge: "Coming soon...",
    solution: "Coming soon...",
    results: [],
    tags: ["Security", "Essential Eight", "Not-for-Profit"],
    draft: true,
  },
];

// Helper functions for case studies posts
export const getPublishedCaseStudies = () =>
  caseStudiesPosts.filter((post) => !post.draft);

export const getDraftCaseStudies = () =>
  caseStudiesPosts.filter((post) => post.draft);

export const getFeaturedCaseStudy = () =>
  caseStudiesPosts.find((post) => post.featured && !post.draft);

export const getNonFeaturedPublishedCaseStudies = () =>
  caseStudiesPosts.filter((post) => !post.draft && !post.featured);

export const getCaseStudyById = (id: string) =>
  caseStudiesPosts.find((post) => post.id === id);
