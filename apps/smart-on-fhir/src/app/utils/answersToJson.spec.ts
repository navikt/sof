import { IPatient, HumanNameUseKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import { saveAnswers } from './answersToJson';
import { fhirclient } from 'fhirclient/lib/types';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import dummyQRPleiepenger from '../json-files/dummyQRPleiepenger.json';

test('it should create a json object with the correct values', async () => {
  const response = questionnaireResponse;
  const filledOutFile = saveAnswers(answers, response, patient, user);
  expect(filledOutFile).toEqual(dummyQRPleiepenger);
});

const user: fhirclient.FHIR.Practitioner = {
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

const answers = new Map<string, string | boolean>([
  ['1', 'Diagnoser'],
  ['2.1', '2021-02-30'],
  ['2.2', '2019-05-12'],
  ['3', 'Funk nivå'],
  ['4', 'Behov'],
  ['5.1', '2000-05-04'],
  ['5.2', '2010-03-06'],
  ['6.1', false],
  ['6.2', true],
  ['6.3', false],
  ['7', ''],
  ['7.1', 'Situasjonen'],
  ['8', ''],
  ['8.1', '12345678901'],
  ['8.2', '12345678901'],
  ['8.3', '12345678901'],
  ['9', ''],
  ['10', 'Beskrivelse'],
]);

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
      value: '999168513',
    },
  ],
};
