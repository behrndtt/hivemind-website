import {
  PageHero,
  ContentSection,
  CardGrid,
  CtaSection,
} from "@/components/blocks";
import {
  consultingHero,
  consultingServices,
  consultingProcess,
  consultingBenefits,
  consultingCta,
} from "@/lib/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function ConsultingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <PageHero
        badge={consultingHero.badge}
        title={`${consultingHero.title} ${consultingHero.highlightedWord}`}
        highlightedWords={consultingHero.highlightedWord}
        subtitle={consultingHero.subtitle}
        ctas={[
          {
            label: consultingHero.primaryCta.label,
            href: consultingHero.primaryCta.href,
            variant: "primary",
          },
          {
            label: consultingHero.secondaryCta.label,
            href: consultingHero.secondaryCta.href,
            variant: "outline",
          },
        ]}
        variant="compact"
      />

      {/* Services Grid */}
      <CardGrid
        items={consultingServices}
        variant="horizontal"
        columns={1}
        badge="What We Offer"
        title="Consulting Services"
        subtitle="Comprehensive consulting across the Microsoft ecosystem, tailored to your organisation's unique needs."
      />

      {/* Process Section */}
      <CardGrid
        items={consultingProcess}
        variant="numbered"
        columns={5}
        badge="Our Approach"
        title="How We Work"
        subtitle="A proven methodology that ensures successful outcomes and lasting value."
        className="bg-zinc-950 border-y border-zinc-800"
      />

      {/* Benefits Section */}
      <ContentSection
        badge="Why Choose Us"
        title="Consulting That Delivers Results"
        subtitle="We don't just recommend solutions—we implement them alongside you, ensuring knowledge transfer and long-term success."
        align="left"
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {consultingBenefits.map((benefit, index) => {
              const Icon = getIcon(benefit.icon);
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-serif font-light text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-serif font-light text-white">
                  Ready to Get Started?
                </h3>
                <p className="mb-6 text-zinc-400">
                  Book a free consultation to discuss your Microsoft challenges
                  and explore how we can help.
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No obligation consultation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Discuss your specific challenges
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Get expert recommendations
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
                >
                  <Link href="/contact">
                    Book Your Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <CtaSection
        title={consultingCta.title}
        subtitle={consultingCta.subtitle}
        ctas={[
          {
            label: consultingCta.primaryCta.label,
            href: consultingCta.primaryCta.href,
            variant: "outline",
          },
        ]}
        background="radial"
        variant="inline"
      />
    </main>
  );
}
