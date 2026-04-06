import type { Preview } from '@storybook/react-vite';
import { withDarkMode } from './darkModeDecorator';
import { DocsPage } from './docsPage';
import '../src/styles/globals.css';
import './docsPage.css';

const preview: Preview = {
  decorators: [withDarkMode],

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    docs: {
      page: DocsPage,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#252525' },
      ],
    },
  },
};

export default preview;
