//Libraries
import { test, expect } from '@playwright/test';
import fs from 'fs';
import { join } from 'path';

// Test Data
import {
  formInputCreate,
  formInputUpdate,
} from '../../../data/input/mental_health_awareness/mental_health_awareness_form_input';
import {
  expectedGridValuesAfterSubmit,
  expectedGridValuesAfterEdit,
  expectedGridValuesAfterImport,
} from '../../../data/output/mental_health_awareness/mental_health_awaress_grid';

// Page Object Models
import { Carousel } from '../../../page_objects/carousel';
import { Header } from '../../../page_objects/header';
import { MentalHealthAwarenessDataCollectionForm } from '../../../page_objects/social/mental_health_awareness/data_collection_form';
import { MentalHealthAwarenessListingGrid } from '../../../page_objects/social/mental_health_awareness/listing_grid';
import { MentalHealthAwarenessSummary } from '../../../page_objects/social/mental_health_awareness/summary';
import { SidePanel } from '../../../page_objects/side_panel';
import { DeleteConfirmationDialog } from '../../../page_objects/delete_confirmation_dialog';
import { MentalHealthAwarenessImportDataForm } from '../../../page_objects/social/mental_health_awareness/import_data_form';

//Utils
import {
  assertMentalHealthAwarenessSummary,
  assertMentalHealthListingGrid,
} from '../../../utils/social/mental_health_awareness/assertion_utils';
import { hasRow } from '../../../utils/listing_grid_utils';
import { Collection } from '../../../utils/db_collection';

// Use the login cookie created from auth.setup.js so we don't have to re-login on every test
test.use({ storageState: '.auth/adminUser.json' });

test.beforeAll(async ({ baseURL }) => {
  // Get the login cookies of the admin user that is stored in adminUser.json
  const adminUser = fs.readFileSync(
    join(__dirname, '../../../.auth/adminUser.json'),
    'utf8'
  );

  // Get the elx-amb cookie of the admin user
  const eLxAmbCookie = JSON.parse(adminUser).cookies.find(
    (cookie) => cookie.name === 'elx-amb'
  ).value;

  const mentalHealthAwarenessDataCollection = new Collection(
    baseURL,
    'Mental Health Awareness Data Collection'
  );

  // Get the count of documents in Mental Health Awaress Data Collection
  const mentalHealthAwarenessDocumentsCount =
    await mentalHealthAwarenessDataCollection.getDocumentCount(eLxAmbCookie);

  // Get all documents in Mental Health Awareness Data Collection
  // Returns JSONL (newline character delimited JSON Data)
  const mentalHealthAwarenessDocumentsJSONL =
    await mentalHealthAwarenessDataCollection.getAllDocuments(
      eLxAmbCookie,
      mentalHealthAwarenessDocumentsCount
    );

  // Convert JSONL to an array of JSON
  // Value will be an array with empty string (i.e. ['']) if there are no documents in the collection
  const mentalHealthAwarenessDocumentsArray =
    mentalHealthAwarenessDocumentsJSONL.split('\n');

  // If there are Mental Health Awareness Data Collection documents retrieved
  if (mentalHealthAwarenessDocumentsArray[0]) {
    // The ids will be passed to deleteDocuments method
    const ids = [];
    mentalHealthAwarenessDocumentsArray.forEach((document) => {
      ids.push(JSON.parse(document)._id);
    });

    // Delete all documents in Mental Health Awareness Data Collection before running the tests
    await mentalHealthAwarenessDataCollection.deleteDocuments(
      eLxAmbCookie,
      ...ids
    );
  }

  // TODO: Seed the DB before running the tests
});

test.beforeEach(async ({ page }) => {
  // Go to Home Page on start of every test
  await page.goto('/cms/dashboard/home.html');

  // Go to Mental Health Awareness Data Collection tab
  const header = new Header(page);
  await header.goToDataCollectionPage();

  const carousel = new Carousel(page);
  await carousel.goToTopic('Mental Health Awareness ');

  // Check that user is redirected to Mental Health Awareness Dashboard
  await expect(page).toHaveURL(
    '/cms/dashboard/datacollection.html?initialPage=Mental%20Health%20Awareness'
  );
});

test('Submit new data via data collection form', async ({ page }) => {
  // Click New Data button
  const mentalHealthAwarenessListingGrid = new MentalHealthAwarenessListingGrid(
    page
  );
  await mentalHealthAwarenessListingGrid.clickNewData();

  // Check form title
  await expect(
    page.getByText('New Mental Health Awareness Data')
  ).toBeVisible();

  // Fill out form fields and submit
  const mentalHealthAwarenessDataCollectionForm =
    new MentalHealthAwarenessDataCollectionForm(page);
  await mentalHealthAwarenessDataCollectionForm.fillOutForm(formInputCreate);
  await mentalHealthAwarenessDataCollectionForm.submitForm();

  // Assertions - Check the values on read-only form after submission
  await assertMentalHealthAwarenessSummary(formInputCreate, page, expect);

  // Return to dashboard
  const mentalHealthAwarenessSummary = new MentalHealthAwarenessSummary(page);
  await mentalHealthAwarenessSummary.clickCancelButton();

  // Check that user is redirected back to the dashboard
  await expect(page).toHaveURL(
    '/cms/dashboard/datacollection.html?initialPage=Mental%20Health%20Awareness'
  );

  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Set side panel filters
  const sidePanel = new SidePanel(page);
  await sidePanel.expandOrCollapse();
  await sidePanel.selectYear('2024');
  await sidePanel.deselectAllStatus();

  // Assertions - Check each column value of the last data row of the dashboard listing grid
  await assertMentalHealthListingGrid(
    expectedGridValuesAfterSubmit,
    page,
    expect
  );

  //TODO DB record assertions - need to be able to programatically connect to the database
});

test('View data by clicking on the link in the dashboard listing grid', async ({
  page,
}) => {
  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Set side panel filters
  const sidePanel = new SidePanel(page);
  await sidePanel.expandOrCollapse();
  await sidePanel.selectYear('2024');
  await sidePanel.deselectAllStatus();

  const mentalHealthAwarenessListingGrid = new MentalHealthAwarenessListingGrid(
    page
  );

  // Check if there is a record on the listing grid to view
  let hasAtLeastOneRow = await hasRow(mentalHealthAwarenessListingGrid, {
    error: { msg: 'No record to view' },
  });

  if (hasAtLeastOneRow) {
    // Click the Reporting Period From link of the last record in the grid

    await mentalHealthAwarenessListingGrid.clickLastRowLink();

    // Assertions - Check the values on read-only form after clicking Reporting Period From link
    await assertMentalHealthAwarenessSummary(formInputCreate, page, expect);
  }
});

test('Update existing data', async ({ page }) => {
  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Set side panel filters
  const sidePanel = new SidePanel(page);
  await sidePanel.expandOrCollapse();
  await sidePanel.selectYear('2024');
  await sidePanel.deselectAllStatus();

  const mentalHealthAwarenessListingGrid = new MentalHealthAwarenessListingGrid(
    page
  );

  // Check if there is a record on the listing grid to update
  let hasAtLeastOneRow = await hasRow(mentalHealthAwarenessListingGrid, {
    error: { msg: 'No record to update' },
  });

  if (hasAtLeastOneRow) {
    // Click the Reporting Period From link of the last record in the grid
    await mentalHealthAwarenessListingGrid.clickLastRowLink();

    // Click Edit button on the Summary page
    const mentalHealthAwarenessSummary = new MentalHealthAwarenessSummary(page);
    await mentalHealthAwarenessSummary.clickEditButton();
  }

  // Check form title
  await expect(
    page.getByText('Update Mental Health Awareness Data')
  ).toBeVisible();

  // Fill out form fields
  const mentalHealthAwarenessDataCollectionForm =
    new MentalHealthAwarenessDataCollectionForm(page);
  await mentalHealthAwarenessDataCollectionForm.fillOutForm(formInputUpdate);

  // Provide amendment reason
  await mentalHealthAwarenessDataCollectionForm.provideAmendmentReason(
    formInputUpdate.amendmentReason
  );

  // Amend
  await mentalHealthAwarenessDataCollectionForm.amendData();

  // Assertions - Check the values on read-only form after submission
  await assertMentalHealthAwarenessSummary(formInputUpdate, page, expect);

  // Return to dashboard
  const mentalHealthAwarenessSummary = new MentalHealthAwarenessSummary(page);
  await mentalHealthAwarenessSummary.clickCancelButton();

  // Check that user is redirected back to the dashboard
  await expect(page).toHaveURL(
    '/cms/dashboard/datacollection.html?initialPage=Mental%20Health%20Awareness'
  );

  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Assertions - Check each column value of the last data row of the dashboard listing grid
  await assertMentalHealthListingGrid(
    expectedGridValuesAfterEdit,
    page,
    expect
  );

  //TODO DB record assertions - need to be able to programatically connect to the database
});

test('Delete existing data', async ({ page }) => {
  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Set side panel filters
  const sidePanel = new SidePanel(page);
  await sidePanel.expandOrCollapse();
  await sidePanel.selectYear('2024');
  await sidePanel.deselectAllStatus();

  const mentalHealthAwarenessListingGrid = new MentalHealthAwarenessListingGrid(
    page
  );

  // Check if there is a record on the listing grid to delete
  let hasAtLeastOneRow = await hasRow(mentalHealthAwarenessListingGrid, {
    error: { msg: 'No record to delete' },
  });

  if (hasAtLeastOneRow) {
    // Get the current number of rows on the listing grid (before record deletion)
    let numberOfRecordsBeforeDeletion =
      await mentalHealthAwarenessListingGrid.tableBody.evaluate((tableBody) => {
        return Promise.resolve(tableBody.children.length);
      });

    // Click the Reporting Period From link of the last record in the grid
    await mentalHealthAwarenessListingGrid.clickLastRowLink();

    // Click Edit button on the Summary page
    const mentalHealthAwarenessSummary = new MentalHealthAwarenessSummary(page);
    await mentalHealthAwarenessSummary.clickEditButton();

    // Click Delete button on the Data Collection form
    const mentalHealthAwarenessDataCollectionForm =
      new MentalHealthAwarenessDataCollectionForm(page);
    await mentalHealthAwarenessDataCollectionForm.deleteData();

    // Confirm record deletion
    const deleteConfirmationDialog = new DeleteConfirmationDialog(page);
    await deleteConfirmationDialog.confirmDeletion();

    // Check that user is redirected back to the dashboard after deletion
    await expect(page).toHaveURL(
      '/cms/dashboard/datacollection.html?initialPage=Mental%20Health%20Awareness'
    );

    // Wait for listing grid title to be visible before counting the records. Once visible, it means that grid should already be visible too.
    // TODO: might need to wait for column headers to be displayed instead. It seems that this is the order they are displayed after loading the page with a slight delay in each step: grid/grid title > column headers and buttons > table rows (data). If hasRow() is called too early, it might return false as table rows are not loaded yet.
    await expect(
      page
        .frameLocator('iframe[name="data-collection-iframe"]')
        .locator('#gridbox-MentalHealthAwareness1V')
        .getByText('Mental Health Awareness', { exact: true })
    ).toBeVisible();

    // Check if there is a remaining record on the listing grid after deleting the last row
    let numberOfRecordsAfterDeletion;
    hasAtLeastOneRow = await hasRow(mentalHealthAwarenessListingGrid, {
      error: { msg: 'No remaining record on the listing grid after deletion' },
    });

    if (hasAtLeastOneRow) {
      // Count the remaining records in grid (after deletion)..
      numberOfRecordsAfterDeletion =
        await mentalHealthAwarenessListingGrid.tableBody.evaluate(
          (tableBody) => {
            return Promise.resolve(tableBody.children.length);
          }
        );
    } else {
      numberOfRecordsAfterDeletion = 0;
    }

    // Assert that the remaining records on the listing grid is one less than the previous count. Note that pagination is not yet considered
    expect(numberOfRecordsAfterDeletion).toEqual(
      numberOfRecordsBeforeDeletion - 1
    );

    //TODO DB record assertions - need to be able to programatically connect to the database
  }
});

test('Submit new data via import file', async ({ page }) => {
  // Click Import Data button
  const mentalHealthAwarenessListingGrid = new MentalHealthAwarenessListingGrid(
    page
  );
  await mentalHealthAwarenessListingGrid.clickImportData();

  // Check form title
  await expect(
    page.getByText('Import Mental Health Awareness Data')
  ).toBeVisible();

  // Upload file
  const mentalHealthAwarenessImportDataForm =
    new MentalHealthAwarenessImportDataForm(page);
  await mentalHealthAwarenessImportDataForm.uploadFile(
    'mental_health_awareness_import.xlsx'
  );
  await mentalHealthAwarenessImportDataForm.submitForm();

  // Check that user is redirected back to the dashboard
  await expect(page).toHaveURL(
    '/cms/dashboard/datacollection.html?initialPage=Mental%20Health%20Awareness',
    { timeout: 30000 }
  ); // Set timeout to 30 seconds as import is slow at times. Global "expect" timeout of 10 seconds might not be enough.

  // Wait for listing grid title to be visible. Once visible, it means that grid should already be visible too.
  await expect(
    page
      .frameLocator('iframe[name="data-collection-iframe"]')
      .locator('#gridbox-MentalHealthAwareness1V')
      .getByText('Mental Health Awareness', { exact: true })
  ).toBeVisible();

  // Set side panel filters
  const sidePanel = new SidePanel(page);
  await sidePanel.expandOrCollapse();
  await sidePanel.selectYear('2024');
  await sidePanel.deselectAllStatus();

  // Assertions - Check each column value of the last data row of the dashboard listing grid
  await assertMentalHealthListingGrid(
    expectedGridValuesAfterImport,
    page,
    expect
  );

  //TODO DB record assertions - need to be able to programatically connect to database
});
