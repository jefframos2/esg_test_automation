import { LoremIpsum } from 'lorem-ipsum';
import {
  generateRandomInt,
  generateRandomDecimal,
  generateDateRangeWithinFY,
  getRandomElement,
} from '../utils/data_factory_utils';
import { Collection } from '../utils/db_collection';

export const generateMentalHealthAwarenessInputData = async (
  baseURL,
  eLxAmbCookie,
  username,
  fy = new Date().getFullYear() // Defaults to current year if not specified
) => {
  // Get the userId of the user in User Management collection
  const userManagementCollection = new Collection(baseURL, 'User Management');
  const user = await userManagementCollection.getAllDocuments(eLxAmbCookie, 1, {
    'elxPublic.name': `${username}`,
  });
  const userId = JSON.parse(user).elxPublic.userId.$oid;

  //Get the topic in Collaborator Settings collection
  const collaboratorSettingsCollection = new Collection(
    baseURL,
    'Collaborator Settings'
  );
  const mentalHealthAwarenessCollaboratorSetting =
    await collaboratorSettingsCollection.getAllDocuments(eLxAmbCookie, 1, {
      'elxPublic.esg.topic': 'Mental Health Awareness',
    });
  const mentalHealthAwarenessCollaboratorSettingId = JSON.parse(
    mentalHealthAwarenessCollaboratorSetting
  )._id;

  // Get all the BUs the user has access to in Collaborators Form collection
  const collaboratorsFormCollection = new Collection(
    baseURL,
    'Collaborators Form'
  );
  const mentalHealthAwarenessCollaboratorsForm =
    await collaboratorsFormCollection.getAllDocuments(eLxAmbCookie, 1, {
      'elxPublic.user_id': `${userId}`,
      'elxPublic.parent_id': `${mentalHealthAwarenessCollaboratorSettingId}`,
    });
  const locations = JSON.parse(mentalHealthAwarenessCollaboratorsForm).elxPublic
    .locations;

  const businessUnitsL1 = locations.map((location) => location.location);

  // Select random BU Level 1
  const businessUnitL1 = getRandomElement(...businessUnitsL1);

  // Get fy_start_month and fy_end_month in SystemParameter collection to be used in generating random date range within FY
  const systemParameterCollection = new Collection(baseURL, 'SystemParameter');
  const fyStartMonthDocument = await systemParameterCollection.getAllDocuments(
    eLxAmbCookie,
    1,
    {
      cd: 'fy_start_month',
    }
  );
  const fyStartMonth = Number(JSON.parse(fyStartMonthDocument).value);

  const fyEndMonthDocument = await systemParameterCollection.getAllDocuments(
    eLxAmbCookie,
    1,
    {
      cd: 'fy_end_month',
    }
  );
  const fyEndMonth = Number(JSON.parse(fyEndMonthDocument).value);

  const reportingDate = generateDateRangeWithinFY(fy, fyStartMonth, fyEndMonth);
  const numMentalHealthProgram = generateRandomInt(0, 5000).toString();
  const numMentalHealthActivities = generateRandomInt(0, 5000).toString();
  const numParticipantsMentalHealthActivities = generateRandomInt(
    0,
    5000
  ).toString();
  const numMentalHealthProf = generateRandomInt(0, 5000).toString();
  const avgHrsTraining = generateRandomDecimal(0, 5000).toString();
  const companyType = getRandomElement(
    'Operating company',
    'Developing company'
  );

  const generatedData = {
    location: businessUnitL1,
    reportingDateFrom: reportingDate.dateFrom,
    reportingDateTo: reportingDate.dateTo,
    numMentalHealthProgram,
    numMentalHealthActivities,
    numParticipantsMentalHealthActivities,
    numMentalHealthProf,
    avgHrsTraining,
    companyType,
  };

  if (companyType === 'Operating company') {
    generatedData.operatingCounselingProg = getRandomElement('Yes', 'No');
    generatedData.operatingRegularSubstanceTest = getRandomElement('Yes', 'No');
    generatedData.operatingAccessMentalHealthCare = getRandomElement(
      'Yes',
      'No'
    );
  } else {
    generatedData.developingCounselingProg = getRandomElement('Yes', 'No');
    generatedData.developingRegularSubstanceTest = getRandomElement(
      'Yes',
      'No'
    );
    generatedData.developingAccessMentalHealthCare = getRandomElement(
      'Yes',
      'No'
    );
  }

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 4,
      min: 2,
    },
    wordsPerSentence: {
      max: 10,
      min: 4,
    },
  });

  generatedData.amendmentReason = lorem.generateParagraphs(1);

  return generatedData;
};
