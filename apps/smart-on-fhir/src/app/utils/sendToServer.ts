import {
  IBundle,
  IPatient,
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import axios from 'axios';

/**
 * Function to SEND a questionnaire response to the server.
 **/

export const sendToServer = async (
  client: Client,
  patient: IPatient,
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

    await client.request({
      url: `QuestionnaireResponse/${responseId}`,
      method: 'PUT',
      body: JSON.stringify(questionnaireResponse),
      headers,
    });

    await axios
      .post('/resource-puller/pull-resource', {
        serverUrl: client.state.serverUrl,
        reference: `QuestionnaireResponse/${responseId}`,
        authHeader: client.getAuthorizationHeader(),
      })
      .then((res) => {
        console.log('Response', res.data);
      })
      .catch((error) => {
        console.log('Res', error);
      });
  }
};
