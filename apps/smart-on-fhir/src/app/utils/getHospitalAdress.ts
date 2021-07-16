import { fhirclient } from 'fhirclient/lib/types';

/**
 * A function to get the hospitals adress.
 * Currently just a dummy method.
 * @returns A string of the hospitals adress.
 */

export const getHospitalAdress = (
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
    | undefined
) => {
  return '';
};
