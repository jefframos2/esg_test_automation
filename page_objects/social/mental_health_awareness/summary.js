export class MentalHealthAwarenessSummary {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
  }

  /**
   * Method to click Cancel button
   */
  async clickCancelButton() {
    await this.cancelButton.click();
  }

  /**
   * Method to click Edit button
   */
  async clickEditButton() {
    await this.editButton.click();
  }
}
