export class DeleteConfirmationDialog {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.okButton = page.locator('#confirm-dialog').getByText('OK');
    this.cancelButton = page.locator('#confirm-dialog').getByText('Cancel');
  }

  /**
   * Method to confirm record deletion
   */
  async confirmDeletion() {
    await this.okButton.click();
  }

  /**
   * Method to cancel record deletion
   */
  async cancelDeletion() {
    await this.cancelButton.click();
  }
}
