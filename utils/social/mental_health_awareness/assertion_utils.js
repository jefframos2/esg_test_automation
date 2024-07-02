import {
  formatDateAsDMMMYYYY,
  formatDateAsDDMMYYYY,
  formatNumberWithThousandSeparator,
} from '../../helpers';

/**
 * Function for checking the Summary against the input values
 * @param {object} inputData - Object containing the values inputted to the data collection form
 * @param {string} inputData.location - Scope
 * @param {string} inputData.reportingDateFrom - Reporting Period From (in DD/MM/YYYY format)
 * @param {string} inputData.reportingDateTo - Reporting Period To (in DD/MM/YYYY format)
 * @param {string} inputData.numMentalHealthProgram - Number of mental health awareness program
 * @param {string} inputData.numMentalHealthActivities - Number of mental health awareness activities
 * @param {string} inputData.numParticipantsMentalHealthActivities - Number of participants in mental health awareness activities
 * @param {string} inputData.numMentalHealthProf - Number of mental health professional
 * @param {string} inputData.avgHrsTraining - Average hours of training for mental health professional
 * @param {string} inputData.companyType - Company type (Developing company or Operating company)
 * @param {string} inputData.developingCounselingProg - Developing company with confidential counseling programs (Yes or No)
 * @param {string} inputData.developingRegularSubstanceTest - Developing company with regular test for substance use and abuse (Yes or No)
 * @param {string} inputData.developingAccessMentalHealthCare - Developing company with access to mental health care (Yes or No)
 * @param {string} inputData.operatingCounselingProg - Operating company with confidential counseling programs (Yes or No)
 * @param {string} inputData.operatingRegularSubstanceTest - Operating company with regular test for substance use and abuse (Yes or No)
 * @param {string} inputData.operatingAccessMentalHealthCare - Operating company with access to mental health care (Yes or No)
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
export const assertMentalHealthAwarenessSummary = async (
  inputData,
  page,
  expect
) => {
  await expect(page.getByText('Summary')).toBeVisible();

  await expect(page.getByText(`Scope:${inputData.location}`)).toBeVisible();

  await expect(
    page.getByText(
      `Reporting period:${inputData.reportingDateFrom} - ${inputData.reportingDateTo}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health awareness program:${Number(
        inputData.numMentalHealthProgram
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health awareness activities:${Number(
        inputData.numMentalHealthActivities
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of participants in mental health awareness activities:${Number(
        inputData.numParticipantsMentalHealthActivities
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(
    page.getByText(
      `Number of mental health professional:${Number(
        inputData.numMentalHealthProf
      ).toLocaleString('en-us')}`
    )
  ).toBeVisible();

  await expect(page.locator('id=summary.avg_hrs_training')).toHaveText(
    `Average hours of training for mental health professional:${Number(
      inputData.avgHrsTraining
    ).toLocaleString('en-us', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  );

  await expect(page.locator('id=summary.company_type')).toHaveText(
    `Company type:${inputData.companyType}`
  );

  try {
    await expect(
      page.getByText(
        `Developing company with confidential counseling programs:${inputData.developingCounselingProg}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with confidential counseling programs:${inputData.operatingCounselingProg}`
      )
    ).toBeVisible({ timeout: 200 });
  }

  try {
    await expect(
      page.getByText(
        `Developing company with regular test for substance use and abuse:${inputData.developingRegularSubstanceTest}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with regular test for substance use and abuse:${inputData.operatingRegularSubstanceTest}`
      )
    ).toBeVisible({ timeout: 200 });
  }

  try {
    await expect(
      page.getByText(
        `Developing company with access to mental health care:${inputData.developingAccessMentalHealthCare}`
      )
    ).toBeVisible({ timeout: 200 });
  } catch (e) {
    await expect(
      page.getByText(
        `Operating company with access to mental health care:${inputData.operatingAccessMentalHealthCare}`
      )
    ).toBeVisible({ timeout: 200 });
  }
};
/**
 * Function for checking the listing grid values against the input values
 * @param {object} inputData - Generated random input data
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Expect} expect
 */
export const assertMentalHealthListingGrid = async (
  inputData,
  page,
  expect
) => {
  const expectedValues = [
    {
      columnName: 'Reporting Period From',
      expectedValue: `${formatDateAsDMMMYYYY(inputData.reportingDateFrom)}`,
    },
    {
      columnName: 'Reporting Period To',
      expectedValue: `${formatDateAsDMMMYYYY(inputData.reportingDateTo)}`,
    },
    {
      columnName: 'Business Unit',
      expectedValue: `${inputData.location}`,
    },
    {
      columnName: 'No. of mental health awareness program',
      expectedValue: `${formatNumberWithThousandSeparator(
        inputData.numMentalHealthProgram
      )}`,
    },
    {
      columnName: 'No. of mental health awareness activities',
      expectedValue: `${formatNumberWithThousandSeparator(
        inputData.numMentalHealthActivities
      )}`,
    },
    {
      columnName: 'No. of participants in mental health awareness activities',
      expectedValue: `${formatNumberWithThousandSeparator(
        inputData.numParticipantsMentalHealthActivities
      )}`,
    },
    {
      columnName: 'No. of mental health professional',
      expectedValue: `${formatNumberWithThousandSeparator(
        inputData.numMentalHealthProf
      )}`,
    },
    {
      columnName: 'Collaborator',
      expectedValue: 'admin', //TODO: update with the actual user
    },
  ];

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

export const getExpectedSummaryValuesFromDocument = (document) => {
  const location = document.elxPublic.mental_health_awareness.location;

  const reportingDateFrom = formatDateAsDDMMYYYY(
    document.elxPublic.mental_health_awareness.reporting_date_from
  );

  const reportingDateTo = formatDateAsDDMMYYYY(
    document.elxPublic.mental_health_awareness.reporting_date_to
  );

  const numMentalHealthProgram =
    document.elxPublic.mental_health_awareness.no_mental_health_program;

  const numMentalHealthActivities =
    document.elxPublic.mental_health_awareness.no_mental_health_activities;

  const numParticipantsMentalHealthActivities =
    document.elxPublic.mental_health_awareness
      .no_participants_mental_health_activities;

  const numMentalHealthProf =
    document.elxPublic.mental_health_awareness.no_mental_health_prof;

  const avgHrsTraining =
    document.elxPublic.mental_health_awareness.avg_hrs_training;

  const companyType = document.elxPublic.mental_health_awareness.company_type;

  const operatingCounselingProg =
    document.elxPublic.mental_health_awareness.operating_counseling_prog;

  const operatingRegularSubstanceTest =
    document.elxPublic.mental_health_awareness.operating_regular_substance_test;

  const operatingAccessMentalHealthCare =
    document.elxPublic.mental_health_awareness
      .operating_access_mental_health_care;

  const developingCounselingProg =
    document.elxPublic.mental_health_awareness.developing_counseling_prog;

  const developingRegularSubstanceTest =
    document.elxPublic.mental_health_awareness
      .developing_regular_substance_test;

  const developingAccessMentalHealthCare =
    document.elxPublic.mental_health_awareness
      .developing_access_mental_health_care;

  return {
    location,
    reportingDateFrom,
    reportingDateTo,
    numMentalHealthProgram,
    numMentalHealthActivities,
    numParticipantsMentalHealthActivities,
    numMentalHealthProf,
    avgHrsTraining,
    companyType,
    operatingCounselingProg,
    operatingRegularSubstanceTest,
    operatingAccessMentalHealthCare,
    developingCounselingProg,
    developingRegularSubstanceTest,
    developingAccessMentalHealthCare,
  };
};
