/**
 * Combined header schema fields for block section headers.
 * Provides consistent badge, title, highlightWords, and subtitle fields.
 */

import type { TinaField } from 'tinacms';
import { badgeField, highlightWordsField } from './shared';

/**
 * Title field for section headers.
 */
export const titleField: TinaField = {
  type: 'string',
  label: 'Title',
  name: 'title',
};

/**
 * Subtitle field for section headers (uses textarea for multiline).
 */
export const subtitleField: TinaField = {
  type: 'string',
  label: 'Subtitle',
  name: 'subtitle',
  ui: {
    component: 'textarea',
  },
};

/**
 * Combined header schema fields array.
 * Use with spread operator in block schema fields:
 * fields: [sectionBlockSchemaField, ...headerSchemaFields, otherFields]
 */
export const headerSchemaFields: TinaField[] = [
  badgeField,
  titleField,
  highlightWordsField,
  subtitleField,
];
