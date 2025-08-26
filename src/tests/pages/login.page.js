export class LoginPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    if (await this.errorMessage.isVisible()){
      return (await this.errorMessage.textContent())?.trim()?? '';
    }
  }
}
