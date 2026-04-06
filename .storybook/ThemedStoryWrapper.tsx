import React, { useEffect, useState } from 'react';
import {
  OverlayPortalContainerContext,
  OverlayThemeContext,
} from '../src/components/overlay/portal-container-context';

export const ThemedStoryWrapper = ({
  isDark,
  syncDocumentTheme,
  children,
}: {
  isDark: boolean;
  syncDocumentTheme: boolean;
  children: React.ReactNode;
}) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const docsPortalContainer = syncDocumentTheme ? null : portalContainer;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!syncDocumentTheme) {
      html.classList.remove('dark');
      body.classList.remove('dark');
      return;
    }

    if (isDark) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }

    return () => {
      html.classList.remove('dark');
      body.classList.remove('dark');
    };
  }, [isDark, syncDocumentTheme]);

  return (
    <div
      ref={setPortalContainer}
      className={isDark ? 'dark bg-background text-foreground' : 'bg-background text-foreground'}
    >
      <OverlayThemeContext.Provider value={isDark ? 'dark' : 'light'}>
        <OverlayPortalContainerContext.Provider value={docsPortalContainer}>
          {children}
        </OverlayPortalContainerContext.Provider>
      </OverlayThemeContext.Provider>
    </div>
  );
};
