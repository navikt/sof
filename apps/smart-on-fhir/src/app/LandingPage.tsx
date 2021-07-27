import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import { useFhirContext } from './context/fhirContext';
import { IBundle, IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import jsonQuestionnaire from './json-files/questionnairePleiepenger.json';
import { setUUIDIdentifier } from './utils/setIdentifier';
import { useEffect } from 'react';
import QuestionnaireLinks from './components/QuestionnaireLinks';


export const LandingPage = () => {
  const { questionnaire, setQuestionnaire, client } = useFhirContext();

  useEffect(() => {
    console.log('har satt questionnaire, det er: ', questionnaire);
  }, [questionnaire]);

  // Function to set the right questionnaire in the context when a link is clicked
  const handleClick = async (name: string, version: string) => {
    const response = (await client?.request(
      `Questionnaire?name=${name}&version=${version}`
    )) as IBundle;

    if (
      response.total &&
      response.total !== 0 &&
      response.entry &&
      setQuestionnaire
    ) {
      // If the questionnaire exist, save it in the context
      console.log('henter questionnaire');
      setQuestionnaire(response.entry[0].resource as IQuestionnaire);
      console.log('har hentet skjema');
    } else {
      // If not, save a questionnaire to the server and set this as the questionnaire in the contex
      console.log('lager nytt questionnaire');
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
  };

  return (
    <div>
      <div className="app-container">
        <BannerHeader page={''} />
        <div className="questionnairesContainer">
          <Sidetittel style={{ marginBottom: '50px' }}>Skjemaer</Sidetittel>
          <div>
            <div className="listOfLinks">
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Legeerklæring: pleiepenger for sykt barn'}
                  status={true}
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Henvisning til fysioterapeut'}
                  status={true}
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Søknad om grunnstønad'}
                  status={false}
                ></QuestionnaireLinks>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
