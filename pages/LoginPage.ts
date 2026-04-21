import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page : Page) {
        super(page);

        this.emailInput = page.getByPlaceholder('Email')
        this.passwordInput = page.getByPlaceholder('Password')
        this.submitButton = page.getByRole('button', {name: 'Submit'})
        this.errorMessage = page.getByText('Incorrect username or password')
    }

    async login(email:string, password:string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async navigate() {
         await this.page.goto('/');
    }

    }