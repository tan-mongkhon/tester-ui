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
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemTotalLabel = page.locator(".summary_subtotal_label"); // Item total
    this.taxLabel = page.locator(".summary_tax_label"); // Tax
    this.totalLabel = page.locator(".summary_total_label"); // Total
    this.finishBtn = page.locator('[data-test="finish"]');
    this.textComplete = page.locator('[data-test="complete-header"]');
    this.backhomeBtn = page.locator('[data-test="back-to-products"]');
  }
  // ดึงค่า Item Total
  async getItemTotal() {
    const text = await this.itemTotalLabel.innerText(); // "Item total: $129.94"
    return parseFloat(text.replace("Item total: $", ""));
  }

  // ดึงค่า Tax
  async getTaxValue() {
    const text = await this.taxLabel.innerText(); // "Tax: $10.40"
    return parseFloat(text.replace("Tax: $", ""));
  }

  // ดึงค่า Total (รวม Tax)
  async getTotalValue() {
    const text = await this.totalLabel.innerText(); // "Total: $140.34"
    return parseFloat(text.replace("Total: $", ""));
  }

  // ตรวจสอบ Tax ถูกต้อง (8% ของ Item Total)
  async verifyTax() {
    const itemTotal = await this.getItemTotal();
    const tax = await this.getTaxValue();
    const expectedTax = parseFloat((itemTotal * 0.08).toFixed(2));
    if (tax !== expectedTax) {
      throw new Error(`Tax mismatch! Expected: ${expectedTax}, Actual: ${tax}`);
    }
  }

  // ตรวจสอบ Total ถูกต้อง (Item Total + Tax)
  async verifyTotal() {
    const itemTotal = await this.getItemTotal();
    const tax = await this.getTaxValue();
    const total = await this.getTotalValue();
    const expectedTotal = parseFloat((itemTotal + tax).toFixed(2));
    if (total !== expectedTotal) {
      throw new Error(
        `Total mismatch! Expected: ${expectedTotal}, Actual: ${total}`
      );
    }
  }

  async inputDataName(firstname, lastname, code) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postalCode.fill(code);
  }

  async cancelCheckout() {
    await this.cancelBtn.click();
  }

  async continueCheckout() {
    await this.continueBtn.click();
  }

  async getErrorText() {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent())?.trim() ?? "";
    }
  }

  async finishShop() {
    await this.finishBtn.click();
  }

  async showTextComplete () {
    await this.textComplete.isVisible();
  }

  async gotoBackhome () {
    await this.backhomeBtn.click();
  }
}
