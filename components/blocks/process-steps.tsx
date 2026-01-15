'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { headerSchemaFields } from '@/tina/fields/header';
import { components } from '@/components/mdx-components';
import type { PageBlocksProcessSteps, PageBlocksProcessStepsSteps } from '@/tina/__generated__/types';

interface StepCardProps {
  step: PageBlocksProcessStepsSteps;
  index: number;
}

/**
 * Individual step card with numbered indicator (NumberedCard pattern).
 * Number is auto-generated from index position. Centered layout.
 */
function StepCard({ step, index }: StepCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="text-center">
        <div
          className="text-4xl font-serif font-bold text-primary/30"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <CardTitle
          data-tina-field={tinaField(step, 'title')}
          className="text-foreground"
        >
          <span className="sr-only">Step {index + 1}: </span>
          <h3>{step.title}</h3>
        </CardTitle>
        {step.description && (
          <div
            data-tina-field={tinaField(step, 'description')}
            className="text-sm text-muted-foreground prose dark:prose-invert prose-sm"
          >
            <TinaMarkdown content={step.description} components={components} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export interface ProcessStepsProps {
  data: PageBlocksProcessSteps;
}

/**
 * Process Steps block - Numbered step cards for processes and workflows.
 * Ideal for "How It Works", onboarding steps, or sequential instructions.
 */
export function ProcessSteps({ data }: ProcessStepsProps) {
  const columns = data.columns || 3;

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 lg:grid-cols-5',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="blur-slide"
          className={cn(
            'grid',
            columnClasses[columns as keyof typeof columnClasses] || columnClasses[3],
            gapClasses[(data.gap || 'md') as keyof typeof gapClasses]
          )}
        >
          {data.steps?.map((step, index) => (
            <div key={index} data-tina-field={tinaField(step)} className="h-full">
              <StepCard step={step!} index={index} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for ProcessSteps block
 */
export const processStepsBlockSchema: Template = {
  name: 'processSteps',
  label: 'Process Steps',
  ui: {
    previewSrc: '/blocks/process-steps.png',
    defaultItem: {
      title: 'How It Works',
      subtitle: 'Our simple process to get started.',
      columns: 3,
      gap: 'md',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (2-4)',
    },
    {
      type: 'string',
      label: 'Gap Size',
      name: 'gap',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    ...(headerSchemaFields.map((f) => ({ ...f })) as any[]),
    {
      type: 'object',
      label: 'Steps',
      name: 'steps',
      list: true,
      ui: {
        defaultItem: {
          title: 'Step Title',
        },
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'Step',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          required: true,
        },
        {
          type: 'rich-text',
          label: 'Description',
          name: 'description',
        },
      ],
    },
  ],
};
