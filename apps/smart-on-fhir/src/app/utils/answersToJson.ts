import {
  IPatient,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { fhirclient } from 'fhirclient/lib/types';
import { setAutomaticAnswers } from './setAutomaticAnswers';
import Client from 'fhirclient/lib/Client';
import { saveToServer } from './saveToServer';

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is a string.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
const setValueString = (item: any, value: string) => {
  item.answer[0].valueString = value;
};

/**
 * Function to set an answer in a questionnaire respose, if the
 * answer should be a date. Can also handle several answers.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
export const setValueDate = (item: any, value: string) => {
  console.log('value: ', value);
  if (value) {
    item.answer = []; // Start with an empty array
  }
  if (value[0] === '[') {
    // If item is a string representing a list of dates,
    // make one answer for each date

    const listOfDates: string[] = JSON.parse(value);

    for (let i: number = 0; i < listOfDates.length; i++) {
      item.answer.push({ valueDate: listOfDates[i] });
    }
  } else {
    // If item is just one date
    item.answer.push({ valueDate: value });
  }
};

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is a boolean.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
const setValueBoolean = (item: any, value: boolean) => {
  item.answer[0].valueBoolean = value;
};

/**
 * Function to set a an answer in a questionnaire response, if the
 * answer is an integer.
 * @param item an object in the questionnare response's item array
 * @param value the value to add to the items answer
 */
const setValueInteger = (item: any, value: string) => {
  const intValue = typeof value === 'string' ? parseInt(value) : value;
  item.answer[0].valueInteger = intValue;
};

/**
 * Function to save answers in a json file.
 * @param answers a map of answers on the form [linkId: value]
 * @param questionnaireResponse is the json file with the template of the response
 */
export const saveAnswers = async (
  answers: Map<string, string | boolean>,
  questionnaireResponse: IQuestionnaireResponse,
  patient: IPatient,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson,
  client: Client
) => {
  answers.forEach((value, key) => {
    //Get the correct object from response.item:
    const item = questionnaireResponse.item?.find((e: any) => e.linkId === key)
      ? questionnaireResponse.item.find((e: any) => e.linkId === key)
      : null;

    // Set the correct answer in the object
    if (item && item.answer && typeof value === 'string') {
      'valueString' in item.answer[0]
        ? setValueString(item, value)
        : 'valueDate' in item.answer[0]
        ? setValueDate(item, value)
        : 'valueInteger' in item.answer[0]
        ? setValueInteger(item, value)
        : null;
    } else if (item && item.answer && typeof value === 'boolean') {
      'valueBoolean' in item.answer[0] ? setValueBoolean(item, value) : null;
    }
  });
  setAutomaticAnswers(questionnaireResponse, patient, user);

  saveToServer(questionnaireResponse, client, patient);

  return questionnaireResponse;
};
