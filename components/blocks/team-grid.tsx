'use client';

import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { Card, CardContent } from '@/components/ui/card';
import { sectionBlockSchemaField } from '@/components/layout/section';
import { BlockHeader } from '@/components/blocks/shared/block-header';
import { highlightWordsField, badgeField, teamMembersListField } from '@/tina/fields/shared';
import { components } from '@/components/mdx-components';
import type {
  PageBlocksTeamGrid,
  PageBlocksTeamGridMembers,
} from '@/tina/__generated__/types';

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface TeamMemberCardProps {
  member: PageBlocksTeamGridMembers;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card>
      <CardContent>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name || ''}
            className="h-20 w-20 rounded-full object-cover"
            data-tina-field={tinaField(member, 'image')}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/70 text-2xl font-bold text-primary-foreground">
            {getInitials(member.name || 'TM')}
          </div>
        )}

        <h3
          data-tina-field={tinaField(member, 'name')}
          className="text-foreground"
        >
          {member.name}
        </h3>

        <p
          data-tina-field={tinaField(member, 'role')}
          className="text-sm font-medium text-primary"
        >
          {member.role}
        </p>

        {member.description && (
          <div
            data-tina-field={tinaField(member, 'description')}
            className="text-sm text-muted-foreground prose dark:prose-invert prose-sm"
          >
            <TinaMarkdown content={member.description} components={components} />
          </div>
        )}

        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            Connect
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export interface TeamGridProps {
  data: PageBlocksTeamGrid;
}

export function TeamGrid({ data }: TeamGridProps) {
  const columns = data.columns || 4;

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-24 lg:py-32', data.background || 'bg-background')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlockHeader data={data} />

        <AnimatedGroup
          preset="blur-slide"
          className={cn('grid gap-6', columnClasses[columns as keyof typeof columnClasses])}
        >
          {data.members?.map((member, index) => (
            <div key={index} data-tina-field={tinaField(member)}>
              <TeamMemberCard member={member!} />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

/**
 * TinaCMS Schema for TeamGrid block
 */
export const teamGridBlockSchema: Template = {
  name: 'teamGrid',
  label: 'Team Grid',
  ui: {
    defaultItem: {
      title: 'Our Team',
      subtitle: 'Meet the people behind our success.',
      columns: 4,
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
    teamMembersListField as any,
  ],
};
