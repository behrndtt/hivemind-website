import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  let globalSettings = null;

  try {
    const { data: globalData } = await client.queries.global({
      relativePath: "index.json",
    },
      {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        }
      }
    );
    globalSettings = globalData.global;
  } catch (error) {
    console.warn('Failed to fetch global settings:', error);
    // Continue with null global settings - components should handle gracefully
  }

  return (
    <LayoutProvider globalSettings={globalSettings} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden flex-1">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
