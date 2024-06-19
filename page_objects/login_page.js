export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByLabel('Username');
    this.passwordField = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Method to go to the login page
   * @param {string} loginUrl - Base URL of the enironment
   */
  async goto(loginUrl) {
    await this.page.goto(loginUrl);
  }

  /**
   * Method to login a user
   * @param {string} username - Username of the user
   * @param {string} password - Password of the user
   */
  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
