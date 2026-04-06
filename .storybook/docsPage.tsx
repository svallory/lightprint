import React from 'react';
import {
  Canvas,
  Controls,
  Description,
  DocsContext,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';

const ThemePreview = ({
  label,
  theme,
  of,
  isPrimary,
}: {
  label: string;
  theme: 'light' | 'dark';
  of: React.ComponentProps<typeof Canvas>['of'];
  isPrimary: boolean;
}) => {
  return (
    <section className="lp-docs-theme-preview">
      <h2 className="lp-docs-theme-preview-title">{label}</h2>
      <div data-force-theme={theme} className={theme === 'dark' ? 'lp-docs-theme-surface dark' : 'lp-docs-theme-surface'}>
        <Canvas
          of={of}
          withToolbar="none"
          sourceState="hidden"
          layout="centered"
          story={{ __forceInitialArgs: true, __primary: isPrimary }}
        />
      </div>
    </section>
  );
};

export const DocsPage = () => {
  const docsContext = React.useContext(DocsContext);
  const stories = docsContext.componentStories();
  const primaryStory =
    stories.find((story) => story.tags?.includes('autodocs')) ?? stories[0];
  const showThemePreviews =
    (
      primaryStory?.parameters as
        | { docs?: { themePreviews?: boolean } }
        | undefined
    )?.docs?.themePreviews !== false;

  if (!primaryStory) {
    return null;
  }

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {showThemePreviews ? (
        <div className="lp-docs-theme-grid">
          <ThemePreview
            label="Light"
            theme="light"
            of={primaryStory.moduleExport}
            isPrimary={true}
          />
          <ThemePreview
            label="Dark"
            theme="dark"
            of={primaryStory.moduleExport}
            isPrimary={false}
          />
        </div>
      ) : (
        <ThemePreview
          label="Preview"
          theme="light"
          of={primaryStory.moduleExport}
          isPrimary={true}
        />
      )}
      <Controls />
      <Stories includePrimary={false} />
    </>
  );
};
