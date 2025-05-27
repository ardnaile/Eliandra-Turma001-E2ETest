import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('The Internet - Testes', () => {
  test('Login com sucesso', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash')).toContainText(
      'You logged into a secure area!'
    );
    await expect(page).toHaveURL(/secure/);
  });

  test('Login com sucesso - AI', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    const aiArgs = { page, test };
    await ai(
      `Access the login page, enter the username "tomsmith" and password "SuperSecretPassword!, click login, and verify if a success message is displayed"`,
      aiArgs
    );
  });

  test('Login com falha', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'invalido');
    await page.fill('#password', 'invalido');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash')).toContainText(
      'Your username is invalid!'
    );
  });

  test('Login com falha - AI', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    const aiArgs = { page, test };
    await ai(
      `Access the login page, enter an invalid username and password, click login, and verify that an error message is displayed.`,
      aiArgs
    );
  });

  test('Auth com sucesso', async ({ page }) => {
    await page.goto(
      'https://admin:admin@the-internet.herokuapp.com/basic_auth'
    );
    await expect(page.locator('p')).toContainText('Congratulations!');
  });

  test('Auth sem credenciais', async ({ page }) => {
    const response = await page.goto(
      'https://the-internet.herokuapp.com/basic_auth'
    );
    expect(response?.status()).toBe(401);
  });

  test('Auth com credenciais erradas', async ({ page }) => {
    const response = await page.goto(
      'https://user:wrong@the-internet.herokuapp.com/basic_auth'
    );
    expect(response?.status()).toBe(401);
  });

  test('Input', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/inputs');
    const input = page.locator('input[type="number"]');
    await input.fill('123');
    await expect(input).toHaveValue('123');
    await input.fill('-456');
    await expect(input).toHaveValue('-456');
    await input.fill('');
    await expect(input).toHaveValue('');
  });

  test('Key Presses', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toContainText('ENTER');
    await page.keyboard.press('Shift');
    await expect(page.locator('#result')).toContainText('SHIFT');
    await page.keyboard.press('Tab');
    await expect(page.locator('#result')).toContainText('TAB');
  });

  test('Download', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('a[href$=".txt"]')
    ]);
    const path = await download.path();
    expect(path).not.toBeNull();
  });
});
