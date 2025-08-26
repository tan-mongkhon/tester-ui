export class ProductPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.addToCartBtn = page.locator('[data-test^="add-to-cart"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.removeCartBtn = page.locator('[data-test^="remove"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
  }
  //Add by Name of Product 
  async addProductToCart() {
    const items = this.productItems;
    const count = await items.count();
    const selected = [];

    for (let i = 0; i < Math.min(2, count); i++) {
      const item = items.nth(i);

      const name = await item.locator(".inventory_item_name").textContent();
      const price = await item.locator(".inventory_item_price").textContent();

      await item.locator('button:has-text("Add to cart")').click();

      selected.push({ name, price });
    }

    return selected;
  }

  async allAddtoCart() {
    // กดจนกว่าจะไม่เหลือปุ่ม Add to cart
    while ((await this.addToCartBtn.count()) > 0) {
      await this.addToCartBtn.first().click();
    }
  }

  async gotoCart() {
    await this.cartIcon.click();
  }

  async removeAllCart() {
    // กดจนกว่าจะไม่เหลือปุ่ม Add to cart
    while ((await this.removeCartBtn.count()) > 0) {
      await this.removeCartBtn.first().click();
    }
  }

  async sortBy(option) {
    await this.sortDropdown.waitFor({ state: "visible" });
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductName() {
    return await this.productNames.allTextContents();
  }

  async getAllProductPrices() {
    const itemPrices = await this.productPrices.allTextContents();

    // text -> float
    return itemPrices.map((price) => parseFloat(price.replace("$", "")));
  }
}
