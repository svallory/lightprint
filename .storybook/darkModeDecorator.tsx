import React from 'react';
import type { Decorator } from '@storybook/react';
import { ThemedStoryWrapper } from './ThemedStoryWrapper';

type ThemeMode = 'light' | 'dark';

const getForcedTheme = (canvasElement?: HTMLElement | null): ThemeMode | null => {
  const forcedTheme = canvasElement
    ?.closest<HTMLElement>('[data-force-theme]')
    ?.dataset.forceTheme;

  if (forcedTheme === 'light' || forcedTheme === 'dark') {
    return forcedTheme;
  }

  return null;
};

export const withDarkMode: Decorator = (StoryFn, context) => {
  const forcedTheme = getForcedTheme(context.canvasElement);
  const globalTheme: ThemeMode = context.globals.theme === 'dark' ? 'dark' : 'light';
  const theme = forcedTheme ?? globalTheme;
  const isDark = theme === 'dark';
  const syncDocumentTheme = !forcedTheme && context.viewMode === 'story';
  const isDocsView = context.viewMode === 'docs';

  return (
    <ThemedStoryWrapper isDark={isDark} syncDocumentTheme={syncDocumentTheme}>
      {isDocsView ? (
        <div className="lp-docs-story-frame">
          <StoryFn />
        </div>
      ) : (
        <StoryFn />
      )}
    </ThemedStoryWrapper>
  );
};
