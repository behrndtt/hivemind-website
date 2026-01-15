'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InView } from '@/components/motion-primitives/in-view';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { Card } from '@/components/ui/card';
import { highlightWordsField, badgeField, milestonesListField } from '@/tina/fields/shared';
import { components } from '@/components/mdx-components';
import type {
  PageBlocksMilestones,
  PageBlocksMilestonesMilestones as MilestoneItem,
} from '@/tina/__generated__/types';

interface MilestoneCardProps {
  milestone: MilestoneItem;
  index: number;
  variant: 'timeline' | 'cards' | 'compact';
  isLast: boolean;
}

/**
 * Compact timeline variant - minimal design matching milestone-timeline.tsx
 */
function CompactVariant({ milestone, isLast }: Omit<MilestoneCardProps, 'variant' | 'index'>) {
  return (
    <div className="relative flex items-start gap-3 group last:pb-0">
      {/* Timeline line - attached to item, fades on last */}
      <div 
        className={cn(
          "absolute left-[7px] top-4 bottom-0 w-px -mb-4 bg-zinc-700",
          isLast && "bottom-auto h-12 bg-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-zinc-700 before:to-transparent"
        )}
      />

      {/* Timeline dot */}
      <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
        <div
          className={cn(
            'h-2.5 w-2.5 rounded-full border-2 transition-colors',
            isLast
              ? 'border-primary bg-primary'
              : 'border-zinc-600 bg-zinc-900'
          )}
        />
      </div>

      {/* Event content */}
      <div data-tina-field={tinaField(milestone)} className="flex flex-col gap-0.5 pb-4">
        {milestone.date && (
          <span
            data-tina-field={tinaField(milestone, 'date')}
            className="font-serif text-sm font-bold text-primary"
          >
            {milestone.date}
          </span>
        )}
        <span
          data-tina-field={tinaField(milestone, 'title')}
          className="text-sm text-zinc-400 leading-snug"
        >
          {milestone.title}
        </span>
      </div>
    </div>
  );
}

function TimelineVariant({ milestone, index, isLast }: Omit<MilestoneCardProps, 'variant'>) {
  const isCompleted = milestone.status === 'completed';
  const isInProgress = milestone.status === 'in-progress';

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div
          className={cn(
            'absolute left-[15px] top-10 h-[calc(100%-20px)] w-0.5',
            isCompleted ? 'bg-primary' : 'bg-muted'
          )}
        />
      )}

      {/* Timeline dot */}
      <div className="relative shrink-0">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            isCompleted && 'bg-primary text-primary-foreground',
            isInProgress && 'bg-primary/20 border-2 border-primary text-primary',
            !isCompleted && !isInProgress && 'bg-muted text-muted-foreground'
          )}
        >
          {isCompleted ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <span className="text-sm font-semibold">{index + 1}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div data-tina-field={tinaField(milestone)} className="flex-1 pt-1">
        {milestone.date && (
          <span
            data-tina-field={tinaField(milestone, 'date')}
            className={cn(
              'text-sm font-medium',
              isCompleted ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {milestone.date}
          </span>
        )}
        <h3
          data-tina-field={tinaField(milestone, 'title')}
          className="mt-1"
        >
          {milestone.title}
        </h3>
        {milestone.description && (
          <div
            data-tina-field={tinaField(milestone, 'description')}
            className="mt-2 prose dark:prose-invert prose-sm max-w-none text-muted-foreground"
          >
            <TinaMarkdown content={milestone.description} components={components} />
          </div>
        )}
      </div>
    </div>
  );
}

function CardVariant({ milestone, index }: Omit<MilestoneCardProps, 'variant' | 'isLast'>) {
  const isCompleted = milestone.status === 'completed';
  const isInProgress = milestone.status === 'in-progress';

  return (
    <div
      data-tina-field={tinaField(milestone)}
      className={cn(
        'relative rounded-lg border p-6 transition-all duration-300',
        isCompleted && 'border-primary/50 bg-primary/5',
        isInProgress && 'border-primary bg-primary/10',
        !isCompleted && !isInProgress && 'border-border bg-card/50'
      )}
    >
      {/* Status indicator */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
            isCompleted && 'bg-primary/20 text-primary',
            isInProgress && 'bg-primary text-primary-foreground',
            !isCompleted && !isInProgress && 'bg-muted text-muted-foreground'
          )}
        >
          {isCompleted && <CheckCircle className="h-4 w-4" />}
          {milestone.status === 'completed' && 'Completed'}
          {milestone.status === 'in-progress' && 'In Progress'}
          {milestone.status === 'upcoming' && 'Upcoming'}
        </span>
        {milestone.date && (
          <span
            data-tina-field={tinaField(milestone, 'date')}
            className="text-sm text-muted-foreground"
          >
            {milestone.date}
          </span>
        )}
      </div>

      <h3
        data-tina-field={tinaField(milestone, 'title')}
        className="mb-2 text-foreground"
      >
        {milestone.title}
      </h3>

      {milestone.description && (
        <div
          data-tina-field={tinaField(milestone, 'description')}
          className="prose dark:prose-invert prose-sm max-w-none text-muted-foreground"
        >
          <TinaMarkdown content={milestone.description} components={components} />
        </div>
      )}
    </div>
  );
}

export interface MilestonesProps {
  data: PageBlocksMilestones;
}

export function Milestones({ data }: MilestonesProps) {
  const variant = data.variant || 'timeline';
  const milestones = data.milestones || [];
  const useCardWrapper = data.cardWrapper ?? false;
  const isCompact = variant === 'compact';

  // Alignment classes
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };
  const alignment = data.alignment || 'left';

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  const padding = data.padding || 'none';

  // Content alignment for milestones list
  const contentAlignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  const content = (
    <>
      <BlockHeader 
        data={data} 
        className={cn(
          alignmentClasses[alignment as keyof typeof alignmentClasses],
          isCompact && 'mb-4 [&_h2]:text-lg [&_h2]:md:text-xl [&_p]:text-sm'
        )} 
      />

      {variant === 'compact' ? (
        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            'max-w-md space-y-0',
            contentAlignmentClasses[alignment as keyof typeof contentAlignmentClasses]
          )}
        >
          {milestones.map((milestone, index) => (
            <CompactVariant
              key={index}
              milestone={milestone!}
              isLast={index === milestones.length - 1}
            />
          ))}
        </AnimatedGroup>
      ) : variant === 'timeline' ? (
        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            'max-w-3xl',
            contentAlignmentClasses[alignment as keyof typeof contentAlignmentClasses]
          )}
        >
          {milestones.map((milestone, index) => (
            <TimelineVariant
              key={index}
              milestone={milestone!}
              index={index}
              isLast={index === milestones.length - 1}
            />
          ))}
        </AnimatedGroup>
      ) : (
        <AnimatedGroup
          preset="blur-slide"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {milestones.map((milestone, index) => (
            <CardVariant
              key={index}
              milestone={milestone!}
              index={index}
            />
          ))}
        </AnimatedGroup>
      )}
    </>
  );

  return (
    <section className={cn('py-20 md:py-28', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {useCardWrapper ? (
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewOptions={{ once: true, margin: '-50px' }}
          >
            <Card className={cn(paddingClasses[padding as keyof typeof paddingClasses])}>
              {content}
            </Card>
          </InView>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for Milestones block
 */
export const milestonesBlockSchema: Template = {
  name: 'milestones',
  label: 'Milestones',
  ui: {
    defaultItem: {
      title: 'Our Journey',
      subtitle: 'Key milestones in our growth and development.',
      variant: 'timeline',
      cardWrapper: false,
      alignment: 'left',
      padding: 'none',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Layout Variant',
      name: 'variant',
      options: [
        { value: 'compact', label: 'Compact (Minimal)' },
        { value: 'timeline', label: 'Timeline (Detailed)' },
        { value: 'cards', label: 'Cards Grid' },
      ],
    },
    {
      type: 'boolean',
      label: 'Wrap in Card',
      name: 'cardWrapper',
      description: 'Wrap the entire block (header and content) in a card container',
    },
    {
      type: 'string',
      label: 'Alignment',
      name: 'alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
    },
    {
      type: 'string',
      label: 'Card Padding',
      name: 'padding',
      description: 'Padding inside the card wrapper (only applies when card wrapper is enabled)',
      options: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
    },
    badgeField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    highlightWordsField as any,
    {
      type: 'string',
      label: 'Subtitle',
      name: 'subtitle',
      ui: {
        component: 'textarea',
      },
    },
    milestonesListField as any,
  ],
};
