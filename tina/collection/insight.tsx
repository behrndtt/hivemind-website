import { videoBlockSchema } from '@/components/blocks/video';
import { tagsFieldSchema } from '@/tina/fields';
import type { Collection } from 'tinacms';

const Insight: Collection = {
  label: 'Insights',
  name: 'insight',
  path: 'content/insights',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/insights/${document._sys.breadcrumbs.join('/')}`;
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'image',
      name: 'heroImg',
      label: 'Hero Image',
      required: true,
      // @ts-ignore
      uploadDir: () => 'insights',
    },
    {
      type: 'string',
      label: 'Author',
      name: 'author',
      required: true,
    },
    {
      type: 'string',
      label: 'Topic',
      name: 'topic',
      required: true,
      options: ['Azure', 'Copilot', 'Microsoft 365', 'Security'],
    },
    {
      type: 'string',
      label: 'Executive Summary',
      name: 'executiveSummary',
      required: true,
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'rich-text',
      label: 'Excerpt',
      name: 'excerpt',
      overrides: {
        toolbar: ['bold', 'italic', 'link'],
      },
    },
    {
      type: 'datetime',
      label: 'Published Date',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },
    {
      type: 'datetime',
      label: 'Updated Date',
      name: 'updatedDate',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },
    {
      type: 'boolean',
      label: 'Featured Post',
      name: 'featured',
      description: 'Mark this post as featured to highlight it at the top of post grids',
    },
    tagsFieldSchema,
    {
      type: 'object',
      label: 'Key Results',
      name: 'results',
      list: true,
      description: 'Key metrics or results to display in the sidebar',
      fields: [
        {
          type: 'string',
          label: 'Value',
          name: 'value',
          required: true,
          description: 'The metric value (e.g., "50%", "$1M", "3x")',
        },
        {
          type: 'string',
          label: 'Label',
          name: 'label',
          required: true,
          description: 'Description of the metric',
        },
      ],
      ui: {
        itemProps: (item) => ({
          label: item?.value ? `${item.value} - ${item.label}` : 'New Result',
        }),
      },
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: '_body',
      templates: [
        {
          name: 'BlockQuote',
          label: 'Block Quote',
          fields: [
            {
              name: 'children',
              label: 'Quote',
              type: 'rich-text',
              overrides: {
                toolbar: ['bold', 'italic', 'link'],
              },
            },
            {
              name: 'authorName',
              label: 'Author',
              type: 'string',
            },
          ],
        },
        {
          name: 'DateTime',
          label: 'Date & Time',
          inline: true,
          fields: [
            {
              name: 'format',
              label: 'Format',
              type: 'string',
              options: ['utc', 'iso', 'local'],
            },
          ],
        },
        {
          name: 'Testimonial',
          label: 'Testimonial',
          fields: [
            {
              name: 'quote',
              label: 'Quote',
              type: 'string',
              required: true,
              ui: {
                component: 'textarea',
              },
            },
            {
              name: 'author',
              label: 'Author Name',
              type: 'string',
              required: true,
            },
            {
              name: 'role',
              label: 'Role',
              type: 'string',
            },
            {
              name: 'company',
              label: 'Company',
              type: 'string',
            },
            {
              name: 'avatar',
              label: 'Avatar',
              type: 'image',
            },
          ],
          ui: {
            defaultItem: {
              quote: 'This solution transformed our workflow.',
              author: 'Jane Smith',
              role: 'CEO',
              company: 'Acme Inc',
            },
          },
        },
        videoBlockSchema,
      ],
      isBody: true,
    },
  ],
};

export default Insight;
