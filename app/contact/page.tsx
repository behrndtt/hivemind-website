"use client";

import { PageHero, CtaSection, ContentSection } from "@/components/blocks";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { InView } from "@/components/motion-primitives/in-view";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import {
  contactHero,
  contactMethods,
  contactInfo,
  contactFaqs,
  contactCta,
} from "@/lib/data/contact";
import { getIcon } from "@/lib/icons";

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <PageHero
        badge={contactHero.badge}
        title={`${contactHero.title} ${contactHero.highlightedWord}`}
        highlightedWords={contactHero.highlightedWord}
        subtitle={contactHero.subtitle}
        variant="compact"
      />

      {/* Contact Methods */}
      <ContentSection padding="lg" animate={false}>
        <AnimatedGroup
          preset="scale"
          className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-center"
        >
          {contactMethods.map((method, index) => {
            const Icon = getIcon(method.icon);
            return (
            <Card
              key={index}
              className="h-full border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  {Icon && <Icon className="h-7 w-7 text-primary" />}
                </div>
                <h4>
                  {method.title}
                </h4>
                <p className="text-sm text-zinc-400">
                  {method.description}
                </p>
                <p className="my-6 font-serif">{method.value}</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-zinc-700 text-zinc-300 hover:border-primary hover:text-white"
                >
                  <Link href={method.href} target="_blank">
                    {method.action}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )})}
        </AnimatedGroup>
      </ContentSection>

      {/* Main Content - Two Column */}
      <ContentSection background="subtle" c lassName="bg-zinc-950">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info Panel */}
          <InView
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true }}
          >
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-zinc-700 text-zinc-400"
              >
                Get In Touch
              </Badge>
              <h2 className="mb-6 md:text-4xl">
                We&apos;re Here to Help
              </h2>
              <p className="mb-8 text-zinc-400">
                Whether you&apos;re looking for strategic consulting, ongoing
                support, or just have a question about Microsoft technologies,
                our team is ready to assist. Reach out through any of the
                channels above, and we&apos;ll get back to you promptly.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = getIcon(info.icon);
                  return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    <div>
                      <h4>
                        {info.title}
                      </h4>
                      {info.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-sm text-zinc-400">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )})}
              </div>

              <div className="mt-8 rounded-lg border-2 border-primary/20 bg-linear-to-br from-primary/5 to-zinc-950 p-6">
                <h3 className="mb-2">
                  Existing Support Client?
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  If you&apos;re an existing managed support client, please use
                  your dedicated support channel for the fastest response.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-zinc-700 text-zinc-300 hover:border-primary hover:text-white"
                >
                  <Link href="mailto:support@hivemindsolutions.com.au">
                    Access Support Portal
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </InView>

          {/* FAQ Panel */}
          <InView
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5 }}
            viewOptions={{ once: true }}
          >
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-zinc-700 text-zinc-400"
              >
                Common Questions
              </Badge>
              <h2 className="mb-6">
                Frequently Asked
              </h2>

              <div className="space-y-4">
                {contactFaqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-500"
                  >
                    <CardContent className="p-5">
                      <h4 className="mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-zinc-400">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="mb-4 text-sm text-zinc-400">
                  Have a different question?
                </p>
                <Button
                  asChild
                  className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  <Link href="mailto:hello@hivemindsolutions.com.au">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Your Question
                  </Link>
                </Button>
              </div>
            </div>
          </InView>
        </div>
      </ContentSection>

      {/* CTA Section */}
      <CtaSection
        title={contactCta.title}
        subtitle={contactCta.subtitle}
        ctas={contactCta.ctas}
        variant="minimal"
      />
    </main>
  );
}
