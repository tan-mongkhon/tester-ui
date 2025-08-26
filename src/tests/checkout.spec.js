import { test } from "../tests/pages/base.ts";
import { expect } from "@playwright/test";
import { ProductPage } from "./pages/product.page.js";
import { CartPage } from "./pages/cart.page.js";
import { CheckoutPage } from "./pages/checkout.page.js";

test('TC-018 : When clicking "Cancel", should navigate back to the cart page ', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  await checkout.cancelCheckout();
  await expect(page).toHaveURL(/cart\.html/);
});

test('TC-019 : When clicking "Continue" without any client information, should display an error message', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  await checkout.continueCheckout();
  const textError = await checkout.getErrorText();
  expect(textError).toContain("Error");
});

test('TC-020 : When clicking "Continue" with some client information, should display an error message', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  await checkout.inputDataName("Emily", "Harrison");
  await checkout.continueCheckout();
  const textError = await checkout.getErrorText();
  expect(textError).toContain("Error");
});

test('TC-021 : When clicking "Continue" with all client information, should proceed to the checkout overview page', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
});

test("TC-022 : The cart badge should displays the correct number of items currently in the cart ", async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  const items = await cart.getAllCartItems();
  const badge = await cart.getCartBadge();

  expect(Number(badge)).toBe(items.length);
});

test("TC-024 : Should correctly calculate the total, tax, and grand total", async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // ดึงค่าที่หน้าเว็บ
  const itemTotal = await checkout.getItemTotal();
  const tax = await checkout.getTaxValue();
  const total = await checkout.getTotalValue();

  console.log("Item total:", itemTotal);
  console.log("Tax:", tax);
  console.log("Total:", total);

  // ตรวจสอบ Tax และ Total ถูกต้อง
  await checkout.verifyTax();
  await checkout.verifyTotal();
});

test('TC-025 : When clicking "Cancel", should navigate back to the product page ', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  //   const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.cancelCheckout();
  expect(page).toHaveURL(/inventory\.html/);
});

test('TC-026 : When clicking "Finish", should process to the checkout complete page ', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  //   const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.finishShop();
  await expect(page).toHaveURL(/checkout-complete\.html/);
});
test("TC-027 : The cart badge number should be removed", async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.finishShop();
  await expect(page).toHaveURL(/checkout-complete\.html/);

  await expect(cart.cartBadge).toHaveCount(0);
});

test('TC-028 : Display message ', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  //   const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.finishShop();
  await expect(page).toHaveURL(/checkout-complete\.html/);

  await checkout.showTextComplete();

});

test.only('TC-029 : Display message ', async ({
  checkoutPageFixtures,
  page,
}) => {
  const checkout = new CheckoutPage(page);
  //   const cart = new CartPage(page);
  await checkout.inputDataName("Emily", "Harrison", "90210");
  await checkout.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkout.finishShop();
  await expect(page).toHaveURL(/checkout-complete\.html/);

  await checkout.gotoBackhome();
  await expect(page).toHaveURL(/inventory\.html/);

});


