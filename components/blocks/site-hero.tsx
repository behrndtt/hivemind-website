'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, Building2, Briefcase, Calendar, Clock, RefreshCw, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { renderTitle } from '@/lib/render-title';
import { Icon } from '@/components/icon';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PageBlocksPageHero, InsightQuery, CaseStudyQuery } from '@/tina/__generated__/types';

type InsightPost = InsightQuery['insight'];
type CaseStudyPost = CaseStudyQuery['caseStudy'];
type Post = InsightPost | CaseStudyPost;

export interface SitePageHeroProps { data: PageBlocksPageHero }
export interface SitePostHeroProps {
  post: Post;
  backLink: { href: string; label: string };
  contentType: 'insight' | 'case-study';
  className?: string;
}

function formatDate(value?: string | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
}

function estimateReadingTime(bodyNode?: any) {
  if (!bodyNode) return 1;
  let words = 0;
  const visit = (node: any) => {
    if (!node) return;
    if (typeof node === 'string') words += node.trim().split(/\s+/).filter(Boolean).length;
    if (typeof node.text === 'string') words += node.text.trim().split(/\s+/).filter(Boolean).length;
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  visit(bodyNode);
  return words ? Math.max(1, Math.ceil(words / 200)) : 3;
}

function HeroMedia({ src, alt = '', darkOverlay = false }: { src?: string | null; alt?: string; darkOverlay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 24 });

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const handlePointerMove = (event: PointerEvent) => {
      if (!ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, pointerY, reducedMotion]);

  const imageX = useTransform(x, value => value * 10);
  const imageY = useTransform(y, value => value * 8);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-primary/10">
      {src ? <motion.img src={src} alt={alt} className={cn('absolute -inset-[3%] h-[106%] w-[106%] object-cover object-[68%_center] opacity-80', darkOverlay && 'scale-[1.2]')} style={{ x: imageX, y: imageY }} /> : <div className="absolute inset-0 bg-[linear-gradient(115deg,hsl(var(--primary)/.3),transparent_42%,hsl(var(--foreground)/.2))]" />}
      <div className={cn(
        'absolute inset-0',
        darkOverlay
          ? 'bg-linear-to-b from-background/90 via-background/75 to-background/95'
          : 'bg-[linear-gradient(90deg,hsl(var(--background)/.98)_0%,hsl(var(--background)/.78)_42%,hsl(var(--background)/.2)_100%)]'
      )} />
      {!darkOverlay && <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background)/.9),transparent_55%)]" />}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--foreground)/.12)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.12)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}

function PageHero({ data }: SitePageHeroProps) {
  const compact = data.variant === 'compact';
  const heroImage = (data as PageBlocksPageHero & { heroImage?: string }).heroImage;
  return (
    <section className={cn('relative isolate min-h-[420px] overflow-hidden bg-background', compact ? 'py-20 md:py-24' : 'min-h-[min(62vh,640px)] py-24 md:py-28', data.background)}>
      <HeroMedia src={heroImage} />
      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <AnimatedGroup preset="blur-slide" triggerOnMount className={cn('max-w-3xl', data.align === 'center' && 'mx-auto text-center')}>
          {data.badge?.text && <div data-tina-field={tinaField(data, 'badge')} className={cn('mb-6', data.align === 'center' && 'flex justify-center')}><span className="inline-flex items-center gap-2 border border-primary/30 bg-background/60 px-4 py-2 text-sm font-medium text-primary backdrop-blur-md">{data.badge.icon && <Icon data={data.badge.icon} className="h-4 w-4" />}{data.badge.text}</span></div>}
          {data.title && <h1 data-tina-field={tinaField(data, 'title')} className="mb-6 text-4xl tracking-tight sm:text-5xl lg:text-7xl">{renderTitle(data.title, data.highlightWords || undefined)}</h1>}
          {data.subtitle && <p data-tina-field={tinaField(data, 'subtitle')} className={cn('mb-8 max-w-2xl whitespace-pre-line text-lg text-muted-foreground', data.align === 'center' && 'mx-auto')}>{data.subtitle}</p>}
          {data.buttons?.length ? <div className={cn('flex flex-col gap-3 sm:flex-row', data.align === 'center' && 'justify-center')}>{data.buttons.map((button, index) => <div key={index} data-tina-field={tinaField(button)}><Button asChild size="lg" variant={button?.variant === 'outline' ? 'outline' : 'default'} className="rounded-full px-7"><Link href={button?.href || '/'}>{button?.icon && <Icon data={button.icon} className="h-4 w-4" />}<span>{button?.label}</span>{button?.variant !== 'outline' && <ArrowRight className="h-4 w-4" />}</Link></Button></div>)}</div> : null}
        </AnimatedGroup>
      </div>
    </section>
  );
}

function PostHero({ post, backLink, contentType, className }: SitePostHeroProps) {
  const insight = post as InsightPost;
  const caseStudy = post as CaseStudyPost;
  const category = contentType === 'case-study' ? caseStudy.industry || 'Case Study' : insight.topic || 'Insight';
  const updatedDate = contentType === 'insight' ? insight.updatedDate : null;
  const results = post.results?.filter(Boolean) || [];
  return (
    <section className={cn('relative isolate min-h-[480px] overflow-hidden bg-background py-20 md:py-24', className)}>
      <HeroMedia src={post.heroImg} darkOverlay />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><AnimatedGroup preset="blur-slide" triggerOnMount className="max-w-4xl">
        <Link href={backLink.href} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4" />{backLink.label}</Link>
        <div className="mb-6 flex flex-wrap items-center gap-3"><span className="rounded-full border border-primary/30 bg-background/60 px-4 py-2 text-sm font-medium text-primary backdrop-blur-md">{category}</span>{post.featured && <Badge variant="outline">Featured</Badge>}</div>
        <h1 data-tina-field={tinaField(post, 'title')} className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.6px] sm:text-5xl sm:tracking-[-1.8px]">{post.title}</h1>
        {post.excerpt && <p data-tina-field={tinaField(post, 'excerpt')} className="mb-8 max-w-3xl text-lg font-medium tracking-[-0.15px] text-muted-foreground [font-variation-settings:normal]">{typeof post.excerpt === 'string' ? post.excerpt : ''}</p>}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">{post.date && <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />Published {formatDate(post.date)}</span>}{updatedDate && updatedDate !== post.date && <span className="inline-flex items-center gap-2"><RefreshCw className="h-4 w-4" />Updated {formatDate(updatedDate)}</span>}{contentType === 'insight' && insight.author && <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{insight.author}</span>}<span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{estimateReadingTime((post as any)._body)} min read</span>{contentType === 'case-study' && caseStudy.client && <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" />{caseStudy.client}</span>}{contentType === 'case-study' && caseStudy.industry && <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4" />{caseStudy.industry}</span>}</div>
        {results.length > 0 && <div className="mt-10 border-t border-border/50 pt-8"><div className="mb-5 flex items-center gap-2 text-sm font-medium text-muted-foreground"><TrendingUp className="h-4 w-4" />Key Results</div><div data-tina-field={tinaField(post, 'results')} className="grid grid-cols-2 gap-3 md:grid-cols-4">{results.map((result, index) => <div key={index} className="border border-primary/20 bg-background/50 p-4 backdrop-blur-md"><data value={result?.value || ''} className="text-2xl font-medium text-primary">{result?.value}</data><div className="mt-1 text-sm text-muted-foreground">{result?.label}</div></div>)}</div></div>}
      </AnimatedGroup></div>
    </section>
  );
}

export function SiteHero(props: SitePageHeroProps | SitePostHeroProps) {
  return 'data' in props ? <PageHero {...props} /> : <PostHero {...props} />;
}