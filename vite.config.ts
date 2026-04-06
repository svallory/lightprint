/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { glob } from 'glob';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Component groups
const componentGroups = [
  'inputs',
  'feedback',
  'overlay',
  'navigation',
  'layout',
  'data-display',
  'typography',
  'hooks'
];

// Get all individual component files (excluding index.ts, stories, and test files)
const componentFiles = glob.sync('src/components/**/*.tsx', {
  cwd: dirname,
  ignore: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx']
});

// Build entry points object
const entries: Record<string, string> = {
  // Main entry
  index: path.resolve(dirname, 'src/index.ts'),

  // Component groups — prefix with 'components/' so JS lands in dist/components/*/
  // matching where tsc emits declarations (rootDir=src → dist/components/*)
  ...Object.fromEntries(
    componentGroups.map(group => [
      `components/${group}/index`,
      path.resolve(dirname, `src/components/${group}/index.ts`)
    ])
  ),

  // Individual components
  ...Object.fromEntries(
    componentFiles.map(file => {
      const relativePath = file.replace(/^src\//, '').replace(/\.tsx$/, '');
      return [relativePath, path.resolve(dirname, file)];
    })
  )
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: entries,
      name: 'Lightprint',
      formats: ['es'],
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `lightprint.js`;
        }
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'tailwindcss',
        /^@radix-ui\/.*/,
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        'cmdk',
        'date-fns',
        'embla-carousel-react',
        'input-otp',
        'next-themes',
        'react-day-picker',
        'react-hook-form',
        'react-resizable-panels',
        'recharts',
        'sonner',
        'vaul',
        'zod'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          tailwindcss: 'tailwindcss'
        },
        // Preserve module structure
        preserveModules: false,
        // Ensure proper exports
        exports: 'named',
      },
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});
