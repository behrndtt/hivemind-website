import { SiteHero, type SitePostHeroProps } from '@/components/blocks/site-hero';

export type PostHeroProps = SitePostHeroProps;

export function PostHero(props: PostHeroProps) {
  return <SiteHero {...props} />;
}
