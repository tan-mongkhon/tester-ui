export class CartPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.removeCartBtn = page.locator('[data-test^="remove"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartItemNames = page.locator(' [data-test="inventory-item-name"] ')
    this.cartItemPrices = page.locator(' [data-test="inventory-item-price"]')
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async getCartBadge() {
    return await this.cartBadge.allInnerTexts();

  }

  async getAllCartItems() {
    return await this.cartItems.allInnerTexts();
  }

  async getCartItemName(index) {
    return await this.cartItemNames.nth(index).innerText();
  }

  async getCartItemPrice(index) {
    const text = await this.cartItemPrices.nth(index).innerText();
    return text
  }

  async removeAllCart() {
    const count = await this.removeCartBtn.count();

    for (let i = 0; i < count; i++) {
      await this.removeCartBtn.nth(0).click();
    }
  }

  async continueShopping () {
    await this.continueBtn.click();
  }

  async gotoCheckout() {
    await this.checkoutBtn.click();
  }
}
