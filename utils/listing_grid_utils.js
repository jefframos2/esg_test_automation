/**
 * Function that checks if a listing grid contains at least one row
 * @param {object} listingGridObj - Listing grid object. (e.g. An instance of MentalHealthAwarenessListingGrid class)
 * @param {object} ErrorObject - An object containing the error message to be logged when the function returns false. e.g.
 * {
      error: { msg: 'No record to delete' }
    }
 * @returns {Promise<boolean>} true if the grid contains at lease one row. Otherwise, false
 */
export const hasRow = async (listingGridObj, { error: { msg } }) => {
  // TODO remove error argument used for debugging
  // Wait for the last row of the listing grid to be visible. If no error is thrown, it means that at least one row exists. Return true
  // Otherwise (timeout error is thrown), return false
  try {
    await listingGridObj.lastRow.waitFor({
      timeout: 5000,
    });
    return true;
  } catch (e) {
    console.log(msg);
    return false;
  }
};
