import { getPatientName } from './getPatientName';
import { IPatient, HumanNameUseKind } from '@ahryman40k/ts-fhir-types/lib/R4';

test('it should get a patient name', async () => {
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
  };
  const patientName = getPatientName(patient);
  expect(patientName).toBe('Danae Kshlerin');
});
