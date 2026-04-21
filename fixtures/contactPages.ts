import { test as base } from "@playwright/test";
import { ContactListPage } from "../pages/ContactListPage";
import { ContactFormPage } from "../pages/ContactFormPage";
import { ContactDetailPage } from "../pages/ContactDetailPage";
import { ContactEditPage } from "../pages/ContactEditPage";

type ContactPages = {
  contactListPage: ContactListPage;
  contactFormPage: ContactFormPage;
  contactDetailPage: ContactDetailPage;
  contactEditPage: ContactEditPage;
};

export const test = base.extend<ContactPages>({
  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },
  contactFormPage: async ({ page }, use) => {
    await use(new ContactFormPage(page));
  },
  contactDetailPage: async ({ page }, use) => {
    await use(new ContactDetailPage(page));
  },
  contactEditPage: async ({ page }, use) => {
    await use(new ContactEditPage(page));
  },
});

export { expect } from "@playwright/test";