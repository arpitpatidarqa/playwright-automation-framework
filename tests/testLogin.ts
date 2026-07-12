import { test, expect } from "@playwright/test";
import { TestLoginPage } from "../pages/TestLoginPage";
import { testLoginData } from "../test-data/testLoginData";


    // async function login(page: Page, username: string, password: string) {
    //     await page.getByRole('textbox', { name: 'username' }).fill(username);
    //     await page.locator('#password').fill(password);
    //     await page.getByRole('button', { name: 'Login' }).click();
    // }

test.describe('Authentication Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/");
        await expect(page).toHaveTitle('The Internet')

        await page.getByRole('link', { name: 'Form Authentication' }).click();
        await expect(page.getByText('Login Page')).toBeVisible();
    });

    testLoginData.forEach((data) => {
        test(`Logins -${data.testName}`, async ({ page }) => {
            const testLoginPage = new TestLoginPage(page);
            await testLoginPage.submitLoginForm(data.username, data.password);

            if (data.expected == 'Success') {
                await expect(page.getByRole('heading', { name: data.successMessage })).toBeVisible();

                await testLoginPage.clickLogout();

                await expect(page).toHaveURL(/\/login/);
                await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
            }

            else if (data.expected == 'Failure') {
                await expect(page.locator('#flash')).toContainText(/invalid!/i)

            }
        });
    })

    // test('Valid Logins', async ({ page }) => {
    //     const loginPage = new LoginPage(page);
    //     await login(page, 'tomsmith', 'SuperSecretPassword!');

    //     await expect(page.getByRole('heading', { name: 'Welcome to the Secure Area' })).toBeVisible();

    //     await page.getByRole('link', { name: 'Logout' }).click();

    //     await expect(page).toHaveURL(/\/login/);
    //     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    // });

    // test('Invalid Login', async ({ page }) => {
    //     await login(page, 'tomsmith', 'Wrong');

    //     let element = page.locator('#flash');
    //     let fullText = await element.textContent();
    //     console.log(fullText);

    //     await expect(page.locator('#flash')).toContainText(/invalid!/i);
    // });

});