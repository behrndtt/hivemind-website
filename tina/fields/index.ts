/**
 * TinaCMS Field Definitions
 * 
 * This barrel file exports all shared field definitions for use in block schemas.
 * Import from '@/tina/fields' to access all field definitions.
 */

// Icon picker with color and style options
export { iconSchema, IconPickerInput } from './icon';

// Color picker for icon and other color fields
export { ColorPickerInput } from './color';

// Tags picker that loads options from the tag collection
export { TagsPickerInput, tagsFieldSchema } from './tags';

// Shared field definitions for blocks
export {
  // Simple fields
  highlightWordsField,
  badgeField,
  buttonField,
  buttonsListField,
  
  // Stats and metrics
  statItemFields,
  statsListField,
  resultItemFields,
  resultsListField,
  
  // Cards and content
  cardItemFields,
  cardsListField,
  
  // Testimonials
  testimonialItemFields,
  testimonialsListField,
  
  // Team members
  teamMemberFields,
  teamMembersListField,
  
  // Pricing
  pricingPlanFields,
  pricingPlansListField,
  
  // FAQ
  faqItemFields,
  faqListField,
  
  // Milestones/Timeline
  milestoneItemFields,
  milestonesListField,
  
  // Contact
  contactCardFields,
  contactCardsListField,
} from './shared';

// Re-export section background field from layout (for convenience)
export { sectionBlockSchemaField, tailwindBackgroundOptions } from '@/components/layout/section';
