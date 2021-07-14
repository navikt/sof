import { getPatientId } from './getPatientId';
import { IPatient, HumanNameUseKind } from '@ahryman40k/ts-fhir-types/lib/R4';

test('it should get a patient id', async () => {
  const patient: IPatient = {
    resourceType: 'Patient',
    name: [
      {
        use: HumanNameUseKind._official,
        family: 'Kshlerin',
        given: ['Danae'],
        prefix: ['Mrs.'],
      },
      {
        use: HumanNameUseKind._maiden,
        family: 'Graham',
        given: ['Danae'],
        prefix: ['Mrs.'],
      },
    ],
    identifier: [
      {
        system: 'https://github.com/synthetichealth/synthea',
        value: '1a43c86e-bb91-4573-b571-c87a5e03ead2',
      },
      {
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
              code: 'SS',
              display: 'Social Security Number',
            },
          ],
          text: 'Social Security Number',
        },
        system: 'http://hl7.org/fhir/sid/us-ssn',
        value: '999-16-8513',
      },
    ],
  };
  const patientId = getPatientId('Social Security Number', patient);
  expect(patientId).toBe('999-16-8513');
});
