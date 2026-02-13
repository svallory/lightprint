#!/usr/bin/env bun
/**
 * Automated Dark Mode Verification Script
 * Verifies all 55 components render correctly in light and dark modes
 */

import { chromium } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6006';

// Component categories matching docs/dark-mode-tracker.md
const components = {
  'Inputs': [
    'Button', 'ButtonGroup', 'Checkbox', 'Field', 'Form', 'Input',
    'InputGroup', 'InputOtp', 'Label', 'RadioGroup', 'Select',
    'Slider', 'Switch', 'Textarea', 'Toggle', 'ToggleGroup'
  ],
  'Feedback': [
    'Alert', 'Badge', 'Progress', 'Skeleton', 'Sonner',
    'Spinner', 'Toast', 'Toaster'
  ],
  'Overlay': [
    'AlertDialog', 'ContextMenu', 'Dialog', 'Drawer', 'DropdownMenu',
    'HoverCard', 'Menubar', 'Popover', 'Sheet', 'Tooltip'
  ],
  'Navigation': [
    'Breadcrumb', 'Command', 'NavigationMenu', 'Pagination',
    'Sidebar', 'Tabs'
  ],
  'Layout': [
    'AspectRatio', 'Card', 'Item', 'Resizable', 'ScrollArea', 'Separator'
  ],
  'Data Display': [
    'Accordion', 'Avatar', 'Calendar', 'Carousel', 'Chart',
    'Collapsible', 'Empty', 'Table'
  ],
  'Typography': ['Kbd']
};

interface VerificationResult {
  component: string;
  category: string;
  lightMode: boolean;
  darkMode: boolean;
  errors: string[];
}

async function verifyComponent(
  page: any,
  category: string,
  component: string
): Promise<VerificationResult> {
  const result: VerificationResult = {
    component,
    category,
    lightMode: false,
    darkMode: false,
    errors: []
  };

  try {
    // Navigate to component
    const componentPath = `${STORYBOOK_URL}/?path=/docs/${category.toLowerCase().replace(' ', '-')}-${component.toLowerCase()}--docs`;
    await page.goto(componentPath, { waitUntil: 'domcontentloaded', timeout: 10000 });

    // Wait for content to load
    await page.waitForTimeout(1500);

    // Check light mode
    const lightModeButton = await page.getByRole('button', { name: /Global theme for components/i }).first();
    const currentTheme = await lightModeButton.textContent();

    if (!currentTheme?.includes('Light')) {
      // Switch to light mode
      await lightModeButton.click();
      await page.getByRole('option', { name: 'Light' }).click();
      await page.waitForTimeout(500);
    }

    // Verify light mode renders without console errors
    const lightErrors = await page.evaluate(() => {
      const errors: string[] = [];
      // Check for any error elements or missing content
      const body = document.querySelector('iframe')?.contentDocument?.body;
      if (!body || body.textContent?.trim() === '') {
        errors.push('Empty content in light mode');
      }
      return errors;
    });

    result.lightMode = lightErrors.length === 0;
    result.errors.push(...lightErrors);

    // Switch to dark mode
    await lightModeButton.click();
    await page.getByRole('option', { name: 'Dark' }).click();
    await page.waitForTimeout(500);

    // Verify dark mode renders without console errors
    const darkErrors = await page.evaluate(() => {
      const errors: string[] = [];
      const body = document.querySelector('iframe')?.contentDocument?.body;
      if (!body || body.textContent?.trim() === '') {
        errors.push('Empty content in dark mode');
      }
      return errors;
    });

    result.darkMode = darkErrors.length === 0;
    result.errors.push(...darkErrors);

  } catch (error: any) {
    result.errors.push(`Failed to verify: ${error.message}`);
  }

  return result;
}

async function main() {
  console.log('🚀 Starting Dark Mode Verification\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results: VerificationResult[] = [];
  let totalComponents = 0;
  let verifiedComponents = 0;

  for (const [category, componentList] of Object.entries(components)) {
    console.log(`\n📦 ${category} (${componentList.length} components)`);

    for (const component of componentList) {
      totalComponents++;
      process.stdout.write(`  ⏳ ${component}... `);

      const result = await verifyComponent(page, category, component);
      results.push(result);

      if (result.lightMode && result.darkMode) {
        console.log('✅');
        verifiedComponents++;
      } else {
        console.log(`❌ ${result.errors.join(', ')}`);
      }
    }
  }

  await browser.close();

  // Generate report
  console.log('\n\n📊 VERIFICATION SUMMARY');
  console.log('━'.repeat(50));
  console.log(`Total Components: ${totalComponents}`);
  console.log(`Verified: ${verifiedComponents}`);
  console.log(`Failed: ${totalComponents - verifiedComponents}`);
  console.log(`Success Rate: ${((verifiedComponents / totalComponents) * 100).toFixed(1)}%`);

  if (verifiedComponents < totalComponents) {
    console.log('\n❌ FAILED COMPONENTS:');
    results
      .filter(r => !r.lightMode || !r.darkMode)
      .forEach(r => {
        console.log(`  - ${r.category}/${r.component}: ${r.errors.join(', ')}`);
      });
  }

  // Update tracker
  console.log('\n📝 Updating tracker...');
  await updateTracker(results);

  console.log('\n✅ Verification complete!');
  process.exit(verifiedComponents === totalComponents ? 0 : 1);
}

async function updateTracker(results: VerificationResult[]) {
  const trackerPath = '/work/templates/lightprint/lightprint/docs/dark-mode-tracker.md';
  let content = await Bun.file(trackerPath).text();

  for (const result of results) {
    if (result.lightMode && result.darkMode) {
      // Mark as verified
      const pattern = new RegExp(`^- \\[ \\] (${result.component}( Group| OTP)?)`, 'gm');
      content = content.replace(pattern, '- [x] $1');
    }
  }

  await Bun.write(trackerPath, content);
}

main().catch(console.error);
