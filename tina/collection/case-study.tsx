import { videoBlockSchema } from '@/components/blocks/video';
import { TagsPickerInput } from '@/tina/fields';
import type { Collection } from 'tinacms';

const CaseStudy: Collection = {
  label: 'Case Studies',
  name: 'caseStudy',
  path: 'content/case-studies',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/case-studies/${document._sys.breadcrumbs.join('/')}`;
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
      // @ts-ignore
      uploadDir: () => 'case-studies',
    },
    {
      type: 'string',
      label: 'Client',
      name: 'client',
      description: 'The client or company featured in this case study',
    },
    {
      type: 'string',
      label: 'Industry',
      name: 'industry',
      description: 'The industry or sector of the client',
      options: [
        'Technology',
        'Healthcare',
        'Finance & Banking',
        'Retail & E-commerce',
        'Manufacturing',
        'Education',
        'Government & Public Sector',
        'Energy & Utilities',
        'Media & Entertainment',
        'Professional Services',
        'Real Estate',
        'Transportation & Logistics',
        'Telecommunications',
        'Non-Profit',
        'Other',
      ],
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
      type: 'boolean',
      label: 'Featured Post',
      name: 'featured',
      description: 'Mark this case study as featured to highlight it at the top of post grids',
    },
    {
      type: 'string',
      label: 'Tags',
      name: 'tags',
      list: true,
      description: 'Select tags from the tag collection',
      ui: {
        // @ts-expect-error - TinaCMS custom component type mismatch
        component: TagsPickerInput,
      },
    },
    {
      type: 'object',
      label: 'Key Results',
      name: 'results',
      list: true,
      description: 'Key metrics or outcomes achieved in this case study',
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
          name: 'NewsletterSignup',
          label: 'Newsletter Sign Up',
          fields: [
            {
              name: 'children',
              label: 'CTA',
              type: 'rich-text',
            },
            {
              name: 'placeholder',
              label: 'Placeholder',
              type: 'string',
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'string',
            },
            {
              name: 'disclaimer',
              label: 'Disclaimer',
              type: 'rich-text',
              overrides: {
                toolbar: ['bold', 'italic', 'link'],
              },
            },
          ],
          ui: {
            defaultItem: {
              placeholder: 'Enter your email',
              buttonText: 'Notify Me',
            },
          },
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

export default CaseStudy;
