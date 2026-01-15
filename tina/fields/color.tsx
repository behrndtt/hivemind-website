'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Theme-based color options that align with Tailwind CSS theme variables
export const colorOptions = ['primary', 'secondary', 'accent', 'muted', 'white', 'zinc'];

export const ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  const inputClasses: Record<string, string> = {
    primary: 'bg-primary border-primary/80',
    secondary: 'bg-secondary border-secondary/80',
    accent: 'bg-accent border-accent/80',
    muted: 'bg-muted border-muted/80',
    white: 'bg-white border-gray-300',
    zinc: 'bg-zinc-700 border-zinc-600',
  };

  const labelClasses: Record<string, string> = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    muted: 'text-muted-foreground',
    white: 'text-zinc-900',
    zinc: 'text-zinc-100',
  };

  return (
    <>
      <input type='text' id={input.name} className='hidden' {...input} />
      <div className='flex gap-2 flex-wrap'>
        {colorOptions.map((color) => {
          return (
            <button
              key={color}
              className={`min-w-16 h-9 px-3 rounded-lg shadow border text-xs font-medium capitalize ${inputClasses[color]} ${labelClasses[color]} ${input.value === color ? 'ring-[3px] ring-offset-2 ring-blue-400' : ''}`}
              onClick={() => {
                input.onChange(color);
              }}
            >
              {color}
            </button>
          );
        })}
      </div>
    </>
  );
});
