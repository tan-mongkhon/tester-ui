export class CheckoutPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
  }
  async gotoCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL(/.*checkout-step-one\.html/);
  }
  async cancelCheckout() {
    await this.cancelButton.click();
    await this.page.waitForURL(/.*cart\.html/);
  }

  async gotoContinue() {
    await this.continueButton.click();
  }

  async fillName(firstname,lastname) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.continueButton.click();
  }

  async fillFulldata(firstname,lastname,code) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postalCode.fill(code);
    await this.continueButton.click();
  }

}
