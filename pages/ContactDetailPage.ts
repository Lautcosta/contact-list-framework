import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ContactDetailPage extends BasePage {

    readonly editContactButton: Locator;
    readonly deleteContactButton: Locator;
    readonly returnContactListButton: Locator;

    constructor (page: Page) {
        super(page);

        this.editContactButton = page.getByRole('button', {name: 'Edit Contact'});
        this.deleteContactButton = page.getByRole('button', {name: 'Delete Contact'});
        this.returnContactListButton = page.getByRole('button', {name: 'Return to Contact List'})
    
    }

    async clickEditContact() { 
        await this.editContactButton.click(); 
    }

    async clickDeleteContact() {
        await this.deleteContactButton.click();
    }

}