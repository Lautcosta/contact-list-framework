import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe('Login', () => {

    let loginPage : LoginPage;
    const email = process.env.USER_EMAIL
    const password = process.env.USER_PASSWORD
    const invalidPassword = 'fakepassword'

    test.beforeEach( async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate()
    })

    test('should login successfully with valid credentials', async ({page}) => {

        if (!email || !password) {
            throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
        }

        await loginPage.login(email, password)
        await expect(page).toHaveURL(/\/contactList$/)
        
    })

    test('should show error with invalid credentials', async ({page}) => {

        if (!email) {
            throw new Error('Missing USER_EMAIL')
        }

        await loginPage.login(email, invalidPassword)
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(page).not.toHaveURL(/\/contactList$/);

    })


})