import {
  IBundle,
  IPatient,
  IQuestionnaireResponse,
  QuestionnaireResponseStatusKind,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';

export const sendToServer = async (
  client: Client,
  patient: IPatient,
  questionnaireResponse: IQuestionnaireResponse
) => {
  const headers = { 'Content-Type': 'application/fhir+json', Accept: '*/*' };
  const response: IBundle = await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=${questionnaireResponse.questionnaire}&status=in-progress`
  );
  console.log(questionnaireResponse);
  if (response.total && response.total !== 0 && response.entry) {
    const responseId: string | undefined = response.entry[0].resource?.id;
    questionnaireResponse.id = responseId;
    questionnaireResponse.status = QuestionnaireResponseStatusKind._completed;

    await client.request({
      url: `QuestionnaireResponse/${responseId}`,
      method: 'PUT',
      body: JSON.stringify(questionnaireResponse),
      headers,
    });
  }
};
