import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { loginData } from "../test-data/LoginData";


test.describe('Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openURL();
    })

    loginData.forEach((data) => {
        if (`${data.expected}` == 'success')
            test(`${data.testName}`, async ({ page }) => {
                await loginPage.submitLoginForm(`${data.username}`, `${data.password}`);
                await expect(loginPage.productsHeading).toBeVisible();

                await loginPage.logout();
                await expect(loginPage.loginErrorMessage.loginButton).toBeVisible();
            })

        else if (`${data.expected}` == 'failure') {
            test(`${data.testName}`, async ({ page }) => {
                await loginPage.submitLoginForm(`${data.username}`, `${data.password}`);
                await expect(loginPage.loginErrorMessage.loginError).toBeVisible();
            })
        }
    })
})