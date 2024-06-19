export class Carousel {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Method to select a topic on the carousel
   * @param {string} topic - e.g. Mental Health Awareness, Preventive Health Care, Carbon Sequestration, etc.
   */
  async goToTopic(topic) {
    await this.page.getByRole('link', { name: `${topic}` }).click();
  }
}
