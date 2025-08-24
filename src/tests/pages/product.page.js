export class ProductPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNameLocator = page.locator('[data-test="inventory-item-name"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.productPriceLocator = page.locator('[data-test="inventory-item-price"]');
  }
  // wait dropdown visible and then choose option like ('az' , 'za' , 'hilo' , 'lohi')
  async sortBy(option) {
    await this.sortDropdown.waitFor({ state: "visible" });
    await this.sortDropdown.selectOption(option);
  }
  //คืนชื่อสินค้าทั้งหมดเป็น Array ของ String
  async getAllproductNames() {
    return await this.productNameLocator.allTextContents();
  }

  //ดึงราคาสินค้าทั้งหมดเป็น float
  async getAllproductPrices() {
   const priceText = await this.productPriceLocator.allTextContents();
   // แปลงค่าจาก text => float (ตัวเลข)
   return priceText.map(price => parseFloat(price.replace('$',''))); 
  }

  // เพิ่มสินค้าตามชื่อ
  async addProductByName(productNames) {
    for (const name of productNames) {
      const itemsProduct = this.productItems.filter({
      hasText: name
      });
      await itemsProduct.locator('button:has-text("Add to cart")').click();

    }
  }


  //อ่านค่า badge (ถ้าไม่ขึ้นคืน 0)
  async getCartBadgeCount() {
    const count = await this.cartBadge.count();
    if (count === 0) return 0;
    const txt = (await this.cartBadge.TextContents())?.trim() ?? "0";
    return parseInt(txt, 10) || 0;
  }

  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForURL("**/cart.html");
  }
}
