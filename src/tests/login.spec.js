import { test, expect } from '@playwright/test';
import {LoginPage} from '../tests/pages/login.page'
import { ProductPage } from '../tests/pages/product.page';
import { CartPage } from '../tests/pages/cart.page';

test('Full flow: sort A→Z, add item, cart updates, remove item', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  // 1) ไปหน้า login
  await login.goto();

  // 2) ล็อกอิน (fill + click)
  await login.login('standard_user', 'secret_sauce');

  // 3) assert ว่าเข้า inventory page — ใช้ expect(...).toHaveURL ที่มี auto-wait
  await expect(page).toHaveURL(/.*inventory\.html/);

  // 4) เลือกการ sort เป็น A → Z (option value 'az')
  await product.sortBy('az');

  // 5) ดึงชื่อสินค้าจากหน้า และตรวจว่าเรียงถูกต้อง
  const names = await product.getAllproductNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);

  // 6) เพิ่ม item ตัวอย่าง
  const target = 'Sauce Labs Backpack';
  await product.addProductByName(target);

  // 7) ตรวจ badge ว่าเป็น 1 (ใช้ locator expect ที่มี auto-wait)
  await expect(product.cartBadge).toHaveText('1');

  // 8) ไปหน้า cart และตรวจชื่อในรายการ
  await product.goToCart();
  await expect(page).toHaveURL(/.*cart\.html/);
  const cartNames = await cart.getCartItemsNames();
  expect(cartNames).toContain(target);

  // 9) ลบ item แล้วตรวจ cart ว่าง (count = 0) และ badge หาย /เป็น 0
  await cart.removeItemByName(target);
  await expect(cart.cartItems).toHaveCount(0);
  expect(await product.getCartBadgeCount()).toBe(0);

});

test('Product sorting works correctly (A→Z, Z→A)', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);

  // 1) ไปหน้า login
  await login.goto();

  // 2) ล็อกอิน
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory\.html/);

  // --- Case 1: ตรวจสอบ sort A→Z ---
  await product.sortBy('az');
  const namesAZ = await product.getAllproductNames();

  // copy array แล้ว sort แบบ JS เพื่อเปรียบเทียบ
  const sortedAZ = [...namesAZ].sort((a, b) => a.localeCompare(b));
  expect(namesAZ).toEqual(sortedAZ);

  // --- Case 2: ตรวจสอบ sort Z→A ---
  await product.sortBy('za');
  const namesZA = await product.getAllproductNames();

  const sortedZA = [...namesZA].sort((a, b) => b.localeCompare(a));
  expect(namesZA).toEqual(sortedZA);
});

test('Product sorting by price works correctly (Low→High, High→Low)', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);


  await login.goto();


  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory\.html/);


  await product.sortBy('lohi');   
  const pricesLowHigh = await product.getAllproductPrices();
  const sortedLowHigh = [...pricesLowHigh].sort((a, b) => a - b);
  expect(pricesLowHigh).toEqual(sortedLowHigh);


  await product.sortBy('hilo');   
  const pricesHighLow = await product.getAllproductPrices();
  const sortedHighLow = [...pricesHighLow].sort((a, b) => b - a);
  expect(pricesHighLow).toEqual(sortedHighLow);
});


