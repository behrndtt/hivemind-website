'use client';
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { InsightQuery } from '@/tina/__generated__/types';
import { useLayout } from '@/components/layout/layout-context';
import { components } from '@/components/mdx-components';
import ErrorBoundary from '@/components/error-boundary';

const titleColorClasses = {
  blue: 'from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500',
  teal: 'from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500',
  green: 'from-green-400 to-green-600',
  red: 'from-red-400 to-red-600',
  pink: 'from-pink-300 to-pink-500',
  purple: 'from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500',
  orange: 'from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500',
  yellow: 'from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500',
};

interface ClientInsightProps {
  data: InsightQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function InsightClientPage(props: ClientInsightProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const insight = data.insight;

  const date = new Date(insight.date!);
  let formattedDate = '';
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, 'MMM dd, yyyy');
  }

  const titleColour = titleColorClasses[theme!.color! as keyof typeof titleColorClasses];

  return (
    <ErrorBoundary>
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 data-tina-field={tinaField(insight, 'title')} className={`w-full relative\tmb-8 text-6xl font-extrabold tracking-normal text-center title-font`}>
            <span className={`bg-clip-text text-transparent bg-linear-to-r ${titleColour}`}>{insight.title}</span>
          </h2>
          <div className='flex items-center justify-center mb-16'>
            <p
              data-tina-field={tinaField(insight, 'date')}
              className='text-base text-muted-foreground group-hover:text-foreground/80'
            >
              {formattedDate}
            </p>
          </div>
          {insight.heroImg && (
            <div className='px-4 w-full'>
              <div data-tina-field={tinaField(insight, 'heroImg')} className='relative max-w-4xl lg:max-w-5xl mx-auto'>
                <Image
                  priority={true}
                  src={insight.heroImg}
                  alt={insight.title}
                  className='absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light'
                  aria-hidden='true'
                  width={500}
                  height={500}
                  style={{ maxHeight: '25vh' }}
                />
                <Image
                  priority={true}
                  src={insight.heroImg}
                  alt={insight.title}
                  width={500}
                  height={500}
                  className='relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100'
                  style={{ maxWidth: '25vh' }}
                />
              </div>
            </div>
          )}
          <div data-tina-field={tinaField(insight, '_body')} className='prose dark:prose-invert w-full max-w-none'>
            <TinaMarkdown
              content={insight._body}
              components={{
                ...components,
              }}
            />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
