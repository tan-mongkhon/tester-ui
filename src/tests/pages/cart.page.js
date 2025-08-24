export class CartPage {
  /**
   *
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartItems = page.locator(
      '[data-test="cart-list"] [data-test="item-quantity"]'
    );
    this.cartItemName = page.locator(
      '[data-test="cart-list"] [data-test="inventory-item-name"]'
    );
    this.cartItemPrice = page.locator(
      '[data-test="cart-list"] [data-test="inventory-item-price"]'
    );
  }

  async getCartName() {
    return await this.cartItemName.allInnerTexts();
  }

  async getCartItemPrice(){
    return await this.cartItemPrice.allInnerTexts();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async getBadgeCount() {
    return Number(await this.cartBadge.innerText());
  }

  async getCartItemsNames() {
    return await this.page
      .locator('[data-test="inventory-item"] [data-test="inventory-item-name"]')
      .allTextContents();
  }

  async removeItemByName(name) {
    const row = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: name,
      }),
    });
    await row.locator('button:has-text("Remove")').click();
  }
}
