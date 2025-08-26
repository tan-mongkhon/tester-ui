import { test } from "../tests/pages/base.ts";
import { expect } from "@playwright/test";
import { ProductPage } from "./pages/product.page.js";
import { CartPage } from "./pages/cart.page.js";

test("TC-013 : The cart badge should displays the correct number of items currently in the cart", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);
  await product.addProductToCart();
  await product.gotoCart();
  await expect(product.cartBadge).toHaveText("2");
});

test("TC-014 : The item name and price in the cart should match the selection from the product page ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);
  const selectedItem = await product.addProductToCart();
  await product.gotoCart();

  const cart = new CartPage(page);

  for (let i = 0; i < selectedItem.length; i++) {
    const nameInCart = await cart.getCartItemName(i);
    const priceInCart = await cart.getCartItemPrice(i);

    expect(nameInCart).toBe(selectedItem[i].name);
    expect(priceInCart).toBe(selectedItem[i].price);
  }
});

test("TC-015 : Should remove the selected item from the cart and update the cart badge ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);
  await product.addProductToCart();
  await product.gotoCart();

  //   const cart = new CartPage(page);

  await product.removeAllCart();
  await expect(product.productItems).toHaveCount(0);
});

test('TC-016 : When clicking "Continue Shopping", should navigates back to the product page', async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  await product.addProductToCart();
  await product.gotoCart();

  await cart.continueShopping();
  await expect(page).toHaveURL(/inventory\.html/);
});

test('TC-017 : When clicking "Checkout", should proceed to the checkout information page' , async({loginPageFixtures,page})=>{
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  await product.addProductToCart();
  await product.gotoCart();

  await cart.gotoCheckout();
  await expect(page).toHaveURL(/checkout-step-one\.html/)
})
