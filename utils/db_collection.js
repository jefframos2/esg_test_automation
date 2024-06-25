import axios from 'axios';

export class Collection {
  /**
   *
   * @param {string} baseURL - The base URL of the environment
   * @param {string} collection - The name of the collection
   */
  constructor(baseURL, collection) {
    this.database = `eno-${new URL(baseURL).hostname.replace(
      '.esgconvene.com',
      ''
    )}`;
    this.collection = collection;
    this.baseURL = baseURL;
  }

  /**
   * Method to get the number of documents in a collection
   * @param {string} elxAmbCookie - elx-amb login cookie of the admin user
   * @param {object} query - An object used to filter documents. Default is an empty object.
   * @returns {Promise<number>} The number of documents in a collection
   */
  async getDocumentCount(elxAmbCookie, query = {}) {
    const requestBody = {
      database: this.database,
      collection: this.collection,
      query: JSON.stringify(query),
      skip: 0,
      limit: null,
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/developer/mongodb-query-record-count`,
        requestBody,
        {
          headers: {
            Cookie: `elx-amb=${elxAmbCookie}`,
          },
        }
      );
      return response.data.recordCount;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Method to download all the documents in a collection
   * @param {string} elxAmbCookie - elx-amb login cookie of the admin user
   * @param {number} limit - The maximum number of documents to be downloaded
   * @param {object} query - An object used to filter documents. Default is an empty object.
   * @returns {Promise<JSON>} All the documents in a collection as JSONL (new line character delimited JSON)
   */
  async getAllDocuments(elxAmbCookie, limit, query = {}) {
    const requestParams = {
      dbName: this.database,
      cltnName: this.collection,
      query: JSON.stringify(query),
      skip: 0,
      limit,
      ascending: true,
      columnName: '',
      'mime-type': 'application/json',
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/developer/mongodb-download`,
        requestParams,
        {
          headers: {
            Cookie: `elx-amb=${elxAmbCookie}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          responseType: 'text',
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Method to retrieve documents in a collection using their id
   * @param {string} elxAmbCookie - elx-amb login cookie of the admin user
   * @param  {...string} documentIds - ids of the documents to be retrieved
   * @returns {Promise<JSON>} Documents in a collection with the specified id
   */
  async getDocumentsById(elxAmbCookie, ...documentIds) {
    const ids = [];
    for (const id of documentIds) {
      ids.push({
        idType: 'string',
        value: id,
      });
    }

    const requestBody = {
      dbName: this.database,
      cltnName: this.collection,
      ids,
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/developer/find-documents`,
        requestBody,
        {
          headers: {
            Cookie: `elx-amb=${elxAmbCookie}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Method to delete documents in a collection
   * @param {string} elxAmbCookie - elx-amb login cookie of the admin user
   * @param  {...any} documentIds - ids of the documents to be deleted
   * @returns
   */
  async deleteDocuments(elxAmbCookie, ...documentIds) {
    const ids = [];
    for (const id of documentIds) {
      ids.push({
        idType: 'string',
        value: id,
      });
    }

    const requestBody = {
      dbName: this.database,
      cltnName: this.collection,
      ids,
    };

    try {
      const response = await axios.post(
        `${this.baseURL}/developer/drop-documents`,
        requestBody,
        {
          headers: {
            Cookie: `elx-amb=${elxAmbCookie}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}
