import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Button from '../Button';

const mockOnClick = vi.fn();

// Include this to check if the styles are injected to the DOM
test.skip('DEBUG: Inspect DOM for CSS', () => {
  render(
    <Button onClick={mockOnClick} isActive>
      Click me
    </Button>
  );
  const button = screen.getByText('Click me');

  console.log('=== DOM DEBUG ===');
  console.log('Button classes:', button.className);
  console.log('Button outerHTML:', button.outerHTML);

  // ✅ Kolla alla <style> taggar i DOM
  const styleTags = document.querySelectorAll('style');
  console.log('Number of <style> tags:', styleTags.length);

  styleTags.forEach((style, index) => {
    console.log(`Style tag ${index}:`, style.textContent?.substring(0, 200) + '...');
  });

  // ✅ Kolla alla <link> taggar för CSS
  const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
  console.log('Number of <link> stylesheet tags:', linkTags.length);

  linkTags.forEach((link, index) => {
    console.log(`Link tag ${index}:`, (link as HTMLLinkElement).href);
  });

  // ✅ Kolla document.styleSheets
  console.log('document.styleSheets.length:', document.styleSheets.length);

  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i];
    console.log(`StyleSheet ${i}:`, {
      href: sheet.href,
      title: sheet.title,
      // media: sheet.media.mediaText,
      disabled: sheet.disabled
    });

    try {
      console.log(`StyleSheet ${i} rules:`, sheet.cssRules?.length);
      if (sheet.cssRules) {
        for (let j = 0; j < Math.min(sheet.cssRules.length, 5); j++) {
          console.log(`  Rule ${j}:`, sheet.cssRules[j].cssText);
        }
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(`Cannot access rules for stylesheet ${i}:`, e.message);
    }
  }

  // ✅ Kolla computed styles
  const computedStyle = window.getComputedStyle(button);
  console.log('Computed color:', computedStyle.color);
  console.log('Computed background-color:', computedStyle.backgroundColor);
  console.log('Computed padding:', computedStyle.padding);
  console.log('Computed border:', computedStyle.border);

  // ✅ Kolla hela document head
  console.log('Document head innerHTML:', document.head.innerHTML);

  // ✅ Dummy assertion så testet inte failar
  expect(button).toBeInTheDocument();
});
