import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    private readonly addToCartButtons: Locator;
    private readonly productName: Locator;
    private readonly cartCount: Locator;
    private readonly cartButton: Locator;
    private readonly cartItem: Locator;
    private readonly itemPrice: Locator;
    private readonly checkoutButton: Locator;
    private readonly sortingDropdown: Locator;
    private readonly removeButton: Locator;
    //private readonly dynamicAddToCartButton: Locator;

    constructor(page: Page) {
        this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });;
        this.productName = page.locator('.inventory_item_name');
        this.cartCount = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
        this.cartItem = page.locator('.inventory_item_name');
        this.itemPrice = page.locator('.inventory_item_price');
        this.checkoutButton = page.locator('#checkout');
        this.sortingDropdown = page.locator('.product_sort_container');
        this.removeButton = page.getByRole('button', { name: 'Remove' })
    }

    get productsName() {
        return this.productName;
    }

    get cartsCount() {
        return this.cartCount;
    }

    get cartItems() {
        return this.cartItem;
    }

    get cartItemPrice() {
        return this.itemPrice;
    }

    async getProductCount(): Promise<number> {
        return await this.cartItem.count();
    }

    async addProductToCart() {
        await this.addToCartButtons.last().click();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async getItemPrice() {
        let itemPriceText = await this.itemPrice.first().textContent();
        return itemPriceText ? itemPriceText.trim() : '';
    }

    async clickCheckOut() {
        await this.checkoutButton.click();
    }

    async sorting() {
        await this.sortingDropdown.selectOption({ index: 1 });
    }

    async removeProductFromCart() {
        await this.removeButton.click();
    }

    async getAllProductsName(): Promise<string[]> {
        return await this.productName.allTextContents();
    }

    async addAllProductsToCart(): Promise<void> {
        await this.addToCartButtons.first().waitFor({ state: 'visible', timeout: 5000 });
        const buttons = await this.addToCartButtons.all();
        await this.addToCartButtons.first().waitFor({ state: 'visible', timeout: 5000 });

        while (await this.addToCartButtons.first().isVisible()) {
            await this.addToCartButtons.first().click();
        }
    }

    async calculateAllProductsPriceSum(): Promise<number> {
        const priceStrings = await this.itemPrice.allTextContents();

        let total = 0;

        for (let priceText of priceStrings) {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            total = total + price;
        }

        return total;
    }

}