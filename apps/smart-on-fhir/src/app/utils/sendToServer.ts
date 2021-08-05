import {
  IBundle,
  IPatient,
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import axios from 'axios';
import { getPatientId } from './getPatientId';
import { getUserHPR } from './getUserHPR';
import { fhirclient } from 'fhirclient/lib/types';

/**
 * Function to SEND a questionnaire response to the server.
 **/

export const sendToServer = async (
  client: Client,
  patient: IPatient,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson,
  questionnaireResponse: IQuestionnaireResponse
) => {
  const headers = { 'Content-Type': 'application/fhir+json', Accept: '*/*' };
  const response: IBundle = await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=${questionnaireResponse.questionnaire}&status=in-progress`
  );
  // If there already exist a QR saved on the server with status "in-progress",
  // the current QR's status updated to "completed".
  if (response.total && response.total !== 0 && response.entry) {
    const responseId: string | undefined = response.entry[0].resource?.id;
    questionnaireResponse.id = responseId;
    //questionnaireResponse.status = QuestionnaireResponseStatusKind._completed;

    /*
    // Temporarily handling of setting patient FNR and practitioner (user) HPR
    if (questionnaireResponse.subject && questionnaireResponse.source) {
      questionnaireResponse.subject.id = getPatientId('FNR',patient).toString();
      questionnaireResponse.source.id = getUserHPR(user).toString();
    }
    */

    // Updates the current QR with the information above
    await client.request({
      url: `QuestionnaireResponse/${responseId}`,
      method: 'PUT',
      body: JSON.stringify(questionnaireResponse),
      headers,
    });

    // Sends the updated and final QR to the server
    if (client.state.serverUrl && client.getAuthorizationHeader()) {
      await axios
        .post('/resource-puller/pull-resource', {
          serverUrl: client.state.serverUrl,
          reference: `QuestionnaireResponse/${responseId}`,
          authHeader: client.getAuthorizationHeader(),
        })
        .then((res) => {
          console.log('Sending completed', res.data, res.status);
        })
        .catch((err) => {
          console.log('Error with sending', err);
        });
    } else console.log('No connection found, try restarting server');
  }
};
