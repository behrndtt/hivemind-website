"use client";

import Link from "next/link";
import { ArrowRight, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageHero,
  CardGrid,
  StatsGrid,
  TestimonialsSection,
  CtaSection,
} from "@/components/blocks";
import { InView } from "@/components/motion-primitives/in-view";
import {
  homeHero,
  homeStats,
  homePillars,
  homeServices,
} from "@/lib/data/home";

// Local data that's specific to this page layout
const testimonials = [
  {
    quote:
      "Hivemind Solutions transformed our IT infrastructure. The migration to Microsoft 365 was seamless, and their ongoing support has been exceptional.",
    author: "Sarah T.",
    role: "IT Manager",
    company: "Allied Health Group",
  },
  {
    quote:
      "Their expertise in Entra ID and security compliance helped us achieve Essential Eight maturity faster than we thought possible.",
    author: "James R.",
    role: "CIO",
    company: "FinSecure",
  },
];

const whyChooseUsPoints = [
  "Microsoft certified consultants with real-world experience",
  "Local Adelaide team for responsive, face-to-face support",
  "Proven track record across healthcare, finance, and government",
  "Transparent pricing with no hidden costs",
  "24/7 monitoring and emergency support options",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <PageHero
        badge={homeHero.badge.text}
        badgeIcon={homeHero.badge.icon}
        title={`${homeHero.title} ${homeHero.highlightedWord}`}
        highlightedWords={homeHero.highlightedWord}
        subtitle={homeHero.subtitle}
        ctas={[
          { label: homeHero.primaryCta.label, href: homeHero.primaryCta.href, variant: "primary" },
          { label: homeHero.secondaryCta.label, href: homeHero.secondaryCta.href, variant: "outline" },
        ]}
        variant="full"
      />

      {/* Stats Section */}
      <StatsGrid stats={homeStats} variant="inline-strip" />

      {/* Four Pillars Section */}
      <CardGrid
        title="Our Four Pillars of Expertise"
        subtitle="Comprehensive Microsoft cloud solutions built on deep technical expertise and local understanding."
        items={homePillars.map((pillar) => ({
          icon: pillar.icon,
          title: pillar.title,
          description: pillar.description,
        }))}
        variant="icon-top"
        columns={4}
      />

      {/* Services Overview */}
<CardGrid
          title="How We Help"
          subtitle="From strategic consulting to hands-on support, we're with you every step of your cloud journey."
          items={homeServices.map((service) => ({
            icon: service.icon,
            title: service.title,
            description: service.description,
            href: service.href,
          }))}
          variant="service-overview"
          columns={2}
          className="border-y border-zinc-800/50"
        />      {/* Why Choose Us - Custom layout */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
              viewOptions={{ once: true, margin: "-100px" }}
            >
              <div>
                <h1 className="mb-6">
                  Why Adelaide Businesses Choose Hivemind
                </h1>
                <p className="text-lg text-zinc-400 mb-8">
                  We combine deep Microsoft technical expertise with genuine local
                  understanding. As Adelaide&apos;s dedicated Microsoft cloud
                  specialists, we deliver enterprise-grade solutions with the
                  personalised service you deserve.
                </p>

                <ul className="space-y-4">
                  {whyChooseUsPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    asChild
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                  >
                    <Link href="/about">
                      Meet Our Team <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </InView>

            <InView
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewOptions={{ once: true, margin: "-100px" }}
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-zinc-800">
                  <Users className="w-32 h-32 text-primary/50" />
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection
        title="What Our Clients Say"
        subtitle="Don't just take our word for it – hear from the businesses we've helped transform."
        testimonials={testimonials}
        className="border-y border-zinc-800/50"
      />

      {/* CTA Section */}
      <CtaSection
        title="Ready to Transform Your IT?"
        subtitle="Let's discuss how Hivemind Solutions can help your business leverage the full power of Microsoft cloud technologies."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
        variant="boxed"
      />
    </div>
  );
}
