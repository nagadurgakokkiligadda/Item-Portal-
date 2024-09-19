const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Extract all elements from page', async ({ page }) => {
  await page.goto('https://item.p360.build:8444/users');

  const elements = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    return allElements.map(el => {
      return {
        tagName: el.tagName.toLowerCase(),
        class: el.className,
        id: el.id,
        text: el.textContent.trim(),
        attributes: Array.from(el.attributes, ({ name, value }) => ({ name, value }))
      };
    });
  });

  fs.writeFileSync('elements.json', JSON.stringify(elements, null, 2));
});