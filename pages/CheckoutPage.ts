import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    private readonly firstNameField: Locator;
    private readonly lastnameField: Locator;
    private readonly zipField: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly errorCheckoutMessage: Locator;

    constructor(page: Page){
        this.firstNameField = page.locator('#first-name');
        this.lastnameField = page.locator('#last-name');
        this.zipField = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', {name: ' Continue'});
        this.finishButton = page.locator('#finish');
        this.successMessage = page.getByRole('heading', {name:'Thank you for your order!'});
        this.errorCheckoutMessage = page.locator('.error-message-container.error');
    }

    async fillDetails(fname: string, lname: string, zip: string){
        await this.firstNameField.fill(fname);
        await this.lastnameField.fill(lname);
        await this.zipField.fill(zip);
        await this.continueButton.click();
    }

    async clickFinishButton(){
        await this.finishButton.click();
    }

    

}