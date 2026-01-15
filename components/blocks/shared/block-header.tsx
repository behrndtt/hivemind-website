'use client';

import { tinaField } from 'tinacms/dist/react';
import { cn } from '@/lib/utils';
import { renderTitle } from '@/lib/render-title';
import { Icon } from '@/components/icon';
import { InView } from '@/components/motion-primitives/in-view';
import { Badge } from '@/components/ui/badge';

/**
 * Props for BlockHeader component.
 * Accepts TinaCMS data object for visual editing integration.
 */
export interface BlockHeaderProps {
  /** TinaCMS data object containing header fields */
  data: {
    badge?: { text?: string | null; icon?: any } | null;
    title?: string | null;
    highlightWords?: string | null;
    subtitle?: string | null;
  };

  /** Heading level (default: h2) */
  as?: 'h1' | 'h2' | 'h3';

  /** Maximum width constraint (default: 3xl) */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none';

  /** Text alignment (default: center) */
  align?: 'left' | 'center';

  /** Enable InView animation (default: true) */
  animated?: boolean;

  /** Additional className for the container */
  className?: string;

  /** Custom title classes */
  titleClassName?: string;

  /** Custom subtitle classes */
  subtitleClassName?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  none: '',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center mx-auto',
};

/**
 * Reusable block header component for section headers.
 * Renders badge, title with highlight words, and subtitle with InView animation.
 * Integrates with TinaCMS visual editing via tinaField.
 */
export function BlockHeader({
  data,
  as: HeadingTag = 'h2',
  maxWidth = '3xl',
  align = 'center',
  animated = true,
  className,
  titleClassName,
  subtitleClassName,
}: BlockHeaderProps) {
  const hasContent = data.badge?.text || data.title || data.subtitle;

  if (!hasContent) return null;

  const headerContent = (
    <div
      className={cn(
        'mb-12 flex flex-col gap-4',
        maxWidthClasses[maxWidth],
        alignClasses[align],
        className
      )}
    >
      {data.badge?.text && (
        <div data-tina-field={tinaField(data, 'badge')}>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground inline-flex items-center gap-2"
          >
            {data.badge.icon && (
              <Icon data={data.badge.icon} className="w-3 h-3" />
            )}
            {data.badge.text}
          </Badge>
        </div>
      )}

      {data.title && (
        <HeadingTag
          data-tina-field={tinaField(data, 'title')}
          className={cn(
            'tracking-tight text-foreground',
            titleClassName
          )}
        >
          {renderTitle(data.title, data.highlightWords)}
        </HeadingTag>
      )}

      {data.subtitle && (
        <p
          data-tina-field={tinaField(data, 'subtitle')}
          className={cn('text-lg text-muted-foreground', subtitleClassName)}
        >
          {data.subtitle}
        </p>
      )}
    </div>
  );

  if (!animated) return headerContent;

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      viewOptions={{ once: true, margin: '-100px' }}
    >
      {headerContent}
    </InView>
  );
}
