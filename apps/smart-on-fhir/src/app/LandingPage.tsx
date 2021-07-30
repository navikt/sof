import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import { useFhirContext } from './context/fhirContext';
import QuestionnaireLinks from './components/QuestionnaireLinks';
import { setQuestionnaireContext } from './utils/setQuestionnaireContext';
import pleipengeskjema from './json-files/questionnairePleiepenger.json';
import vacation from './json-files/questionnaireVacation.json';
import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';

export const LandingPage = () => {
  const { setQuestionnaire, client } = useFhirContext();

  return (
    <div>
      <div className="app-container">
        <div className="questionnairesContainer">
          <Sidetittel style={{ marginBottom: '50px' }}>Skjemaer</Sidetittel>
          <div>
            <div className="listOfLinks">
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Legeerklæring: pleiepenger for sykt barn'}
                  status={true}
                  handleClick={() =>
                    setQuestionnaireContext(
                      'pleiepengeskjema',
                      '1.0.0',
                      setQuestionnaire,
                      client,
                      pleipengeskjema as unknown as IQuestionnaire
                    )
                  }
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Vacation'}
                  status={true}
                  handleClick={() =>
                    setQuestionnaireContext(
                      'vacation',
                      '1.0.0',
                      setQuestionnaire,
                      client,
                      vacation as unknown as IQuestionnaire
                    )
                  }
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema">
                <QuestionnaireLinks
                  title={'Søknad om grunnstønad'}
                  status={false}
                  handleClick={() =>
                    setQuestionnaireContext(
                      'pleiepengeskjema',
                      '1.0.0',
                      setQuestionnaire,
                      client,
                      vacation as unknown as IQuestionnaire
                    )
                  }
                ></QuestionnaireLinks>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
