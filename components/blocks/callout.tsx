"use client";
import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksCallout } from '@/tina/__generated__/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { sectionBlockSchemaField } from '../layout/section';
import { cn } from '@/lib/utils';
import type { Transition } from 'motion/react';

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            } as Transition,
        },
    },
};

export const Callout = ({ data }: { data: PageBlocksCallout }) => {
    return (
        <section className={cn("py-6", data.background)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AnimatedGroup variants={transitionVariants}>
                    <Link
                        data-tina-field={tinaField(data, 'url')}
                        href={data.url!}
                        className='group mx-auto flex w-fit items-center gap-3 rounded-full bg-primary/10 border border-primary/20 px-5 py-2.5 transition-all duration-300 hover:bg-primary/15 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10'
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span 
                            data-tina-field={tinaField(data, 'text')} 
                            className='text-sm font-medium text-foreground/90'
                        >
                            {data.text}
                        </span>
                        <ArrowRight className='w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1' />
                    </Link>
                </AnimatedGroup>
            </div>
        </section>
    );
};

export const calloutBlockSchema: Template = {
    name: 'callout',
    label: 'Callout',
    ui: {
        previewSrc: '/blocks/callout.png',
        defaultItem: {
            url: 'https://tina.io/editorial-workflow',
            text: 'Support for live editing and editorial workflow',
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Text',
            name: 'text',
        },
        {
            type: 'string',
            label: 'Url',
            name: 'url',
        },
    ],
};
