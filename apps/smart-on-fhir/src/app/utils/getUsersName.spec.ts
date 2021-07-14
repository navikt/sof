import { fhirclient } from 'fhirclient/lib/types';
import { getUsersName } from './getUsersName';

test('it should get a users name name', async () => {
  const patient: fhirclient.FHIR.Practitioner = {
    resourceType: 'Practitioner',
    name: [
      {
        family: 'Huels',
        given: ['Tiesha', 'Doe'],
        prefix: ['Dr.'],
      },
    ],
  };
  const patientName = getUsersName(patient);
  expect(patientName).toBe('Tiesha Doe Huels');
});
