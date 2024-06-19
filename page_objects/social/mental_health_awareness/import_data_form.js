import { join } from 'path';

export class MentalHealthAwarenessImportDataForm {
  /**
   *
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('input[name="esg.file"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Method to upload file
   * @param {string} filename
   */
  async uploadFile(filename) {
    await this.fileInput.setInputFiles(
      join(__dirname, `../../../import_files/${filename}`)
    );
  }

  /**
   * Method to submit form
   */
  async submitForm() {
    await this.submitButton.click();
  }
}
