'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';
import type { Template } from 'tinacms';
import { PageBlocksVideo } from '@/tina/__generated__/types';
import { sectionBlockSchemaField } from '../layout/section';
import { cn } from '@/lib/utils';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export const Video = ({ data }: { data: PageBlocksVideo }) => {
  if (!data.url) {
    return null;
  }
  return (
    <section className={cn("py-24 lg:py-32", data.background)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("aspect-video", data.color)}>
          <ReactPlayer width='100%' height='100%' style={{ margin: 'auto' }} playing={!!data.autoPlay} loop={!!data.loop} controls={true} url={data.url} />
        </div>
      </div>
    </section>
  );
};

export const videoBlockSchema: Template = {
  name: 'video',
  label: 'Video',
  ui: {
    defaultItem: {
      url: 'https://www.youtube.com/watch?v=j8egYW7Jpgk',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Color',
      name: 'color',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Tint', value: 'tint' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      type: 'string',
      label: 'Url',
      name: 'url',
    },
    {
      type: 'boolean',
      label: 'Auto Play',
      name: 'autoPlay',
    },
    {
      type: 'boolean',
      label: 'Loop',
      name: 'loop',
    },
  ],
};
