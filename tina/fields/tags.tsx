'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
import { useTina } from 'tinacms/dist/react';
import client from '../__generated__/client';

interface TagOption {
  value: string;
  label: string;
}

/**
 * Custom Tags Field Component
 * Fetches available tags from the tag collection and allows multi-select
 */
export const TagsPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Fetch tags from collection on mount
  React.useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = await client.queries.tagConnection();
        const tagOptions = result.data.tagConnection.edges?.map((edge) => ({
          value: edge?.node?.name || '',
          label: edge?.node?.name || '',
        })) || [];
        setTags(tagOptions);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedTags: string[] = input.value || [];

  const filteredTags = tags.filter(
    (tag) =>
      tag.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag.value)
  );

  const handleAddTag = (tagValue: string) => {
    if (!selectedTags.includes(tagValue)) {
      input.onChange([...selectedTags, tagValue]);
    }
    setInputValue('');
    setIsOpen(false);
  };

  const handleRemoveTag = (tagValue: string) => {
    input.onChange(selectedTags.filter((t) => t !== tagValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredTags.length > 0) {
      e.preventDefault();
      handleAddTag(filteredTags[0].value);
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      handleRemoveTag(selectedTags[selectedTags.length - 1]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-400 py-2">Loading tags...</div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      {/* Selected Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          padding: '8px',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          minHeight: '42px',
        }}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              fontSize: '14px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label={`Remove ${tag}`}
            >
              <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? 'Select tags...' : ''}
          style={{
            flex: 1,
            minWidth: '120px',
            outline: 'none',
            fontSize: '14px',
            backgroundColor: 'transparent',
            border: 'none',
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && filteredTags.length > 0 && (
        <div
          ref={dropdownRef}
          onWheel={(e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = target;
            const delta = e.deltaY;
            
            // Prevent scroll from bubbling when at boundaries
            if (
              (delta < 0 && scrollTop <= 0) ||
              (delta > 0 && scrollTop + clientHeight >= scrollHeight)
            ) {
              e.preventDefault();
            }
          }}
          style={{
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            maxHeight: '200px',
            overflowY: 'auto',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
          }}
        >
          {filteredTags.map((tag) => (
            <button
              key={tag.value}
              type="button"
              onClick={() => handleAddTag(tag.value)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eff6ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {tag.label}
            </button>
          ))}
        </div>
      )}

      {/* No tags available message */}
      {isOpen && filteredTags.length === 0 && inputValue && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '12px',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          No matching tags found
        </div>
      )}
    </div>
  );
});

/**
 * Tags field schema definition
 * Use this in your collection fields to add tag selection from the tag collection
 */
export const tagsFieldSchema = {
  type: 'string' as const,
  label: 'Tags',
  name: 'tags',
  list: true,
  description: 'Select tags from the tag collection',
  ui: {
    component: TagsPickerInput,
  },
};
