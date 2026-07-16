import {test, expect } from "../fixtures/custom-fixtures";
import { loginData } from "../test-data/loginData";


test.describe('Authentication', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.openURL();
    })

    loginData.forEach((data) => {
        if (`${data.expected}` == 'success')
            test(`@smoke @regression ${data.testName}`, async ({ loginPage }) => {
                await loginPage.submitLoginForm(`${data.username}`, `${data.password}`);
                await expect(loginPage.productsHeading).toBeVisible();

                await loginPage.logout();
                await expect(loginPage.loginErrorMessage.loginButton).toBeVisible();
            })

        else if (`@regression ${data.expected}` == 'failure') {
            test(`${data.testName}`, async ({ loginPage }) => {
                await loginPage.submitLoginForm(`${data.username}`, `${data.password}`);
                await expect(loginPage.loginErrorMessage.loginError).toBeVisible();
            })
        }
    })
})