import { IBundle, IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import Client from 'fhirclient/lib/Client';
import jsonQuestionnaire from '../json-files/questionnairePleiepenger.json';
import { setUUIDIdentifier } from './setIdentifier';

/**
 * Function to set the right questionnaire in the context when a link is clicked.
 * @param name The value to the name attribute in the questionnaire to render
 * @param version The value to the version attribute in the questionnaire to render
 * @param setQuestionnaire Function to set the questionnaire state in the fhir context
 * @param client The fhir client saved in the context
 */
export const setQuestionnaireContext = async (
  name: string,
  version: string,
  setQuestionnaire:
    | React.Dispatch<React.SetStateAction<IQuestionnaire | undefined>>
    | undefined,
  client: Client | undefined
) => {
  const response = (await client?.request(
    `Questionnaire?name=${name}&version=${version}&status=active`
  )) as IBundle;

  console.log('Client: ', client);

  if (client) {
    if (response.total !== 0 && response.entry && setQuestionnaire) {
      // If the questionnaire exist, save it in the context
      setQuestionnaire(response.entry[0].resource as IQuestionnaire);
    } else if (jsonQuestionnaire.status === 'active') {
      // If not, save a questionnaire to the server and set this as the questionnaire in the contex
      const headers = {
        'Content-Type': 'application/fhir+json',
        Accept: '*/*',
      };
      await client
        ?.request({
          url: `Questionnaire`,
          method: 'POST',
          body: JSON.stringify(jsonQuestionnaire),
          headers,
        })
        .then((response) => {
          setUUIDIdentifier(response);
          setQuestionnaire ? setQuestionnaire(response) : null;
        });
    }
  } else {
    // If the questionnaire json file is not active yet, it should not be used
    // We will currently set a default questionnaire to be used if we e.g. are
    // unable to connect to the server. This will allow us to see the questionnaire
    // in DIPS even though the functionality does not work correctly yet.
    setQuestionnaire
      ? setQuestionnaire(jsonQuestionnaire as unknown as IQuestionnaire)
      : null;
    console.log('Fant ikke et skjema');
  }
};
