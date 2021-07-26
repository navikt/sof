import { IBundle, IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';

type itemType = {
  linkId: string;
  text: string;
  answer: {
    valueString?: string;
    valueDate?: string;
  }[];
};

type setAnswersType = React.Dispatch<
  React.SetStateAction<Map<string, string | boolean>>
>;

const setAllAnswers = (
  response: any,
  setAnswers: setAnswersType,
  answers: Map<string, string | boolean>
) => {
  if (response.item) {
    const fetchedAnswers = new Map<string, string | boolean>();
    response.item.map((question: itemType) => {
      if (question.answer) {
        question.answer[0].valueDate
          ? fetchedAnswers.set(question.linkId, question.answer[0].valueDate)
          : question.answer[0].valueString
          ? fetchedAnswers.set(question.linkId, question.answer[0].valueString)
          : null;
      }
    });
    setAnswers(fetchedAnswers);
    console.log('Answers er: ', answers); // NB: fjern dette og det skal ikke sendes inn answers sånn egentlig, trengs bare for å logge
  }
};

export const getAnswersFromServer = async (
  client: Client,
  patient: IPatient,
  setAnswers: setAnswersType,
  answers: Map<string, string | boolean>
) => {
  const response = (await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=Questionnaire/1340134&status=in-progress`
  )) as IBundle;
  // NB: burde ikke hardkode inn questionnaire^^
  if (response.total !== 0 && response.entry && response.entry[0].resource) {
    setAllAnswers(response.entry[0].resource, setAnswers, answers);
  }
};
