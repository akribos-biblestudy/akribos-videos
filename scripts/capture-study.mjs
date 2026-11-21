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
