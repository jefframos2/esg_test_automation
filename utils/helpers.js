import fs from 'fs';
import { join } from 'path';
import { format, isMatch } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

/**
 * Function that returns the elx-amb login cookie of the admin user that is stored in adminUser.json. This cookie is used to access the database API.
 * @returns {string} elx-amb login cookie of the admin
 */
export const getElxAmbCookie = () => {
  // Get the login cookies of the admin user that is stored in adminUser.json
  const adminUser = fs.readFileSync(
    join(__dirname, '../.auth/adminUser.json'),
    'utf8'
  );

  // Get the elx-amb cookie of the admin user
  const elxAmbCookie = JSON.parse(adminUser).cookies.find(
    (cookie) => cookie.name === 'elx-amb'
  ).value;

  return elxAmbCookie;
};

export const getDocumentIdFromSummaryURL = (url) => {
  return new URL(url).pathname.split('/').at(-2);
};

/**
 * Function that formats a date from DD/MM/YYYY to D MMM YYYY (e.g. 02/01/2024 -> 2 Jan 2024)
 * @param {string} date Date in DD/MM/YYYY format (e.g. 02/01/2024)
 * @returns {string} Date in D MMM YYYY format (e.g. 2 Jan 2024). Day is not 0-padded if less than 10.
 */
export const formatDateAsDMMMYYYY = (date) => {
  // Check if input date has a DD/MM/YYYY format (e.g. 02/01/2024)
  if (isMatch(date, 'dd/MM/yyyy')) {
    const dateArray = date.split('/');
    const [DD, MM, YYYY] = dateArray;

    //Return date in DD MMM YYYY format (e.g. 02 Jan 2024). (Note: Month is 0-indexed in UTCDate constructor).
    return format(new UTCDate(YYYY, MM - 1, DD), 'd MMM yyyy');
  }
  return undefined;
};

/**
 * Function that formats a date from YYYY-MM-DD to DD/MM/YYYY (e.g. 2024-01-02 -> 02/01/2024)
 * @param {string} date Date in YYYY-MM-DD format (e.g. 2024-01-02)
 * @returns {string} Date in DD/MM/YYYY format (e.g. 02/01/2024)
 */
export const formatDateAsDDMMYYYY = (date) => {
  // Check if input date has a YYYY-MM-DD format (e.g. 2024-01-02)
  if (isMatch(date, 'yyyy-MM-dd')) {
    //Return date in DD/MM/YYYY format (e.g. 02/01/2024). Month is 0-indexed.
    return date.split('-').reverse().join('/');
  }
  return undefined;
};

export const formatNumberWithThousandSeparator = (number) => {
  return Number(number).toLocaleString('en-us');
};
