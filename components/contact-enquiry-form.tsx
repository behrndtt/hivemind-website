"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CONTACT_EMAIL = "hello@hivemindsolutions.com.au";

type EnquiryType = "consulting" | "support" | "general";
type ContactMethod = "email" | "phone";

interface ContactEnquiryFormProps {
  initialEnquiryType?: EnquiryType;
}

interface FormErrors {
  name?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  challenge?: string;
}

function buildMailtoUrl(form: HTMLFormElement) {
  const data = new FormData(form);
  const enquiryType = String(data.get("enquiryType") || "General enquiry");
  const subject = `Website enquiry: ${enquiryType}`;
  const body = [
    `Name: ${data.get("name")}`,
    `Organisation: ${data.get("organisation")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone") || "Not provided"}`,
    `Preferred contact: ${data.get("contactMethod")}`,
    `Preferred timing: ${data.get("timing") || "No set timing"}`,
    "",
    "What they need help with:",
    String(data.get("challenge") || ""),
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactEnquiryForm({ initialEnquiryType = "general" }: ContactEnquiryFormProps) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialEnquiryType);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const requestedType = new URLSearchParams(window.location.search).get("enquiry");
    if (requestedType === "consulting" || requestedType === "support" || requestedType === "general") {
      setEnquiryType(requestedType);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FormErrors = {};

    if (!String(data.get("name") || "").trim()) nextErrors.name = "Enter your name.";
    if (!String(data.get("organisation") || "").trim()) nextErrors.organisation = "Enter your organisation.";
    if (!String(data.get("email") || "").trim()) nextErrors.email = "Enter your email address.";
    if (contactMethod === "phone" && !String(data.get("phone") || "").trim()) nextErrors.phone = "Enter a phone number.";
    if (!String(data.get("challenge") || "").trim()) nextErrors.challenge = "Tell us briefly what you need help with.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.location.href = buildMailtoUrl(form);
  }

  const fieldClassName = "space-y-2";
  const labelClassName = "block text-sm font-medium text-foreground";
  const errorClassName = "text-sm text-destructive";
  const controlClassName = "min-h-11 bg-background";

  return (
    <section id="enquiry" className="border-y border-border bg-card/50 py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:px-8">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-sm font-medium text-primary">Start with your situation</p>
            <h2 className="text-3xl text-foreground">Tell us what you need help with</h2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Give us enough context to understand the issue. A consultant will review your enquiry and reply by email or phone.
          </p>
          <div className="space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" />{CONTACT_EMAIL}</p>
            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" />+61 8 7118 1919</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Existing clients should use the Teams, ticket, or service contact agreed for active work.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-background p-5 sm:grid-cols-2 sm:p-7">
          <div className={fieldClassName}>
            <label htmlFor="contact-name" className={labelClassName}>Name</label>
            <Input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className={controlClassName} />
            {errors.name && <p id="contact-name-error" className={errorClassName}>{errors.name}</p>}
          </div>

          <div className={fieldClassName}>
            <label htmlFor="contact-organisation" className={labelClassName}>Organisation</label>
            <Input id="contact-organisation" name="organisation" autoComplete="organization" aria-invalid={Boolean(errors.organisation)} aria-describedby={errors.organisation ? "contact-organisation-error" : undefined} className={controlClassName} />
            {errors.organisation && <p id="contact-organisation-error" className={errorClassName}>{errors.organisation}</p>}
          </div>

          <div className={fieldClassName}>
            <label htmlFor="contact-email" className={labelClassName}>Email</label>
            <Input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className={controlClassName} />
            {errors.email && <p id="contact-email-error" className={errorClassName}>{errors.email}</p>}
          </div>

          <div className={fieldClassName}>
            <label htmlFor="contact-enquiry-type" className={labelClassName}>Enquiry type</label>
            <select id="contact-enquiry-type" name="enquiryType" value={enquiryType} onChange={(event) => setEnquiryType(event.target.value as EnquiryType)} className={`${controlClassName} w-full rounded-md border border-input px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}>
              <option value="consulting">Consulting</option>
              <option value="support">Support</option>
              <option value="general">General enquiry</option>
            </select>
          </div>

          <div className="space-y-3 sm:col-span-2">
            <fieldset>
              <legend className={labelClassName}>Preferred contact method</legend>
              <div className="mt-2 flex flex-wrap gap-5">
                {(["email", "phone"] as ContactMethod[]).map((method) => (
                  <label key={method} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm capitalize">
                    <input type="radio" name="contactMethod" value={method} checked={contactMethod === method} onChange={() => setContactMethod(method)} className="h-4 w-4 accent-primary" />
                    {method}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {contactMethod === "phone" && (
            <div className={`${fieldClassName} sm:col-span-2`}>
              <label htmlFor="contact-phone" className={labelClassName}>Phone</label>
              <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} className={controlClassName} />
              {errors.phone && <p id="contact-phone-error" className={errorClassName}>{errors.phone}</p>}
            </div>
          )}

          <div className={`${fieldClassName} sm:col-span-2`}>
            <label htmlFor="contact-challenge" className={labelClassName}>What do you need help with?</label>
            <textarea id="contact-challenge" name="challenge" rows={5} aria-invalid={Boolean(errors.challenge)} aria-describedby={errors.challenge ? "contact-challenge-error" : "contact-challenge-help"} className="w-full rounded-md border border-input bg-background px-3 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm" />
            <p id="contact-challenge-help" className="text-sm text-muted-foreground">Include the current issue, decision, or outcome you are working towards.</p>
            {errors.challenge && <p id="contact-challenge-error" className={errorClassName}>{errors.challenge}</p>}
          </div>

          <div className={fieldClassName}>
            <label htmlFor="contact-timing" className={labelClassName}>Preferred timing <span className="font-normal text-muted-foreground">(optional)</span></label>
            <select id="contact-timing" name="timing" defaultValue="No set timing" className={`${controlClassName} w-full rounded-md border border-input px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}>
              <option>No set timing</option>
              <option>Within four weeks</option>
              <option>One to three months</option>
              <option>Later</option>
            </select>
          </div>

          <div className="flex flex-col items-start justify-end gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs text-muted-foreground">Hivemind will use these details to respond to your enquiry. Submitting opens your email app so you can review and send the message.</p>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Prepare Enquiry <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}