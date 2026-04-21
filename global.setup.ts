import { request, type FullConfig } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/storageState.json';

async function globalSetup(config: FullConfig) {
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    const baseURL = process.env.BASE_URL ?? config.projects[0].use.baseURL;

    if (!email || !password) {
        throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
    }
      
    if (!baseURL || typeof baseURL !== 'string') {
        throw new Error('BASE_URL is not defined');
    }

    const requestContext = await request.newContext({ baseURL });

    const response = await requestContext.post('/users/login', { data: { email, password }, })

    if (!response.ok()) {
        throw new Error(
            `API login failed: ${response.status()} ${response.statusText()}`
        );
    }

    await requestContext.storageState({path: authFile});

    await requestContext.dispose();

}

export default globalSetup;