import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';

/**
 * Code to find the wanted identifier. Might have to be changed later,
 * but that depends on how "Fødselsnummer" is included in patient.
 * @param patient A Patient resource, to which we wish to find the id
 * @param typeOfId What type of Id (e.g. "Social Security Number",
 * "Fødselsnummer", "D-nummer")
 * @returns A patient id as a number.
 */
export const getPatientId = (typeOfId: string, patient?: IPatient) => {
  if (patient && patient.identifier) {
    const id = patient.identifier.find(
      (identifier) => identifier.type?.text === typeOfId
    )?.value;
    const intId =
      typeof id === 'string'
        ? parseInt(id.split('-').join(''))
        : typeof id === 'number'
        ? id
        : null;
    return intId;
  }
  return 0;
};
