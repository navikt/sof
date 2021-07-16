import { fhirclient } from 'fhirclient/lib/types';
import { getUserName } from './getUserName';

test('it should get a users name', async () => {
  const practitioner: fhirclient.FHIR.Practitioner = {
    resourceType: 'Practitioner',
    name: [
      {
        family: 'Huels',
        given: ['Tiesha', 'Doe'],
        prefix: ['Dr.'],
      },
    ],
  };
  const practitionerName = getUserName(practitioner);
  expect(practitionerName).toBe('Tiesha Doe Huels');
});
