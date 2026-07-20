"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import { PageQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  const isContactPage = props.variables.relativePath === "contact.mdx";

  return (
    <ErrorBoundary>
      <Blocks
        {...data?.page}
        afterFirstBlock={isContactPage ? <ContactEnquiryForm /> : undefined}
      />
    </ErrorBoundary>
  );
}
