import { LoginPage } from "./login.page";
import {test as base} from "@playwright/test"
import { CartPage } from "./cart.page";
import { ProductPage } from "./product.page";

export const test = base.extend<{
    loginPageFixtures:{
        login: LoginPage;
    }
    checkoutPageFixtures:{
        login: LoginPage;
        cart: CartPage;
        product: ProductPage;
        
    }
    
}>({
    loginPageFixtures: async ({page},use) =>{
        const login = new LoginPage(page);
        await login.goto();
        await login.login("standard_user", "secret_sauce");
        await use({login});
    },
    checkoutPageFixtures: async ({page},use) => {
        const login = new LoginPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);
        await login.goto();
        await login.login("standard_user", "secret_sauce");
        
        
        await product.allAddtoCart();
        await product.gotoCart();
        await cart.gotoCheckout();
        await use({login,product,cart});
        
    },
});

export { expect } from '@playwright/test';