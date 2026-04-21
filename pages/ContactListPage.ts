import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ContactListPage extends BasePage {

    readonly addNewContactButton: Locator;

    constructor (page: Page) {
        super(page);

        this.addNewContactButton = page.getByRole('button', {name: 'Add a New Contact'});
    }

    async navigate() {
        await this.page.goto('/contactList');
    }

    async addNewContact() {
        await this.addNewContactButton.click();
    }

    getContactByEmail(email: string): Locator {
        return this.page.locator('table').getByText(email, { exact: true }).first();
    }

    async openContactByEmail(email: string) {
        await this.getContactByEmail(email).click();
    }

}