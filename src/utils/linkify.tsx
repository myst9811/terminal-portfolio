import React from 'react';

/**
 * Converts URLs in text to clickable links
 */
export function linkify(text: string): React.ReactNode {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text by URLs
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    // Check if this part is a URL
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted hover:decoration-solid transition-all duration-200 cursor-pointer glow-link"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    // Reset the regex for the next test
    urlRegex.lastIndex = 0;
    return part;
  });
}
