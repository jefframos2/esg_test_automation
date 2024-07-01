import { Collection } from '../utils/db_collection';
import { getElxAmbCookie } from '../utils/helpers';

export const clearCollection = async (baseURL, collectionName) => {
  // Get the elx-amb login cookie of the admin user that is stored in adminUser.json
  const elxAmbCookie = getElxAmbCookie();

  const collection = new Collection(baseURL, collectionName);

  // Get the count of documents in the collection
  const documentsCount = await collection.getDocumentCount(elxAmbCookie);

  // Get all the documents in the collection
  // Returns JSONL (newline character delimited JSON Data)
  const documentsJSONL = await collection.getAllDocuments(
    elxAmbCookie,
    documentsCount
  );

  // Convert JSONL to an array of JSON
  // Value will be an array with empty string (i.e. ['']) if there are no documents in the collection
  const documentsArray = documentsJSONL.split('\n');

  // If there are documents in the collection
  if (documentsArray[0]) {
    // The ids will be passed to deleteDocuments method
    const ids = [];
    documentsArray.forEach((document) => {
      ids.push(JSON.parse(document)._id);
    });

    // Delete all documents in Mental Health Awareness Data Collection before running the tests
    await collection.deleteDocuments(elxAmbCookie, ...ids);
  }
};

export const getDocumentFromCollection = async (
  baseURL,
  collectionName,
  documentId
) => {
  // Get the elx-amb login cookie of the admin user that is stored in adminUser.json
  const elxAmbCookie = getElxAmbCookie();

  const collection = new Collection(baseURL, collectionName);

  // Get the document from the database
  const document = await collection.getDocumentsById(elxAmbCookie, documentId);

  return document[0];
};
