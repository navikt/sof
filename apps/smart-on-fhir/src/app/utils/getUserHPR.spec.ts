import { fhirclient } from 'fhirclient/lib/types';
import { getUserHPR } from './getUserHPR';

test('it should get a users HPR number', async () => {
  const practitioner: fhirclient.FHIR.Practitioner = {
    resourceType: 'Practitioner',
    name: [
      {
        family: 'Huels',
        given: ['Tiesha', 'Doe'],
        prefix: ['Dr.'],
      },
    ],
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '330' },
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '450' },
    ],
  };
  const practitionerHPR = getUserHPR(practitioner);
  expect(practitionerHPR).toBe('330');
});
