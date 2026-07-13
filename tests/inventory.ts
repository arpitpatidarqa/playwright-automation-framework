import {test, expect } from "../fixtures/custom-fixtures";
import { loginData } from "../test-data/loginData";
import { inventoryData } from "../test-data/inventoryData";
import { checkoutData } from "../test-data/checkoutData";

test.describe('Inventory actions', () => {

    test.beforeEach(async ({ loginPage }) => {
        loginPage.openURL();
        loginPage.submitLoginForm(loginData[0].username,loginData[0].password);
});

test('Add items and checkout', async ({ inventoryPage, checkoutPage }) => {

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
    console.log(await inventoryPage.cartItemPrice.first().textContent(), price);
    await expect(inventoryPage.cartItemPrice.first()).toContainText(price);

    await checkoutPage.clickFinishButton();

    await expect(checkoutPage.successMessage).toBeVisible();
    
});

test('Remove item and check cart', async({inventoryPage}) => {
     await inventoryPage.addProductToCart();
      await inventoryPage.removeProductFromCart();
     await expect(inventoryPage.cartsCount).not.toBeVisible();
})

test('Negative case - Checkout without name', async ({inventoryPage, checkoutPage}) => {
    await inventoryPage.addProductToCart();
    await inventoryPage.openCart();
    await inventoryPage.clickCheckOut();
    await checkoutPage.fillDetails('', checkoutData[0].lname, checkoutData[0].zip);
    
    expect(checkoutPage.errorCheckoutMessage).toBeVisible();
})

});