# GitHub Copilot Instructions

## Project Overview

Next.js 16 App Router with TinaCMS headless CMS, Tailwind CSS 4, and Motion animation library.

### Tech Stack
- **Framework**: Next.js 16.0.7 (App Router, React 19, Turbopack)
- **CMS**: TinaCMS (Git-backed, visual editing)
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Animation**: Motion (motion/react)
- **Content**: MDX/Markdown files in `content/`

### Development Commands
```bash
pnpm dev          # Start dev server with Turbopack + TinaCMS
pnpm build        # Production build (tinacms build + next build)
pnpm build-local  # Local build without cloud checks
```

## Architecture: Server/Client Split Pattern

**Every page follows this mandatory structure:**

```
app/[route]/
├── page.tsx           # Server component - fetches data
└── client-page.tsx    # Client component - renders with useTina
```

### Server Component (`page.tsx`)
```typescript
import client from '@/tina/__generated__/client';
import ClientPage from './client-page';
import Layout from '@/components/layout/layout';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const data = await client.queries.post({ relativePath: `${slug}.mdx` });
    return (
      <Layout rawPageData={data}>
        <ClientPage {...data} />
      </Layout>
    );
  } catch {
    notFound();
  }
}
```

### Client Component (`client-page.tsx`)
```typescript
"use client";
import { useTina, tinaField } from "tinacms/dist/react";
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  data: { post: PostQuery["post"] };
  variables: PostQueryVariables;
  query: string;
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  
  return (
    <h1 data-tina-field={tinaField(data.post, 'title')}>
      {data.post?.title}
    </h1>
  );
}
```

## TinaCMS Schema Patterns

### Collection Structure (`tina/collection/*.ts`)

Collections are defined in separate files and imported into `tina/config.tsx`:

```typescript
// tina/collection/post.tsx
import type { Collection } from 'tinacms';

const Post: Collection = {
  label: 'Blog Posts',
  name: 'post',
  path: 'content/posts',
  format: 'mdx',
  ui: {
    router: ({ document }) => `/posts/${document._sys.breadcrumbs.join('/')}`,
  },
  fields: [
    { type: 'string', label: 'Title', name: 'title', isTitle: true, required: true },
    { type: 'image', name: 'heroImg', label: 'Hero Image', uploadDir: () => 'posts' },
    { type: 'reference', label: 'Author', name: 'author', collections: ['author'] },
    { type: 'datetime', label: 'Date', name: 'date' },
    { type: 'rich-text', label: 'Body', name: '_body', templates: [/* custom templates */] },
  ],
};
export default Post;
```

### Block-Based Pages Pattern

Pages use reusable block templates defined alongside their React components:

```typescript
// components/blocks/hero.tsx
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { sectionBlockSchemaField } from '../layout/section';
import { iconSchema } from '@/tina/fields/icon';

export const Hero = ({ data }: { data: PageBlocksHero }) => (
  <div data-tina-field={tinaField(data, 'headline')}>
    <h1>{data.headline}</h1>
  </div>
);

// Schema exported from same file
export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: { previewSrc: '/blocks/hero.png' },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', label: 'Headline', name: 'headline' },
    { type: 'string', label: 'Tagline', name: 'tagline' },
    { label: 'Actions', name: 'actions', type: 'object', list: true, fields: [
      { label: 'Label', name: 'label', type: 'string' },
      iconSchema as any,
      { label: 'Link', name: 'link', type: 'string' },
    ]},
  ],
};
```

### Blocks Renderer (`components/blocks/index.tsx`)
```typescript
import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "@/tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
// ... other blocks

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map((block, i) => (
        <div key={i} data-tina-field={tinaField(block)}>
          <Block {...block} />
        </div>
      ))}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero": return <Hero data={block} />;
    case "PageBlocksContent": return <Content data={block} />;
    // ... handle each block type
    default: return null;
  }
};
```

## Custom Fields (`tina/fields/`)

### Icon Picker Field
```typescript
// tina/fields/icon.tsx
import { wrapFieldsWithMeta } from 'tinacms';

export const iconSchema = {
  type: 'object',
  label: 'Icon',
  name: 'icon',
  fields: [
    { type: 'string', label: 'Name', name: 'name', ui: { component: IconPickerInput } },
    { type: 'string', label: 'Color', name: 'color', ui: { component: ColorPickerInput } },
  ],
};
```

## Key File Locations

| Purpose | Location |
|---------|----------|
| TinaCMS config | `tina/config.tsx` |
| Collections | `tina/collection/*.ts` |
| Custom fields | `tina/fields/*.tsx` |
| Generated types | `tina/__generated__/types.ts` |
| Generated client | `tina/__generated__/client.ts` |
| Block components | `components/blocks/*.tsx` |
| Layout wrapper | `components/layout/layout.tsx` |
| MDX components | `components/mdx-components.tsx` |
| Content files | `content/{pages,posts,insights,case-studies}/*.mdx` |

## Visual Editing Rules

**Always add `data-tina-field` to editable elements:**

```typescript
import { tinaField } from 'tinacms/dist/react';

// ✅ Correct - pass data object and field name
<h1 data-tina-field={tinaField(post, 'title')}>{post.title}</h1>

// ✅ For blocks - tinaField on the block itself
<div data-tina-field={tinaField(block)}><Block {...block} /></div>

// ❌ Wrong - don't use string paths
<h1 data-tina-field="post.title">{post.title}</h1>
```

## Rich Text with TinaMarkdown

```typescript
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { components } from '@/components/mdx-components';

// Use components prop for custom rendering (mermaid, code blocks, etc.)
<div data-tina-field={tinaField(post, '_body')}>
  <TinaMarkdown content={post._body} components={components} />
</div>
```

Custom MDX components are defined in `components/mdx-components.tsx` and handle:
- Code blocks with syntax highlighting (`Prism`)
- Mermaid diagrams
- BlockQuotes, DateTime, NewsletterSignup templates

## Pagination Pattern

```typescript
// Server-side pagination for connections
let items = await client.queries.postConnection({ sort: 'date', last: 10 });
const allItems = items;

while (items.data?.postConnection.pageInfo.hasPreviousPage) {
  items = await client.queries.postConnection({
    sort: 'date',
    before: items.data.postConnection.pageInfo.endCursor,
  });
  allItems.data.postConnection.edges.push(...items.data.postConnection.edges.reverse());
}
```

## TypeScript Types

Always import generated types from `@/tina/__generated__/types`:

```typescript
import { 
  PageQuery, PageQueryVariables,
  PostConnectionQuery, PostConnectionQueryVariables,
  PageBlocks, PageBlocksHero 
} from '@/tina/__generated__/types';
```

## TypeScript Best Practices

### Generate Types

Use TinaCMS code generation to auto-generate types:

```bash
tinacms codegen
```

### Import Generated Types

```typescript
import { Post, PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}
```

### Type useTina Hook

```typescript
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  // tinaData.post is fully typed based on PostQuery
  const post = tinaData.post;
}
```

## Code Style and Patterns

### File Organization

```
src/
├── app/                    # Next.js App Router routes
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Server component
│   │   │   └── client-page.tsx    # Client component
│   │   ├── page.tsx               # Index server
│   │   └── client-page.tsx        # Index client
├── components/
│   ├── ClientPage.tsx      # Reusable client component
│   └── mdx-components.tsx  # TinaMarkdown custom components
├── tina/
│   ├── config.ts           # TinaCMS config
│   └── __generated__/      # Auto-generated (don't edit)
└── utils/
    └── tina-client.ts      # TinaClient setup
```

### Naming Conventions

- **Files**: kebab-case (e.g., `client-page.tsx`, `mdx-components.tsx`)
- **Components**: PascalCase (e.g., `ClientPage`)
- **Fields**: camelCase (e.g., `postTitle`)
- **Queries**: camelCase (e.g., `postConnection`)
- **Types**: PascalCase (e.g., `Post`, `PostQuery`, `PostQueryVariables`)

### Component Structure

```typescript
"use client";

import { tinaField, useTina } from 'tinacms/dist/react';
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  // Render content
  return <article>{/* render tinaData */}</article>;
}
```

## Error Handling

### Server-Side (page.tsx)

```typescript
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps) {
  try {
    const { query, data, variables } = await client.queries.post({
      relativePath: `${params.slug}.md`,
    });

    if (!data.post) {
      notFound();
    }

    return <ClientPage query={query} data={data} variables={variables} />;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    notFound();
  }
}
```

### Client-Side

Since `useTina` only returns `data`, handle errors on the server side before passing to the client component.

```typescript
export default function ClientPage(props: ClientPageProps) {
  const { data: tinaData } = useTina({
    query: props.query,
    data: props.data,
    variables: props.variables,
  });

  // Data is guaranteed to be valid if passed from server
  return <article>{/* render tinaData */}</article>;
}
```

## Development Workflow

### Before Making Changes

1. Check existing patterns in the codebase
2. Review `/docs` for architecture and guidelines
3. Ensure changes align with project goals

### Making Changes

1. Make minimal, surgical changes - change only what's necessary
2. Follow existing code patterns and conventions
3. Update documentation if making structural changes
4. Test changes locally before committing

### After Making Changes

1. ✅ Verify TypeScript compiles: `tsc --noEmit`
2. ✅ Test TinaCMS locally in visual editing mode
3. ✅ Verify `tinaField()` attributes are correct
4. ✅ Test server and client components separately
5. ✅ Document significant changes
6. ✅ Commit with clear messages

### Commit Guidelines

```bash
# Small, focused commits
git add .
git commit -m "feat: Add blog post page with TinaCMS integration

- Create page.tsx for server-side data fetching
- Create client-page.tsx with useTina integration
- Add tinaField attributes for visual editing

Co-authored-by: Name <email@example.com>"
```

## Testing and Quality

### Before Committing

- ✅ TypeScript compiles without errors
- ✅ Components render correctly
- ✅ TinaCMS visual editing works
- ✅ All `tinaField()` calls match schema
- ✅ Error states handled on server
- ✅ No console errors or warnings

### Edge Cases to Consider

- Missing or null data from TinaCMS
- Network failures when fetching data
- Schema mismatches in tinaField
- Nested/optional fields with fallbacks
- Different data types (strings, arrays, objects)

## Patterns to Avoid

### ❌ Don't Do This

```typescript
// ❌ Calling client.queries in client component
"use client";
const data = await client.queries.post(); // Can't await here!

// ❌ Forgetting "use client" in client component
export default function ClientPage() {
  const { data } = useTina(); // useTina needs "use client"
}

// ❌ Using string literals for data-tina-field
<h1 data-tina-field="post.title">{post.title}</h1> // Use tinaField()!

// ❌ Omitting tinaField attributes
<h1>{post.title}</h1> // Can't click to edit!

// ❌ Rendering all UI in server component
export default async function Page() {
  return <h1>{data.post.title}</h1>; // No editing!
## TypeScript Best Practices

### Generate Types

Use TinaCMS code generation to auto-generate types:

```bash
tinacms codegen
```

### Import Generated Types

```typescript
import { Post, PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}
```

### Type useTina Hook

```typescript
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  // tinaData.post is fully typed based on PostQuery
  const post = tinaData.post;
}
```

## Code Style and Patterns

### File Organization

```
src/
├── app/                    # Next.js App Router routes
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Server component
│   │   │   └── client-page.tsx    # Client component
│   │   ├── page.tsx               # Index server
│   │   └── client-page.tsx        # Index client
├── components/
│   ├── ClientPage.tsx      # Reusable client component
│   └── mdx-components.tsx  # TinaMarkdown custom components
├── tina/
│   ├── config.ts           # TinaCMS config
│   └── __generated__/      # Auto-generated (don't edit)
└── utils/
    └── tina-client.ts      # TinaClient setup
```

### Naming Conventions

- **Files**: kebab-case (e.g., `client-page.tsx`, `mdx-components.tsx`)
- **Components**: PascalCase (e.g., `ClientPage`)
- **Fields**: camelCase (e.g., `postTitle`)
- **Queries**: camelCase (e.g., `postConnection`)
- **Types**: PascalCase (e.g., `Post`, `PostQuery`, `PostQueryVariables`)

### Component Structure

```typescript
"use client";

import { tinaField, useTina } from 'tinacms/dist/react';
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  // Render content
  return <article>{/* render tinaData */}</article>;
}
```

## Error Handling

### Server-Side (page.tsx)

```typescript
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps) {
  try {
    const { query, data, variables } = await client.queries.post({
      relativePath: `${params.slug}.md`,
    });

    if (!data.post) {
      notFound();
    }

    return <ClientPage query={query} data={data} variables={variables} />;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    notFound();
  }
}
```

### Client-Side

Since `useTina` only returns `data`, handle errors on the server side before passing to the client component.

```typescript
export default function ClientPage(props: ClientPageProps) {
  const { data: tinaData } = useTina({
    query: props.query,
    data: props.data,
    variables: props.variables,
  });

  // Data is guaranteed to be valid if passed from server
  return <article>{/* render tinaData */}</article>;
}
```

## Development Workflow

### Before Making Changes

1. Check existing patterns in the codebase
2. Review `/docs` for architecture and guidelines
3. Ensure changes align with project goals

### Making Changes

1. Make minimal, surgical changes - change only what's necessary
2. Follow existing code patterns and conventions
3. Update documentation if making structural changes
4. Test changes locally before committing

### After Making Changes

1. ✅ Verify TypeScript compiles: `tsc --noEmit`
2. ✅ Test TinaCMS locally in visual editing mode
3. ✅ Verify `tinaField()` attributes are correct
4. ✅ Test server and client components separately
5. ✅ Document significant changes
6. ✅ Commit with clear messages

### Commit Guidelines

```bash
# Small, focused commits
git add .
git commit -m "feat: Add blog post page with TinaCMS integration

- Create page.tsx for server-side data fetching
- Create client-page.tsx with useTina integration
- Add tinaField attributes for visual editing

Co-authored-by: Name <email@example.com>"
```

## Testing and Quality

### Before Committing

- ✅ TypeScript compiles without errors
- ✅ Components render correctly
- ✅ TinaCMS visual editing works
- ✅ All `tinaField()` calls match schema
- ✅ Error states handled on server
- ✅ No console errors or warnings

### Edge Cases to Consider

- Missing or null data from TinaCMS
- Network failures when fetching data
- Schema mismatches in tinaField
- Nested/optional fields with fallbacks
- Different data types (strings, arrays, objects)

## Patterns to Avoid

### ❌ Don't Do This

```typescript
// ❌ Calling client.queries in client component
"use client";
const data = await client.queries.post(); // Can't await here!

// ❌ Forgetting "use client" in client component
export default function ClientPage() {
  const { data } = useTina(); // useTina needs "use client"
}

// ❌ Using string literals for data-tina-field
<h1 data-tina-field="post.title">{post.title}</h1> // Use tinaField()!

// ❌ Omitting tinaField attributes
<h1>{post.title}</h1> // Can't click to edit!

// ❌ Rendering all UI in server component
export default async function Page() {
  return <h1>{data.post.title}</h1>; // No editing!
}

// ❌ Using any types for TinaCMS data
const tinaData: any = useData(); // Loses type safety

// ❌ Hardcoding relative paths
const data = await client.queries.post({
  relativePath: "fixed-post.md", // Not dynamic!
});

// ❌ Not destructuring variables from query response
const { query, data } = await client.queries.post({...});
// Missing: variables
```

### ✅ Do This Instead

```typescript
// ✅ Fetch in server, render in client
// page.tsx (server)
const { query, data, variables } = await client.queries.post({...});
return <ClientPage query={query} data={data} variables={variables} />;

// client-page.tsx (client)
const { data: tinaData } = useTina({ query, data, variables });

// ✅ Use "use client" in client components
"use client";
const { data } = useTina({...});

// ✅ Use tinaField() helper for data-tina-field
<h1 data-tina-field={tinaField(post, 'title')}>{post.title}</h1>

// ✅ Pass dynamic paths
const { query, data, variables } = await client.queries.post({
  relativePath: `${params.slug}.md`,
});

// ✅ Use generated types
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}
```

## Examples

### ✅ Good: Single Post Page

**page.tsx (Server)**
```typescript
import { client } from "@/tina/client";
import ClientPage from "./client-page";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const { query, data, variables } = await client.queries.post({
      relativePath: `${params.slug}.md`,
    });

    if (!data.post) {
      notFound();
    }

    return <ClientPage query={query} data={data} variables={variables} />;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    notFound();
  }
}
```

**client-page.tsx (Client)**
```typescript
"use client";

import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";
import { components } from '@/components/mdx-components';

interface ClientPageProps {
  query: string;
  data: PostQuery;
  variables: PostQueryVariables;
}

export default function ClientPage({ query, data, variables }: ClientPageProps) {
  const { data: tinaData } = useTina({
    query,
    data,
    variables,
  });

  const post = tinaData.post;

  return (
    <article>
      <h1 data-tina-field={tinaField(post, 'title')}>
        {post.title}
      </h1>
      <p data-tina-field={tinaField(post, 'description')}>
        {post.description}
      </p>
      <div data-tina-field={tinaField(post, 'body')}>
        <TinaMarkdown content={post.body} components={components} />
      </div>
    </article>
  );
}
```

### ✅ Good: Index Page

**page.tsx (Server)**
```typescript
import { client } from "@/tina/client";
import ClientPage from "./client-page";

export default async function BlogPage() {
  const { query, data, variables } = await client.queries.postConnection({
    first: 20,
  });

  return <ClientPage query={query} data={data} variables={variables} />;
}
```

**client-page.tsx (Client)**
```typescript
"use client";

import { tinaField, useTina } from 'tinacms/dist/react';
import Link from "next/link";
import { PostConnectionQuery, PostConnectionQueryVariables } from "@/tina/__generated__/types";

interface ClientPageProps {
  query: string;
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
}

export default function ClientPage({ query, data, variables }: ClientPageProps) {
  const { data: tinaData } = useTina({ query, data, variables });

  const edges = tinaData.postConnection.edges || [];

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {edges.map((edge: any) => (
          <li key={edge.node._sys.filename}>
            <Link href={`/blog/${edge.node._sys.filename}`}>
              <h2 data-tina-field={tinaField(edge.node, 'title')}>
                {edge.node.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Checklist

Before completing a feature:

- [ ] Server component fetches data with `await client.queries.xxx()`
- [ ] Server component destructures `{ query, data, variables }` from query response
- [ ] Server component passes `{ query, data, variables }` to client
- [ ] Client component has `"use client"` directive
- [ ] Client component uses `useTina()` hook
- [ ] Props typed as `<CollectionName>Query` and `<CollectionName>QueryVariables`
- [ ] All editable elements use `tinaField()` helper
- [ ] `tinaField()` paths match schema exactly
- [ ] TypeScript types imported from `@/tina/__generated__/types`
- [ ] Error handling implemented on server side
- [ ] Dynamic data passed (not hardcoded paths)
- [ ] TinaMarkdown used for rich text fields
- [ ] Custom components defined in `mdx-components.tsx`
- [ ] Tested in visual editing mode
- [ ] No console errors or TypeScript issues
- [ ] Documented if architectural changes made

## Questions?

- **TinaCMS Docs**: https://tina.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/docs

Check existing pages in this repo for patterns and examples.

---

**Last Updated**: 2025-01-28
**Language**: TypeScript
**CMS**: TinaCMS
**UI**: React