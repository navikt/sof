import { IBundle, IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';

type questionnaireResponseItemType = {
  linkId: string;
  text: string;
  answer: {
    valueString?: string;
    valueDate?: string;
  }[];
};
type setAnswersType = React.Dispatch<React.SetStateAction<any>>;

/**
 * Function to set answers based on a response
 * @param response IQuestionnaireResponse for the current patient
 * and questionnaire that is in progress.
 * @param setAnswers Function to set the answers-state
 */
const setAllAnswers = (response: any, setAnswers: setAnswersType) => {
  const fetchedAnswers = new Map<string, string | boolean>();
  response.item.map((question: questionnaireResponseItemType) => {
    if (question.answer) {
      question.answer[0].valueDate
        ? fetchedAnswers.set(question.linkId, question.answer[0].valueDate)
        : question.answer[0].valueString
        ? fetchedAnswers.set(question.linkId, question.answer[0].valueString)
        : null;
    }
  });
  setAnswers(fetchedAnswers);
};

/**
 * Function to get answers allready saved to the server and
 * update the answers-map based on this.
 * @param client client connected to the FHIR-server
 * @param patient The patient we are currently on in the EHR
 * @param setAnswers function to set the answers-map
 */
export const getAnswersFromServer = async (
  client: Client,
  patient: IPatient,
  setAnswers: setAnswersType
) => {
  const response = (await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=Questionnaire/1340187&status=in-progress`
  )) as IBundle;
  // NB: burde ikke hardkode inn questionnaire^^
  if (response.total !== 0 && response.entry && response.entry[0].resource) {
    setAllAnswers(response.entry[0].resource, setAnswers);
  }
  console.log('response: ', response);
};
