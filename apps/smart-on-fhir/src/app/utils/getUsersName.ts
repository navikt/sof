import { fhirclient } from 'fhirclient/lib/types';

/**
 * This function gets the users full name. The use will typically be
 * a Practitioner in EHRs. The function might have to be chenged,
 * depending on how a Practitioner resouce looks at DIPS and other EHRs.
 * It currently gives the first name in the user.name array.
 * @param user The user whos name we would like to know.
 * @returns A string with the users full name.
 */
export const getUsersName = (
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
    | undefined
) => {
  if (user && user.name) {
    const nameObject = user.name[0];
    let fullName: string = '';
    nameObject.given?.map((name: string) => (fullName += name + ' '));
    fullName += nameObject?.family;
    return fullName;
  }
  return '';
};
