import { fhirclient } from 'fhirclient/lib/types';
/**
 * A function to get the hospitals name.
 * Currently just a dummy method.
 * @returns A string of the hospitals name.
 */

export const getHospitalName = (
  user:
    | fhirclient.FHIR.Patient
    | fhirclient.FHIR.Practitioner
    | fhirclient.FHIR.RelatedPerson
    | undefined
) => {
  return '';
};
