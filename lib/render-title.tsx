'use client';

import type { ReactNode } from 'react';

/**
 * Render title with highlighted words using primary colour.
 * Uses React elements for safer rendering (no dangerouslySetInnerHTML).
 *
 * @param title - The title string to render
 * @param highlightWords - Comma-separated words to highlight with primary colour
 * @returns React node with highlighted words wrapped in spans
 */
export function renderTitle(
  title: string,
  highlightWords?: string | null
): ReactNode {
  if (!highlightWords || !title) return title;

  const words = highlightWords.split(',').map((w) => w.trim()).filter(Boolean);
  if (words.length === 0) return title;

  const regex = new RegExp(`(${words.join('|')})`, 'gi');
  const parts = title.split(regex);

  return parts.map((part, index) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span key={index} className="text-primary">
        {part}
      </span>
    ) : (
      part
    )
  );
}
