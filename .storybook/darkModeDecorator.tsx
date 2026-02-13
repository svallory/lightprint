import React, { useEffect } from 'react';
import type { Decorator } from '@storybook/react';

export const withDarkMode: Decorator = (StoryFn, context) => {
  const { globals } = context;
  const isDark = globals.theme === 'dark';

  useEffect(() => {
    // In Storybook, we're inside an iframe, so document.documentElement is correct
    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return <StoryFn />;
};
