// Dark theme background options
export const tailwindBackgroundOptions = [
  { label: "Transparent", value: "bg-transparent" },
  { label: "Black", value: "bg-background" },
  { label: "Subtle Dark", value: "bg-card/50" },
  { label: "Dark (zinc-900)", value: "bg-card" },
  { label: "Primary Subtle", value: "bg-primary/5" },
  { label: "Primary Glow", value: "bg-primary/10" },
  { label: "Zinc 800/50", value: "bg-muted/50" },
  { label: "Border Top", value: "border-t border-border" },
  { label: "Border Bottom", value: "border-b border-border" },
  { label: "Border Both", value: "border-y border-border" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};