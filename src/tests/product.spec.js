// import { expect } from "@playwright/test";
// import { test } from "./pages/base";
// import { validUser } from "./test-data/user";

// validUser.forEach(({ username, password }) => {
//   test(`Adding all available products to the cart and then removing them, verifying that the cart updates correctly: ${username}`, async ({
//     loginPage,
//     productPage,
//     cartPage,
//   }) => {
//     // ✅ ส่ง username กับ password แยกกัน
//     await loginPage.loginValidUser(username, password);
//     await productPage.addAllProductsToCart();
//     await productPage.goToCart();
//     await cartPage.removeAllProducts();

//     const empty = await cartPage.isCartEmpty();
//     expect(empty).toBeTruthy();
//   });
// });

// validUser.forEach(({ username, password }) => {
//   test(`Should navigate to the cart page when clicking the cart icon ${username}`, async ({
//     page,
//     loginPage,
//     productPage,
//   }) => {
//     await loginPage.loginValidUser(username, password);
//     await productPage.goToCart();
//     await expect(page).toHaveURL(/.*cart\.html/)
//   });
// });


// test('Product sorting A→Z >> should sort items from A to Z for standard_user',
//   async ({ page, loginPage, productPage }) => {
  
//   // 1. ตรวจว่ามี fixture ครบ
//   if (!loginPage || !productPage) {
//     throw new Error("Missing required fixtures: loginPage or productPage");
//   }

//   // 2. ล็อกอิน
//   await loginPage.loginValidUser('standard_user', 'secret_sauce');

//   // 3. สั่งเรียง A → Z
//   await productPage.sortBy("az");

//   // 4. รอให้สินค้าบนหน้าถูกโหลด
//   await page.waitForSelector('.inventory_item_name', { state: 'visible', timeout: 5000 });

//   // 5. ตรวจว่าอยู่หน้า Products
//   const titleLocator = page.locator('.title');
//   await expect(titleLocator).toHaveText(/Products/i); // ใช้ regex กันพิมพ์ใหญ่เล็กไม่ตรง

//   // 6. ดึงชื่อสินค้าทั้งหมด
//   let names = await productPage.getAllProductNames();

//   // ป้องกัน null หรือไม่ใช่ array
//   if (!Array.isArray(names) || names.length === 0) {
//     throw new Error("Product names list is empty or invalid");
//   }

//   // 7. ตัดช่องว่าง และบังคับเป็น string ทั้งหมด
//   names = names.map(name => String(name).trim());

//   // 8. สร้างอาเรย์ใหม่ที่เรียงตาม A → Z
//   const sorted = [...names].sort((a, b) =>
//     a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
//   );

//   // 9. เปรียบเทียบว่าลำดับที่เว็บแสดงตรงกับที่เรียงไว้
//   expect(names).toEqual(sorted);
// });



