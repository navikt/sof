import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import QuestionnaireLinks from './components/QuestionnaireLinks';

export const LandingPage = () => {
  return (
    <div>
      <div className="app-container">
        <div className="questionnairesContainer">
          <Sidetittel style={{ marginBottom: '50px' }}>Skjemaer</Sidetittel>
          <div>
            <div className="listOfLinks">
              <Link className="questionLink" to="/skjema/pleiepengeskjema">
                <QuestionnaireLinks
                  title={'Legeerklæring: pleiepenger for sykt barn'}
                  status={true}
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema/vacation">
                <QuestionnaireLinks
                  title={'Vacation'}
                  status={true}
                ></QuestionnaireLinks>
              </Link>
              <Link className="questionLink" to="/skjema/arbeidsuførerklæring">
                <QuestionnaireLinks
                  title={'Legeerklæring ved arbeidsuførhet'}
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
