import { Locator, Page } from "@playwright/test"

export class RegistrationPage{
    private readonly page: Page;
    private readonly signUpLink: Locator;
    private readonly createAccountHeading: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly createButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.createAccountHeading = page.locator('h1.accounts-title');
        this.firstNameField = page.locator('input[name="customer[first_name]"]');
        this.lastNameField = page.locator('input[name="customer[last_name]"]');
        this.emailField = page.locator('input[name="customer[email]"]');
        this.passwordField = page.locator('input[name="customer[password]"]');
        this.createButton = page.getByRole('button', {name: 'Create'});
    }

    async openURL(){
        await this.page.goto('https://sauce-demo.myshopify.com/');
    }

    async clickSignUp(){
        await this.signUpLink.click();
    }

    async submitRegistrationForm(fName: string, lName: string, email:string, password: string): Promise<void>{
        await this.firstNameField.fill(fName);
        await this.lastNameField.fill(lName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.createButton.click();
    }


}