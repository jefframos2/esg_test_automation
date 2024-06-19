export class MentalHealthAwarenessDataCollectionForm {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Scope
    this.location = page.locator('[id="mental_health_awareness\\.location"]');

    // Reporting Period From
    this.reportingDateFrom = page.locator(
      '[id="mental_health_awareness\\.reporting_date_from-visible"]'
    );

    // Reporting Period To
    this.reportingDateTo = page.locator(
      '[id="mental_health_awareness\\.reporting_date_to-visible"]'
    );

    // Number of mental health awareness program
    this.numMentalHealthProgram = page.locator(
      '[id="mental_health_awareness\\.no_mental_health_program"]'
    );

    // Number of mental health awareness activities
    this.numMentalHealthActivities = page.locator(
      '[id="mental_health_awareness\\.no_mental_health_activities"]'
    );

    // Number of participants in mental health awareness activities
    this.numParticipantsMentalHealthActivities = page.locator(
      '[id="mental_health_awareness\\.no_participants_mental_health_activities"]'
    );

    // Number of mental health professional
    this.numMentalHealthProf = page.locator(
      '[id="mental_health_awareness\\.no_mental_health_prof"]'
    );

    // Average hours of training for mental health professional
    this.avgHrsTraining = page.locator(
      '[id="mental_health_awareness\\.avg_hrs_training"]'
    );

    // Company type - Developing company
    this.companyTypeDeveloping = page.getByLabel('Developing company');

    // Company type - Operating company
    this.companyTypeOperating = page.getByLabel('Operating company');

    // Developing company with confidential counseling programs - Yes
    this.developingCounselingProgYes = page.locator(
      '[id="mental_health_awareness\\.developing_counseling_prog-0"]'
    );

    // Developing company with confidential counseling programs - No
    this.developingCounselingProgNo = page.locator(
      '[id="mental_health_awareness\\.developing_counseling_prog-1"]'
    );

    // Developing company with regular test for substance use and abuse - Yes
    this.developingRegularSubstanceTestYes = page.locator(
      '[id="mental_health_awareness\\.developing_regular_substance_test-0"]'
    );

    // Developing company with regular test for substance use and abuse - No
    this.developingRegularSubstanceTestNo = page.locator(
      '[id="mental_health_awareness\\.developing_regular_substance_test-1"]'
    );

    // Developing company with access to mental health care - Yes
    this.developingAccessMentalHealthCareYes = page.locator(
      '[id="mental_health_awareness\\.developing_access_mental_health_care-0"]'
    );

    // Developing company with access to mental health care - No
    this.developingAccessMentalHealthCareNo = page.locator(
      '[id="mental_health_awareness\\.developing_access_mental_health_care-1"]'
    );

    // Operating company with confidential counseling programs - Yes
    this.operatingCounselingProgYes = page.locator(
      '[id="mental_health_awareness\\.operating_counseling_prog-0"]'
    );

    // Operating company with confidential counseling programs - No
    this.operatingCounselingProgNo = page.locator(
      '[id="mental_health_awareness\\.operating_counseling_prog-1"]'
    );

    // Operating company with regular test for substance use and abuse - Yes
    this.operatingRegularSubstanceTestYes = page.locator(
      '[id="mental_health_awareness\\.operating_regular_substance_test-0"]'
    );

    // Operating company with regular test for substance use and abuse - No
    this.operatingRegularSubstanceTestNo = page.locator(
      '[id="mental_health_awareness\\.operating_regular_substance_test-1"]'
    );

    // Operating company with access to mental health care - Yes
    this.operatingAccessMentalHealthCareYes = page.locator(
      '[id="mental_health_awareness\\.operating_access_mental_health_care-0"]'
    );

    // Operating company with access to mental health care - No
    this.operatingAccessMentalHealthCareNo = page.locator(
      '[id="mental_health_awareness\\.operating_access_mental_health_care-1"]'
    );

    this.amendmentReason = page.getByPlaceholder(
      'Please give a reason for amendment'
    );

    // Submit button
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    // Delete button
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    // Cancel button
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Amend button
    this.amendButton = page.getByRole('button', { name: 'Amend' });
  }

  /**
   * Method for filling out the data collection form
   * @param {object} formInputs - Object containing the input values for the data collection form
   * @param {string} formInputs.location - Scope
   * @param {string} formInputs.reportingDateFrom - Reporting Period From (in DD/MM/YYYY format)
   * @param {string} formInputs.reportingDateTo - Reporting Period To (in DD/MM/YYYY format)
   * @param {string} formInputs.numMentalHealthProgram - Number of mental health awareness program
   * @param {string} formInputs.numMentalHealthActivities - Number of mental health awareness activities
   * @param {string} formInputs.numParticipantsMentalHealthActivities - Number of participants in mental health awareness activities
   * @param {string} formInputs.numMentalHealthProf - Number of mental health professional
   * @param {string} formInputs.avgHrsTraining - Average hours of training for mental health professional
   * @param {string} formInputs.companyType - Company type (Developing company or Operating company)
   * @param {string} formInputs.developingCounselingProg - Developing company with confidential counseling programs (Yes or No)
   * @param {string} formInputs.developingRegularSubstanceTest - Developing company with regular test for substance use and abuse (Yes or No)
   * @param {string} formInputs.developingAccessMentalHealthCare - Developing company with access to mental health care (Yes or No)
   * @param {string} formInputs.operatingCounselingProg - Operating company with confidential counseling programs (Yes or No)
   * @param {string} formInputs.operatingRegularSubstanceTest - Operating company with regular test for substance use and abuse (Yes or No)
   * @param {string} formInputs.operatingAccessMentalHealthCare - Operating company with access to mental health care (Yes or No)
   */
  async fillOutForm(formInputs) {
    await this.location.selectOption({ label: `${formInputs.location}` });
    await this.reportingDateFrom.fill(formInputs.reportingDateFrom);
    await this.reportingDateTo.fill(formInputs.reportingDateTo);
    await this.numMentalHealthProgram.fill(formInputs.numMentalHealthProgram);
    await this.numMentalHealthActivities.fill(
      formInputs.numMentalHealthActivities
    );
    await this.numParticipantsMentalHealthActivities.fill(
      formInputs.numParticipantsMentalHealthActivities
    );
    await this.numMentalHealthProf.fill(formInputs.numMentalHealthProf);
    await this.avgHrsTraining.fill(formInputs.avgHrsTraining);

    if (formInputs.companyType === 'Developing company') {
      await this.companyTypeDeveloping.check();

      formInputs.developingCounselingProg === 'Yes'
        ? await this.developingCounselingProgYes.check()
        : await this.developingCounselingProgNo.check();

      formInputs.developingRegularSubstanceTest === 'Yes'
        ? await this.developingRegularSubstanceTestYes.check()
        : await this.developingRegularSubstanceTestNo.check();

      formInputs.developingAccessMentalHealthCare === 'Yes'
        ? await this.developingAccessMentalHealthCareYes.check()
        : this.developingAccessMentalHealthCareNo.check();
    } else if (formInputs.companyType === 'Operating company') {
      await this.companyTypeOperating.check();

      formInputs.operatingCounselingProg === 'Yes'
        ? await this.operatingCounselingProgYes.check()
        : await this.operatingCounselingProgNo.check();

      formInputs.operatingRegularSubstanceTest === 'Yes'
        ? await this.operatingRegularSubstanceTestYes.check()
        : await this.operatingRegularSubstanceTestNo.check();

      formInputs.operatingAccessMentalHealthCare === 'Yes'
        ? await this.operatingAccessMentalHealthCareYes.check()
        : await this.operatingAccessMentalHealthCareNo.check();
    }
  }

  /**
   * Method for submitting the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Method for providing Amendment Reason when updating data
   * @param {string} reason
   */
  async provideAmendmentReason(reason) {
    await this.amendmentReason.fill(reason);
  }

  /**
   * Method for amending data
   */
  async amendData() {
    await this.amendButton.click();
  }

  /**
   * Method for deleting
   */
  async deleteData() {
    await this.deleteButton.click();
  }
}
