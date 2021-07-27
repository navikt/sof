import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import QuestionnaireLinks from './components/questionnaireLinks';

export const LandingPage = () => {
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
