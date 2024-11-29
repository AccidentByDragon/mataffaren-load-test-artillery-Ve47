// 1. Nyfiken förstagångs-användare - klickar runt för att se vad som finns

module.exports = { curiousUser };

async function curiousUser(page) {
  await page.goto('http://localhost:4000/kategori/frukt-och-gront');
  await page.locator('div').filter({ hasText: /^Mejeri, ost & ägg\+$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Ost\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Dessertost' }).click();
  await page.getByRole('link', { name: 'Färskost' }).click();
  await page.getByRole('link', { name: 'Hårdost lagrad' }).click();
  await page.getByRole('link', { name: 'Hårdost mild/mellan' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('name-desc');
  await page.locator('div').filter({ hasText: /^Skafferi\+$/ }).getByRole('button').click();
  await page.getByRole('link', { name: 'Konserver & burkar' }).click();
  await page.getByRole('link', { name: 'Texmex' }).click();
  await page.getByRole('link', { name: 'Kryddmix' }).click();
  await page.getByLabel('Sortera:PopulärastA – ÖÖ –').selectOption('name-asc');
};