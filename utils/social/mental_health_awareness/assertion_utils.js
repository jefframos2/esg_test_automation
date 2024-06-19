/**
 * Function for checking the Summary against the input values
 * @param {object} formInputs - Object containing the values inputted to the data collection form
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
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
export const assertMentalHealthAwarenessSummary = async (
  formInputs,
  page,
  expect
) => {
  await expect(page.getByText('Summary')).toBeVisible();

  await expect(page.getByText(`Scope:${formInputs.location}`)).toBeVisible();

  await expect(
    page.getByText(
      `Reporting period:${formInputs.reportingDateFrom} - ${formInputs.reportingDateTo}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health awareness program:${Number(
        formInputs.numMentalHealthProgram
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health awareness activities:${Number(
        formInputs.numMentalHealthActivities
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of participants in mental health awareness activities:${Number(
        formInputs.numParticipantsMentalHealthActivities
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health professional:${Number(
        formInputs.numMentalHealthProf
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(page.locator('id=summary.avg_hrs_training')).toHaveText(
    `Average hours of training for mental health professional:${Number(
      formInputs.avgHrsTraining
    ).toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );

  await expect(page.locator('id=summary.company_type')).toHaveText(
    `Company type:${formInputs.companyType}`
  );

  try {
    await expect(
      page.getByText(
        `Developing company with confidential counseling programs:${formInputs.developingCounselingProg}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with confidential counseling programs:${formInputs.operatingCounselingProg}`
      )
    ).toBeVisible({ timeout: 200 });
  }

  try {
    await expect(
      page.getByText(
        `Developing company with regular test for substance use and abuse:${formInputs.developingRegularSubstanceTest}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with regular test for substance use and abuse:${formInputs.operatingRegularSubstanceTest}`
      )
    ).toBeVisible({ timeout: 200 });
  }

  try {
    await expect(
      page.getByText(
        `Developing company with access to mental health care:${formInputs.developingAccessMentalHealthCare}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with access to mental health care:${formInputs.operatingAccessMentalHealthCare}`
      )
    ).toBeVisible({ timeout: 200 });
  }
};
/**
 *
 * @param {Array} expectedValues - An array of objects containing the column name and expected values to be displayed on the listing grid. e.g. [{
    columnName: 'Reporting Period From',
    expectedValue: '1 Jan 2024',
  },
  {
    columnName: 'Reporting Period To',
    expectedValue: '30 Jan 2024',
  },...]
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
export const assertMentalHealthListingGrid = async (
  expectedValues,
  page,
  expect
) => {
  for (const [i, column] of expectedValues.entries()) {
    await expect(
      page
        .frameLocator('iframe[name="data-collection-iframe"]')
        .locator(
          `table.sorted-table > tbody > tr:last-child > td:nth-child(${i + 1})`
        )
    ).toHaveText(`${column.expectedValue}`);
  }
};
