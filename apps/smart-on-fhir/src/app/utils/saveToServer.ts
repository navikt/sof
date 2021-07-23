import {
  IBundle,
  IPatient,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import { setUUIDIdentifier } from './setIdentifier';

/**
 * Function to save a questionnaire response to the server.
 * @param questionnaireResponse is the QR to save to the server
 * @param client is the client from the fhir context
 * @param patient is the patient we are logged in ato in the EHR
 */
export const saveToServer = async (
  questionnaireResponse: IQuestionnaireResponse,
  client: Client,
  patient: IPatient
) => {
  // Get questionnaireResponse which is in progress for the right patient and questionnaire
  const response = (await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=${questionnaireResponse.questionnaire}&status=in-progress`
  )) as IBundle;

  const headers = {
    'Content-Type': 'application/fhir+json',
    Accept: '*/*',
  };

  if (response.total && response.total !== 0 && response.entry) {
    // If there is already a questionnaire response saved and in progress
    // for this patient (on the correct questionnaire), the old QR is updated
    const responseId = response.entry[0].resource?.id;
    await client.request({
      url: `QuestionnaireResponse/${responseId}`,
      method: 'PUT',
      body: JSON.stringify(questionnaireResponse),
      headers,
    });
  } else {
    // If no QR matching the requirements were found,
    // add identifier and create a new QR
    setUUIDIdentifier(questionnaireResponse);
    await client
      .request({
        url: `QuestionnaireResponse`,
        method: 'POST',
        body: JSON.stringify(questionnaireResponse),
        headers,
      })
      .then((response) => (questionnaireResponse.id = response.id));
    // Can this^^ line be removed? The id is set automatically in the
    // questionnaire response when it is sent to the server, so this might
    // be unnecessary.
  }
};
