import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// 1. Define the types for your custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
};

// 2. Extend the base test to register your fixtures
export const test = baseTest.extend<MyFixtures>({
    
    // Define 'loginPage' fixture logic
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        // Pass the initialized page object to the test script
        await use(loginPage);
    },

    // Define 'inventory' fixture logic
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    
    // Define 'checkout' fixture logic
    checkoutPage: async ({ page }, use) => {
        const productsPage = new CheckoutPage(page);
        await use(productsPage);
    }
});

export { expect } from '@playwright/test';