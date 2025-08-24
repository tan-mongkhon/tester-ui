import { LoginPage } from "./login.page";
import { test as base, expect } from "@playwright/test";
import { ProductPage } from "./product.page";
import { CartPage } from "./cart.page";
import { CheckoutPage } from "./checkout.page";

export const test = base.extend<{
  webApp: {
    login: LoginPage;
    product: ProductPage;
    checkout: CheckoutPage;
    cart: CartPage;
    target: string[];
  };
}>({
  webApp: async ({ page }, use) => {
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    const checkout = new CheckoutPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/.*inventory\.html/);

    const target = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
    await product.addProductByName(target);
    await product.goToCart();
    await expect(product.cartBadge).toHaveText("2");

    await checkout.gotoCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await checkout.fillFulldata("Emily", "Harrison", "90210");
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // expose objects และ test data ออกไป
    await use({ login, product, checkout, cart, target });
  },
});

export { expect } from '@playwright/test';
