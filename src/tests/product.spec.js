import { test } from "../tests/pages/base.ts";
import { expect } from "@playwright/test";
import { ProductPage } from "./pages/product.page.js";

test("TC-007 : Adding all available products to the cart and then removing them, verifying that the cart updates correctly", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);

  await product.allAddtoCart();
  // ตรวจว่าตัวเลขตรงกับจำนวนสินค้าที่เพิ่ม
  const count = await product.removeCartBtn.count();
  await expect(product.cartBadge).toHaveText(String(count));

  await product.gotoCart();
  await product.removeAllCart();
  // ตรวจว่าตัวเลขตรงกับจำนวนสินค้าที่เพิ่ม
  await expect(product.cartBadge).toHaveCount(0);
});

test("TC-008 : Product should correctly sorts items from A to Z ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);

  await product.sortBy("az");
  await page.waitForSelector(".inventory_item_name", {
    state: "visible",
    timeout: 3000,
  });

  const names = await product.getAllProductName();
  //   names = names.map((name) => String(name).trim());
  const sorted = [...names].sort((a, b) =>
    a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
  );

  expect(names).toEqual(sorted);
});

test("TC-009 : Product should correctly sorts items from Z to A ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);

  await product.sortBy("za");
  await page.waitForSelector(".inventory_item_name", {
    state: "visible",
    timeout: 3000,
  });

  const names = await product.getAllProductName();
  //   names = names.map((name) => String(name).trim());
  const sorted = [...names].sort((a, b) =>
    b.toLocaleLowerCase().localeCompare(a.toLocaleLowerCase())
  );

  expect(names).toEqual(sorted);
});

test("TC-010 : Product should correctly sorts items from price low to high ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);

  await product.sortBy("lohi");
  await page.waitForSelector(".inventory_item_price", {
    state: "visible",
    timeout: 3000,
  });

  const priceProduct = await product.getAllProductPrices();
  const sorted = [...priceProduct].sort((a, b) => a - b);

  expect(priceProduct).toEqual(sorted);
});

test("TC-011 : Product should correctly sorts items from price high to low ", async ({
  loginPageFixtures,
  page,
}) => {
  const product = new ProductPage(page);

  await product.sortBy("hilo");
  await page.waitForSelector(".inventory_item_price", {
    state: "visible",
    timeout: 3000,
  });

  const priceProduct = await product.getAllProductPrices();
  const sorted = [...priceProduct].sort((a, b) => b - a);

  expect(priceProduct).toEqual(sorted);
});

test('TC-012 : Should navigate to the cart page when clicking the cart icon',async ({
    loginPageFixtures,page
})=>{
    const product = new ProductPage(page);
    
    await product.gotoCart();
    await expect(page).toHaveURL(/cart\.html/);
})
