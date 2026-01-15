'use client';

import { useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { highlightWordsField, badgeField, faqListField } from '@/tina/fields/shared';
import { components } from '@/components/mdx-components';
import type {
  PageBlocksFaqSection,
  PageBlocksFaqSectionItems,
} from '@/tina/__generated__/types';

interface FaqItemProps {
  item: PageBlocksFaqSectionItems;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ item, index, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      data-tina-field={tinaField(item)}
      className="border-b border-border last:border-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          data-tina-field={tinaField(item, 'question')}
          className="text-lg font-medium text-foreground pr-4"
        >
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180 text-primary'
          )}
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div
          data-tina-field={tinaField(item, 'answer')}
          className="pb-5 prose dark:prose-invert prose-sm max-w-none text-muted-foreground"
        >
          <TinaMarkdown content={item.answer} components={components} />
        </div>
      </div>
    </div>
  );
}

export interface FaqSectionProps {
  data: PageBlocksFaqSection;
}

export function FaqSection({ data }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const columns = data.columns || 1;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const columnClasses = {
    1: 'grid-cols-1 max-w-3xl mx-auto',
    2: 'grid-cols-1 md:grid-cols-2',
  };

  // Split items into columns if 2 columns selected
  const items = data.items || [];
  const leftItems = columns === 2 ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const rightItems = columns === 2 ? items.slice(Math.ceil(items.length / 2)) : [];

  return (
    <section className={cn('py-20 md:py-28', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        {columns === 1 ? (
          <AnimatedGroup
            preset="blur-slide"
            className={cn('grid gap-0', columnClasses[columns as keyof typeof columnClasses])}
          >
            {leftItems.map((item, index) => (
              <FaqItem
                key={index}
                item={item!}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </AnimatedGroup>
        ) : (
          <div className={cn('grid gap-8', columnClasses[columns as keyof typeof columnClasses])}>
            <AnimatedGroup preset="blur-slide" className="grid gap-0">
              {leftItems.map((item, index) => (
                <FaqItem
                  key={index}
                  item={item!}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </AnimatedGroup>
            <AnimatedGroup preset="blur-slide" className="grid gap-0">
              {rightItems.map((item, index) => {
                const actualIndex = leftItems.length + index;
                return (
                  <FaqItem
                    key={actualIndex}
                    item={item!}
                    index={actualIndex}
                    isOpen={openIndex === actualIndex}
                    onToggle={() => handleToggle(actualIndex)}
                  />
                );
              })}
            </AnimatedGroup>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for FaqSection block
 */
export const faqSectionBlockSchema: Template = {
  name: 'faqSection',
  label: 'FAQ Section',
  ui: {
    defaultItem: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services.',
      columns: 1,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'number',
      label: 'Columns',
      name: 'columns',
      description: 'Number of columns (1-2)',
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
    faqListField as any,
  ],
};
