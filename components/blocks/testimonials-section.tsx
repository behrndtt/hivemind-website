'use client';

import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { highlightWordsField, badgeField, testimonialsListField } from '@/tina/fields/shared';
import type {
  PageBlocksTestimonialsSection,
  PageBlocksTestimonialsSectionItems,
} from '@/tina/__generated__/types';

/**
 * Star rating component
 */
function StarRating() {
  return (
    <div className="flex text-primary mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: PageBlocksTestimonialsSectionItems;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent>
        <StarRating />

        <blockquote
          data-tina-field={tinaField(testimonial, 'quote')}
          className="text-md text-foreground/80 font-serif font-normal"
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-4">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author || ''}
              className="w-12 h-12 rounded-full bg-muted"
              data-tina-field={tinaField(testimonial, 'avatar')}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-primary font-serif font-normal">
                {testimonial.author?.charAt(0) || 'A'}
              </span>
            </div>
          )}
          <div>
            <div
              data-tina-field={tinaField(testimonial, 'author')}
              className="font-serif font-normal text-foreground"
            >
              {testimonial.author}
            </div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role && (
                <span data-tina-field={tinaField(testimonial, 'role')}>
                  {testimonial.role}
                </span>
              )}
              {testimonial.role && testimonial.company && ', '}
              {testimonial.company && (
                <span data-tina-field={tinaField(testimonial, 'company')}>
                  {testimonial.company}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface TestimonialsSectionProps {
  data: PageBlocksTestimonialsSection;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const columns = data.columns || 2;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="scale"
          className={cn('grid gap-6 sm:gap-8', columnClasses[columns as keyof typeof columnClasses] || 'grid-cols-1 md:grid-cols-2')}
        >
          {data.items?.map((testimonial, index) => (
            <div key={index} data-tina-field={tinaField(testimonial)}>
              <TestimonialCard testimonial={testimonial!} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for TestimonialsSection block
 */
export const testimonialsSectionBlockSchema: Template = {
  name: 'testimonialsSection',
  label: 'Testimonials Section',
  ui: {
    defaultItem: {
      title: 'What Our Clients Say',
      subtitle: 'Hear from businesses we have helped succeed.',
      columns: 3,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (1-4)',
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
    testimonialsListField as any,
  ],
};
