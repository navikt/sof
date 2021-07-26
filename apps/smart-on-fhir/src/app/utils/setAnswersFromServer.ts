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

type setAnswersType = React.Dispatch<React.SetStateAction<any>>;

const setAllAnswers = (response: any, setAnswers: setAnswersType) => {
  const fetchedAnswers = new Map<string, string | boolean>();
  /*if (response.item.find((elem: itemType) => elem.linkId === linkId)) {
    const correctItem = response.item.find(
      (elem: itemType) => elem.linkId === linkId
    );
    console.log('correctItem: ', correctItem);
    if (correctItem.answer && correctItem.answer[0]) {
      setAnswers(
        response.item.find((elem: itemType) => elem.linkId === linkId).answer[0]
          .valueString
      );
    }
  }*/
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
};

export const getAnswersFromServer = async (
  client: Client,
  patient: IPatient,
  setAnswers: setAnswersType
) => {
  const response = (await client.request(
    `QuestionnaireResponse?subject=Patient/${patient.id}&questionnaire=Questionnaire/1340134&status=in-progress`
  )) as IBundle;
  // NB: burde ikke hardkode inn questionnaire^^
  if (response.total !== 0 && response.entry && response.entry[0].resource) {
    setAllAnswers(response.entry[0].resource, setAnswers);
  }
  console.log('response: ', response);
};
