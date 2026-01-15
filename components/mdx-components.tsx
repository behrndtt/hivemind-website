import { format } from 'date-fns';
import React from 'react';
import { Components, TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import Image from 'next/image';
import { Prism } from 'tinacms/dist/rich-text/prism';
import { Video } from './blocks/video';
import { PageBlocksVideo } from '@/tina/__generated__/types';
import { Mermaid } from './blocks/mermaid';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/**
 * Get initials from a name for avatar fallback
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
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
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
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
  NewsletterSignup: (props) => {
    return (
      <div className='bg-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
          <div className=''>
            <TinaMarkdown content={props.children} />
          </div>
          <div className='mt-8 '>
            <form className='sm:flex'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email-address'
                type='email'
                autoComplete='email'
                required
                className='w-full px-5 py-3 border border-border shadow-xs placeholder-muted-foreground focus:ring-1 focus:ring-ring focus:border-primary sm:max-w-xs rounded-md'
                placeholder={props.placeholder}
              />
              <div className='mt-3 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:shrink-0'>
                <button
                  type='submit'
                  className='w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-foreground bg-primary hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-ring'
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className='mt-3 text-sm text-muted-foreground'>{props.disclaimer && <TinaMarkdown content={props.disclaimer} />}</div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => {
    if (!props) {
      return <></>;
    }
    return (
      <span className='flex items-center justify-center'>
        <Image src={props.url} alt={props.alt || ''} width={500} height={500} />
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
      <Card className="my-8 border-border bg-card/50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Quote className="h-8 w-8 shrink-0 text-primary/50" />
            <div className="flex-1">
              <p className="mb-4 text-lg italic text-foreground/80">
                "{props.quote}"
              </p>
              <div className="flex items-center gap-3">
                {props.avatar ? (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={props.avatar} alt={props.author} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(props.author)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {getInitials(props.author)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground">{props.author}</p>
                  {(props.role || props.company) && (
                    <p className="text-sm text-muted-foreground">
                      {props.role}
                      {props.role && props.company && ' at '}
                      {props.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
};
