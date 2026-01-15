import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string for display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: "en-AU")
 * @returns Formatted date string (e.g., "2 December 2025")
 */
export function formatDate(dateString: string, locale = "en-AU"): string {
  return new Date(dateString).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
