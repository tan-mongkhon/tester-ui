import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ProductPage } from "./pages/product.page";
import { CartPage } from './pages/cart.page'
import { CheckoutPage } from "./pages/checkout.page";
test('When clicking "Cancel", should navigate back to the cart page', async ({
  page,
}) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  // const cart = new CartPage(page);

  await login.goto();
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory\.html/);

  const target = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  await product.addProductByName(target);
  await product.goToCart();
  await expect(product.cartBadge).toHaveText("2");

  await checkout.gotoCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkout.cancelCheckout();
  await expect(page).toHaveURL(/.*cart\.html/);
});

test('When clicking "Continue" without any client information, should display an error message', async ({page}) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  // const cart = new CartPage(page);

  await login.goto();
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory\.html/);

  const target = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  await product.addProductByName(target);
  await product.goToCart();
  await expect(product.cartBadge).toHaveText("2");

  await checkout.gotoCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkout.gotoContinue();
  await expect(checkout.errorMessage).toHaveText(
    "Error: First Name is required"
  );
});

test('When clicking "Continue" with some client information, should display an error message', async ({page}) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  // const cart = new CartPage(page);

  await login.goto();
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory\.html/);

  const target = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  await product.addProductByName(target);
  await product.goToCart();
  await expect(product.cartBadge).toHaveText("2");

  await checkout.gotoCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkout.fillName("Emily","Harrison");
  await expect(checkout.errorMessage).toHaveText("Error: Postal Code is required");
});

test('When clicking "Continue" with all client information, should proceed to the checkout overview page', async ({page}) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  // const cart = new CartPage(page);

  await login.goto();
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory\.html/);

  const target = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
  await product.addProductByName(target);
  await product.goToCart();
  await expect(product.cartBadge).toHaveText("2");

  await checkout.gotoCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkout.fillFulldata("Emily","Harrison","90210");
  await expect(page).toHaveURL(/.*checkout-step-two\.html/);
});

test('The cart badge should displays the correct number of items currently in the cart', async ({page}) => {
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

  await checkout.fillFulldata("Emily","Harrison","90210");
  await expect(page).toHaveURL(/.*checkout-step-two\.html/);

  const itemsCount = await cart.getItemCount();
  const badgeCount = await cart.getBadgeCount();
  expect(badgeCount).toBe(itemsCount);

});

test.only('TC-023 The item name and price in the cart should match the selection from the product page',async({page})=>{
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
  const expectedName = await cart.getCartItemsNames(target);
  const expectedPrice = await cart.getCartItemPrice(target);

  await checkout.gotoCheckout();
  await expect(page).toHaveURL(/.*checkout-step-one\.html/);

  await checkout.fillFulldata("Emily","Harrison","90210");
  await expect(page).toHaveURL(/.*checkout-step-two\.html/);   
  
  const actualName = await cart.getCartName(target);
  const actualPrice = await cart.getCartItemPrice(target);

  expect(actualName).toStrictEqual(expectedName);
  expect(actualPrice).toStrictEqual(expectedPrice);
})
