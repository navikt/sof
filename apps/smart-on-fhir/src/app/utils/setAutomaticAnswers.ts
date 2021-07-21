import { getUserName } from './getUserName';
import { getUserPhoneNumber } from './getUserPhoneNumber';
import { getHospitalName } from './getHospitalName';
import { getHospitalAdress } from './getHospitalAdress';
import { getUserHPR } from './getUserHPR';
import { fhirclient } from 'fhirclient/lib/types';
import {
  IPatient,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';

/**
 * Function to set the answers that should be atomatically fetched from the
 * sesrver, instead of being typed in by the user.
 * @param response the json response template to fill out
 * @param patient the patient that the doctor is currently logged in to in the EHR
 * @param user the user of the EHR, typically a doctor
 */
export const setAutomaticAnswers = (
  response: IQuestionnaireResponse,
  patient: IPatient,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  setSubject(response, patient);
  setPractitionerHPR(
    findCorrectItemObjectByText(response, 'Legens HPR-nummer'),
    user
  );
  setPractitionerName(
    findCorrectItemObjectByText(response, 'Legens navn'),
    user
  );

  // The following three function calls use methods that does not currently do anything:
  setPractitionerPhoneNumber(
    findCorrectItemObjectByText(response, 'Legens telefonnummer'),
    user
  );
  setHospitalName(
    findCorrectItemObjectByText(response, 'Sykehusets navn'),
    user
  );
  setHospitalAdress(
    findCorrectItemObjectByText(response, 'Sykehusets adresse'),
    user
  );
};

/**
 * Help function to get the correct object from the item array in response
 * based on the value of the text field.
 * @param response json response template to fill out
 * @param text The value of the text-field in the item object we are looking for
 * @returns one of the objects in the item array
 */
const findCorrectItemObjectByText = (
  response: IQuestionnaireResponse,
  text: string
) => {
  return response.item?.find((element: any) => element.text === text);
};

/**
 *
 * @param response Function to set the subject (typically patient) in
 * the json template.
 * @param patient the patient we are logged in at in the EHR
 */
const setSubject = (response: IQuestionnaireResponse, patient: IPatient) => {
  response.subject
    ? (response.subject.reference = `Patient/${patient.id}`)
    : null;
};

/**
 * Function to set the correct practitioner HPR number in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
const setPractitionerHPR = (
  item: any,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  console.log('HPR: ', getUserHPR(user));
  console.log('user: ', user);
  user ? (item.answer[0].valueInteger = getUserHPR(user)) : null;
};

/**
 * Function to set the correct practitioner name in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
const setPractitionerName = (
  item: any,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  user ? (item.answer[0].valueString = getUserName(user)) : null;
};

/**
 * Function to set the correct practitioner phone number in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
const setPractitionerPhoneNumber = (
  item: any,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  user ? (item.answer[0].valueInteger = getUserPhoneNumber(user)) : null;
};

/**
 * Function to set the correct hospital name in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
const setHospitalName = (
  item: any,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  user ? (item.answer[0].valueString = getHospitalName(user)) : null;
};

/**
 * Function to set the correct hospital adress in the json template
 * @param item an object from the item array
 * @param user the user of the EHR, typically a doctor
 */
const setHospitalAdress = (
  item: any,
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
) => {
  user ? (item.answer[0].valueString = getHospitalAdress(user)) : null;
};
