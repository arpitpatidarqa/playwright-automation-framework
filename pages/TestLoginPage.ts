import { Locator, Page } from "@playwright/test";

export class TestLoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.getByRole('textbox', { name: 'username' });
        this.passwordField = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('link', {name: 'Logout'});
    }

    async submitLoginForm(username: string, password: string): Promise<void> {
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
 
    async clickLogout(): Promise<void> {
        await this.logoutButton.click();
    }

}