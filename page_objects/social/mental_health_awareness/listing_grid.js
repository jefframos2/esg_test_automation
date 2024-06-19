export class MentalHealthAwarenessListingGrid {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newDataButton = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .getByRole('button', { name: 'New Data' });
    this.importDataButton = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .getByRole('button', { name: 'Import Data' });
    this.tableBody = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('table.sorted-table > tbody');
    this.lastRow = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('table.sorted-table > tbody > tr:last-child');
    this.lastRowLink = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator(
        'table.sorted-table > tbody > tr:last-child > td:first-child > a'
      );
  }

  /**
   * Method to click New Data button
   */
  async clickNewData() {
    await this.newDataButton.click();
  }

  /**
   * Method to click Import Data button
   */
  async clickImportData() {
    await this.importDataButton.click();
  }

  /**
   * Method to click the Reporting Period From link of the last row on the listing grid
   */
  async clickLastRowLink() {
    await this.lastRowLink.click();
  }
}
