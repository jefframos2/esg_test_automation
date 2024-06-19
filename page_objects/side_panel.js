export class SidePanel {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sidePanelButton = page.locator(
      '#side-panel-container #side-panel-convene-esg'
    );
    this.yearDropdown = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .getByRole('combobox');
    this.deselectAllStatusButton = page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .getByTitle('Deselect All')
      .nth(1);
  }

  /**
   * Method to expand or collapse the side panel filter
   */
  async expandOrCollapse() {
    await this.sidePanelButton.click();
  }

  /**
   * Method to select Year value on the side panel filter
   * @param {string} year - Fiscal Year
   */
  async selectYear(year) {
    await this.yearDropdown.selectOption({ label: `${year}` });
  }

  /**
   * Method to deselect all status on the side panel filter
   */
  async deselectAllStatus() {
    await this.deselectAllStatusButton.click();
  }
}
