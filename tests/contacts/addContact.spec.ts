import { test, expect } from "../../fixtures/contactPages";
import contact from "../../data/contact";


test.describe('Contacts', () => {
    test('should add a new contact successfully', async ({ page, contactListPage, contactFormPage }) => {

        await contactListPage.navigate()
        await expect(page).toHaveURL(/\/contactList$/)

        await contactListPage.addNewContact()
        await expect(page).toHaveURL(/\/addContact$/)

        await contactFormPage.fillContactForm(contact)
        await contactFormPage.submitContact()

        await expect(page).toHaveURL(/\/contactList$/)
        await expect(contactListPage.getContactByEmail(contact.email)).toBeVisible();
    })
})
