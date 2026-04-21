import { test, expect } from "../../fixtures/contactPages";
import contact from "../../data/contact";

test.describe("Contacts", () => {
    test("should delete an existing contact successfully", async ({
        page,
        contactListPage,
        contactFormPage,
        contactDetailPage,
    }) => {

        await contactListPage.navigate();
        await expect(page).toHaveURL(/\/contactList$/);

        await contactListPage.addNewContact();
        await expect(page).toHaveURL(/\/addContact$/);

        await contactFormPage.fillContactForm(contact);
        await contactFormPage.submitContact();
        await expect(page).toHaveURL(/\/contactList$/);
        await expect(contactListPage.getContactByEmail(contact.email)).toBeVisible();

        await contactListPage.openContactByEmail(contact.email);
        await expect(contactDetailPage.deleteContactButton).toBeVisible();

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("confirm");
            await dialog.accept();
        });

        await contactDetailPage.clickDeleteContact();
        await expect(page).toHaveURL(/\/contactList$/);
        await expect(contactListPage.getContactByEmail(contact.email)).toHaveCount(0);
    });
});
