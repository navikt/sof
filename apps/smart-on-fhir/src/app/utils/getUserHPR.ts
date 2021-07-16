import { fhirclient } from 'fhirclient/lib/types';

/**
 * This method gives the users identifier. It currently just returns
 * the first value in the identifier array, but will have to be
 * changed later to give the HPR-number of the user (Practitioner).
 * @param user The user whos Id to find
 * @returns A string containing the users Id or an empty string.
 */
export const getUserHPR = (
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
    | undefined
) => {
  return user && user.identifier ? user.identifier[0].value : '';
};
