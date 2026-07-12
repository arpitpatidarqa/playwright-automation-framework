import test, { expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { registrationData } from "../test-data/registrationData";

test.describe('Registration', () => {

    test.beforeEach(async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openURL();
    })

    registrationData.forEach((data) => {
        test(`${data.testName}`, async ({ page }) => {
            const registrationPage = new RegistrationPage(page);
            await registrationPage.clickSignUp();
            await registrationPage.submitRegistrationForm(data.firstName, data.firstName, data.email, data.password);
            await expect(page.locator('#customer_logout_link')).toBeVisible();
        });
    })

})