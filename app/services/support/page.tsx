import {
  PageHero,
  ContentSection,
  CardGrid,
  StatsGrid,
  PricingSection,
  CtaSection,
} from "@/components/blocks";
import {
  supportHero,
  supportMetrics,
  supportServices,
  supportPlans,
  supportTestimonial,
  supportCta,
} from "@/lib/data/services";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <PageHero
        badge={supportHero.badge}
        title={`${supportHero.title} ${supportHero.highlightedWord}`}
        highlightedWords={supportHero.highlightedWord}
        subtitle={supportHero.subtitle}
        ctas={[
          {
            label: supportHero.primaryCta.label,
            href: supportHero.primaryCta.href,
            variant: "primary",
          },
          {
            label: supportHero.secondaryCta.label,
            href: supportHero.secondaryCta.href,
            variant: "outline",
          },
        ]}
        variant="compact"
      />

      {/* Response Metrics */}
      <StatsGrid
        stats={supportMetrics.map((m) => ({
          icon: m.icon,
          value: m.metric,
          label: m.label,
        }))}
        variant="inline-strip"
        className="border-y border-zinc-800 bg-zinc-950"
      />

      {/* Services Grid */}
      <CardGrid
        items={supportServices}
        variant="horizontal"
        columns={1}
        badge="What's Included"
        title="Support Services"
        subtitle="Comprehensive managed services covering every aspect of your Microsoft environment."
      />

      {/* Support Plans */}
      <PricingSection
        badge="Flexible Options"
        title="Support Plans"
        subtitle="Choose the level of support that fits your organisation. All plans include access to our expert team."
        plans={supportPlans.map((plan) => ({
          name: plan.name,
          description: plan.description,
          features: plan.features,
          highlight: plan.highlighted,
          cta: "Get Started",
          ctaHref: "/contact",
        }))}
        footer="Need something different? Contact us for a custom support package."
        className="bg-zinc-950"
      />

      {/* Why Managed Support */}
      <ContentSection
        badge="Why Managed Support"
        title="Focus on Your Business, Not IT Issues"
        align="left"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-zinc-400">
            <p>
              Managing Microsoft 365, Azure, and Intune environments requires
              specialised knowledge and constant attention. Our managed support
              takes this burden off your shoulders.
            </p>
            <p>
              With Hivemind as your support partner, you get access to a team of
              Microsoft specialists who know your environment inside out. We
              proactively maintain your systems, quickly resolve issues, and ensure
              you&apos;re getting maximum value from your Microsoft investment.
            </p>
            <p>
              Whether you need occasional expert assistance or full IT department
              capabilities, our flexible support plans scale with your needs.
            </p>
          </div>
          <Card className="border-2 border-primary/20 bg-zinc-900/50">
            <CardContent className="p-8">
              <h3 className="mb-6 text-xl font-serif font-light text-white">
                What Our Clients Say
              </h3>
              <div className="flex text-primary mb-4">
                {[...Array(supportTestimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-md mb-6 text-zinc-300 font-serif font-normal">
                &ldquo;{supportTestimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-serif font-normal text-primary">
                  {supportTestimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-serif font-normal text-white">
                    {supportTestimonial.author}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {supportTestimonial.role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <CtaSection
        title={supportCta.title}
        subtitle={supportCta.subtitle}
        ctas={[
          {
            label: supportCta.primaryCta.label,
            href: supportCta.primaryCta.href,
            variant: "primary",
          },
          {
            label: supportCta.secondaryCta.label,
            href: supportCta.secondaryCta.href,
            variant: "outline",
          },
        ]}
        variant="inline"
        className="bg-zinc-950"
      />
    </main>
  );
}
