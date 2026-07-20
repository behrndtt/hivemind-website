import { format } from 'date-fns';
import React from 'react';
import { Components, TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import Image from 'next/image';
import { Prism } from 'tinacms/dist/rich-text/prism';
import { Video } from './blocks/video';
import { PageBlocksVideo } from '@/tina/__generated__/types';
import { Mermaid } from './blocks/mermaid';

export const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  Testimonial: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  video: PageBlocksVideo;
}> = {
  code_block: (props) => {
    if (!props) {
      return <></>;
    }
    
    if (props.lang === 'mermaid') {
      return <Mermaid value={props.value} />
    }

    return <Prism lang={props.lang} value={props.value} />;
  },
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <figure className="my-8 border-l-4 border-primary bg-muted/30 px-6 py-5">
        <blockquote className="m-0 border-0 p-0 text-foreground/80">
          <TinaMarkdown content={props.children} />
        </blockquote>
        {props.authorName && (
          <figcaption className="mt-4 text-sm font-medium text-foreground">
            {props.authorName}
          </figcaption>
        )}
      </figure>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case 'iso':
        return <span>{format(dt, 'yyyy-MM-dd')}</span>;
      case 'utc':
        return <span>{format(dt, 'eee, dd MMM yyyy HH:mm:ss OOOO')}</span>;
      case 'local':
        return <span>{format(dt, 'P')}</span>;
      default:
        return <span>{format(dt, 'P')}</span>;
    }
  },
  img: (props) => {
    if (!props) {
      return <></>;
    }
    return (
      <span className='flex items-center justify-center'>
        <Image
          src={props.url}
          alt={props.alt || ''}
          width={1200}
          height={675}
          sizes="(max-width: 768px) 100vw, 800px"
          className="h-auto max-w-full rounded-lg"
        />
      </span>
    );
  },
  mermaid: (props: any) => <Mermaid {...props} />,
  video: (props) => {
    return <Video data={props} />;
  },
  Testimonial: (props: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
  }) => {
    return (
      <div>
        <blockquote className="border-primary border-l-4 font-sans text-base leading-relaxed">
          &ldquo;{props.quote}&rdquo;
        </blockquote>
        <div>
          <p className="text-base font-medium">{props.author}</p>
          {(props.role || props.company) && (
            <span className="text-sm text-muted-foreground">
              {props.role}
              {props.role && props.company && ' at '}
              {props.company}
            </span>
          )}
        </div>
      </div>
    );
  },
};
