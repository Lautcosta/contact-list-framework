import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

type ContactData = {
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    phone: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export class ContactFormPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly streetAddress1Input: Locator;
    readonly streetAddress2Input: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly postalCodeInput: Locator;
    readonly countryInput: Locator;   
    readonly submitButton: Locator;

    constructor (page: Page) {
        super(page);

        // Scope to the Add Contact screen so hidden duplicate inputs from other routes are not targeted.
        const addRoot = page.getByRole('heading', { name: 'Add Contact' }).locator('..').locator('..');

        this.firstNameInput = addRoot.getByPlaceholder('First Name');
        this.lastNameInput = addRoot.getByPlaceholder('Last Name');
        this.dateOfBirthInput = addRoot.getByPlaceholder('yyyy-MM-dd');
        this.emailInput = addRoot.getByPlaceholder('example@email.com');
        this.phoneInput = addRoot.getByPlaceholder('8005551234');
        this.streetAddress1Input = addRoot.getByPlaceholder('Address 1');
        this.streetAddress2Input = addRoot.getByPlaceholder('Address 2');
        this.cityInput = addRoot.getByPlaceholder('City');
        this.stateInput = addRoot.getByPlaceholder('State or Province');
        this.postalCodeInput = addRoot.getByPlaceholder('Postal Code');
        this.countryInput = addRoot.getByPlaceholder('Country');
        this.submitButton = addRoot.getByRole('button', { name: 'Submit' });
    }

    async fillContactForm(contact: ContactData) {
        await this.firstNameInput.fill(contact.firstName);
        await this.lastNameInput.fill(contact.lastName);
        await this.dateOfBirthInput.fill(contact.birthdate);
        await this.emailInput.fill(contact.email);
        await this.phoneInput.fill(contact.phone);
        await this.streetAddress1Input.fill(contact.street1);
        await this.streetAddress2Input.fill(contact.street2);
        await this.cityInput.fill(contact.city);
        await this.stateInput.fill(contact.state);
        await this.postalCodeInput.fill(contact.postalCode);
        await this.countryInput.fill(contact.country);
    }

    async submitContact() {
        await this.submitButton.click();
    }
      



}

