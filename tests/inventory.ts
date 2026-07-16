import { test, expect } from "../fixtures/custom-fixtures";
import { loginData } from "../test-data/loginData";
import { inventoryData } from "../test-data/inventoryData";
import { checkoutData } from "../test-data/checkoutData";

test.describe('Inventory actions', () => {

    test.beforeEach(async ({ loginPage }) => {
        loginPage.openURL();
        loginPage.submitLoginForm(loginData[0].username, loginData[0].password);
    });

    test('@smoke @regression Add items and checkout', async ({ inventoryPage, checkoutPage }) => {

        let price = await inventoryPage.getItemPrice();

        expect(await inventoryPage.getProductCount()).toBe(inventoryData[0].totalProductsCount);
        await inventoryPage.sorting();
        await expect(inventoryPage.cartItems.last()).toContainText(inventoryData[0].itemName);
        await inventoryPage.addProductToCart();

        await expect(inventoryPage.productsName.last()).toContainText(inventoryData[0].itemName);
        await expect(inventoryPage.cartsCount).toContainText(inventoryData[0].itemCount);

        await inventoryPage.openCart();

        await expect(inventoryPage.cartItems.first()).toContainText(inventoryData[0].itemName);
        await expect(inventoryPage.cartItemPrice.first()).toContainText(price);

        await inventoryPage.clickCheckOut();

        await checkoutPage.fillDetails(checkoutData[0].fname, checkoutData[0].lname, checkoutData[0].zip);

        await expect(inventoryPage.cartItems.first()).toContainText(inventoryData[0].itemName);
        await expect(inventoryPage.cartItemPrice.first()).toContainText(price);

        await checkoutPage.clickFinishButton();

        await expect(checkoutPage.successMessage).toBeVisible();
    });

    test('@regression Remove item and check cart', async ({ inventoryPage }) => {
        await inventoryPage.addProductToCart();
        await inventoryPage.removeProductFromCart();
        await expect(inventoryPage.cartsCount).not.toBeVisible();
    });

    test('@regression Negative case - Checkout without name', async ({ inventoryPage, checkoutPage }) => {
        await inventoryPage.addProductToCart();
        await inventoryPage.openCart();
        await inventoryPage.clickCheckOut();
        await checkoutPage.fillDetails('', checkoutData[0].lname, checkoutData[0].zip);

        expect(checkoutPage.errorCheckoutMessage).toBeVisible();
    });

    test('@regression Validate all items and total', async ({ inventoryPage }) => {
        await inventoryPage.addAllProductsToCart();
        const itemNames = await inventoryPage.getAllProductsName();
        const itemTotal = await inventoryPage.calculateAllProductsPriceSum();

        await inventoryPage.openCart();
        const cartItemsNames = await inventoryPage.getAllProductsName();
        const cartItemsTotal = await inventoryPage.calculateAllProductsPriceSum();

        expect(itemNames).toEqual(cartItemsNames);
        expect(itemTotal).toEqual(cartItemsTotal);
    })

});