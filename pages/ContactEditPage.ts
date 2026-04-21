import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ContactEditPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly cityInput: Locator;
    readonly submitButton: Locator;

    constructor (page: Page) {
        super(page);

        const editRoot = page.getByRole('heading', { name: 'Edit Contact' }).locator('..').locator('..');

        this.firstNameInput = editRoot.getByRole('textbox', { name: 'First Name:' });
        this.lastNameInput = editRoot.getByRole('textbox', { name: 'Last Name:' });
        this.phoneInput = editRoot.getByRole('textbox', { name: 'Phone:' });
        this.cityInput = editRoot.getByRole('textbox', { name: 'City:' });
        this.submitButton = editRoot.getByRole('button', { name: 'Submit' });
    }

    async fillRequiredFieldsAndSubmit(
        phone: string,
        city: string,
        firstName: string,
        lastName: string,
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.fill(phone);
        await this.cityInput.fill(city);
        await this.submitButton.click();
    }

}
