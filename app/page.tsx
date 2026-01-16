import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export default async function Home() {
  let data = null;

  try {
    data = await client.queries.page({
      relativePath: `home.mdx`,
    });
  } catch (error) {
    console.warn('Failed to fetch home page data:', error);
    // Continue with null data - page will render with empty content
  }

  return (
    <Layout rawPageData={data}>
      {data && <ClientPage {...data} />}
    </Layout>
  );
}
