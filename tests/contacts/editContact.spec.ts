import { test, expect } from "../../fixtures/contactPages";
import contact from "../../data/contact";


test.describe('Contacts', () => {
    test('should create a contact and edit phone and city successfully', async ({
        page,
        contactListPage,
        contactFormPage,
        contactDetailPage,
        contactEditPage,
    }) => {

        await contactListPage.navigate();
        await contactListPage.addNewContact();
        await contactFormPage.fillContactForm(contact);
        await contactFormPage.submitContact();
        await expect(page).toHaveURL(/\/contactList$/);

        await contactListPage.openContactByEmail(contact.email);

        await expect(contactDetailPage.editContactButton).toBeVisible();
        await expect(contactDetailPage.deleteContactButton).toBeVisible();
        await expect(contactDetailPage.returnContactListButton).toBeVisible();

        await contactDetailPage.clickEditContact()
        await expect(page).toHaveURL(/\/editContact$/)

        const newPhone = '3624655892';
        const newCity = 'Rio';

        await contactEditPage.fillRequiredFieldsAndSubmit(
            newPhone,
            newCity,
            contact.firstName,
            contact.lastName,
        );

        await expect(contactDetailPage.editContactButton).toBeVisible({ timeout: 15_000 });
        await expect(contactDetailPage.deleteContactButton).toBeVisible();
        await expect(contactDetailPage.returnContactListButton).toBeVisible();

        await expect(page.getByText(newPhone)).toBeVisible();
        await expect(page.getByText(newCity , { exact: true })).toBeVisible();
    })
})
