import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly productHeading: Locator;
    private readonly loginError: Locator;
    private readonly burgerButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.productHeading = page.getByText('Products');
        this.loginError = page.getByText('do not match');
        this.burgerButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.getByRole('link', {name:'Logout'});
    }

    get productsHeading() {
        return this.productHeading;
    }

    get loginErrorMessage(){
        return {
           loginError: this.loginError,
           loginButton: this.loginButton,
        }
    }

    async openURL() {
        await this.page.goto('');
    }

    async submitLoginForm(username: string, password: string) {
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async logout(){
        await this.burgerButton.click();
        await this.logoutLink.click();
    }
}