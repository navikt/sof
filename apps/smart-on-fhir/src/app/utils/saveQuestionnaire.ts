import Client from 'fhirclient/lib/Client';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import questionnaireResponse from '../json-files/questionnaireResponsePleiepenger.json';
import { setUUIDIdentifier } from './setIdentifier';

/**
 * Function to save a questionnaire to the server.
 * This function is not currently in use.
 * @param client the client from the fhir context
 */
export const saveQuestionnaire = async (client: Client | undefined) => {
  if (client) {
    setUUIDIdentifier(questionnairePleiepenger);
    await client.create(questionnairePleiepenger).then((questionnaire) => {
      questionnaireResponse.questionnaire = `Questionnaire/${questionnaire.id}`;
    });
  }
};
