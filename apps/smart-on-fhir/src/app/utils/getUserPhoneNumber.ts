import { fhirclient } from 'fhirclient/lib/types';

/**
 * This function gets the users phone number.
 * It is currently just a dummy method that does not return anything.
 * @param user The user whos phone number we would like to know.
 * @returns An integer of the users phone number.
 */
export const getUserPhoneNumber = (
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
    | undefined
) => {
  return 0;
};
