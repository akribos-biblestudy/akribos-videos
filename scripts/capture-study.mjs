// Prepared demo data are opened through the same reader and library controls as in the tutorials.
export async function openVerse({ page, go }, { reference, resource, verseKey }) {
  const query = new URLSearchParams({ layout: 'single', focus: '1', tab: `1.1:${resource}:A:${reference}`, active: '1.1' });
  await go('/' + encodeURIComponent(reference) + '?' + query);
  const verse = page.locator('.flow-column[data-resource-id="' + resource + '"] [data-verse-key="' + verseKey + '"]').first();
  const number = verse.locator('a.verse-number');
  await number.waitFor();
  return { verse, number };
}

export async function openVerseMenu(page, number) {
  await number.click();
  const menu = page.locator('[role="menu"]:visible').last();
  await menu.waitFor();
  return menu;
}

export async function openDocumentFromBoard({ page, go }, title) {
  await go('/sermons');
  const card = page.getByTestId('sermon-card').filter({ has: page.getByRole('link', { name: title, exact: true }) });
  const link = card.getByRole('link', { name: title, exact: true });
  await link.waitFor();
  return { card, link };
}

export async function captureAccountMenu({ page, snap }, { profileShot, menuShot, destination }) {
  const profile = page.locator('[data-tour-target="user-menu"]');
  await snap(profileShot, profile, { size: [520, 225], point: profile });
  await profile.click();
  const menu = page.locator('[role="menu"]:visible').last();
  const link = menu.locator('a[href="' + destination + '"]');
  await snap(menuShot, [profile, link], { size: [440, 266], point: link });
  await link.click();
}

// Capture the position of the visible label within full-width menu rows.
export function labelPoint(locator) {
  return {
    boundingBox: () => locator.evaluate(node => {
      const range = document.createRange();
      range.selectNodeContents(node);
      const { x, y, width, height } = range.getBoundingClientRect();
      return { x, y, width, height };
    })
  };
}
