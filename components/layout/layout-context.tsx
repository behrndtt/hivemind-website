"use client";
import React, { useState, useContext } from "react";
import { GlobalQuery } from "../../tina/__generated__/types";

// Default theme values for fallback when global settings are unavailable
const DEFAULT_THEME = {
  color: "blue",
  darkMode: "default",
} as GlobalQuery["global"]["theme"];

interface LayoutState {
  globalSettings: GlobalQuery["global"] | null;
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalQuery["global"] | null>
  >;
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  theme: GlobalQuery["global"]["theme"];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: DEFAULT_THEME,
      globalSettings: null,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"] | null;
  pageData: {};
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery["global"] | null>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<{}>(initialPageData);

  // Use default theme if globalSettings is null or theme is missing
  const theme = globalSettings?.theme ?? DEFAULT_THEME;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
