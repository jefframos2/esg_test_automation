export class Header {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.homeTab = page.getByRole('link', { name: 'Home' });
    this.dataCollectionTab = page.getByRole('link', {
      name: 'Data Collection',
    });
    this.disclosuresTab = page.getByRole('link', {
      name: 'Disclosures',
    });
    this.reportsTab = page.getByRole('link', {
      name: 'Reports',
    });
    this.goalsTab = page.getByRole('link', { name: 'Goals' });
    this.tasksTab = page.getByRole('link', { name: 'Tasks' });
    this.adminTab = page.getByRole('link', { name: 'Admin' });
  }

  /**
   * Method to go to Home page
   */
  async goToHomePage() {
    await this.homeTab.click();
  }

  /**
   * Method to go to Data Collection page
   */
  async goToDataCollectionPage() {
    await this.dataCollectionTab.click();
  }

  /**
   * Method to go to Disclosures page
   */
  async goToDisclosuresPage() {
    await this.disclosuresTab.click();
  }

  /**
   * Method to go to Reports page
   */
  async goToReportsPage() {
    await this.reportsTab.click();
  }

  /**
   * Method to go to Goals page
   */
  async goToGoalsPage() {
    await this.goalsTab.click();
  }

  /**
   * Method to go to Tasks page
   */
  async goToTasksPage() {
    await this.tasksTab.click();
  }

  /**
   * Method to go to Admin page
   */
  async goToAdminPage() {
    await this.adminTab.click();
  }
}
