import Client from 'fhirclient/lib/Client';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import questionnaireResponse from '../json-files/questionnaireResponse.json';

/**
 * Function to save a questionnaire to the server
 * @param client the client from the fhir context
 */
export const saveQuestionnaire = async (client: Client | undefined) => {
  if (client) {
    await client.create(questionnairePleiepenger).then((questionnaire) => {
      questionnaireResponse.questionnaire = `Questionnaire/${questionnaire.id}`;
    });
  }
  console.log(questionnaireResponse.questionnaire);
};
