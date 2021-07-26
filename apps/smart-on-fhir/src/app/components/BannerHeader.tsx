import React from 'react';
import Hvit from '../logos/Hvit.svg';
import { Child } from '@navikt/ds-icons';
import { Element } from 'nav-frontend-typografi';
import { useFhirContext } from '../context/fhirContext';
import { getPatientName } from '../utils/getPatientName';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';

export const BannerHeader = (props: { page: string }) => {
  const { patient } = useFhirContext();

  if (props.page === 'app') {
    return (
      <div className="nav-header-container">
        <Tilbakeknapp style={{ color: 'white' }} />
        <div className="name-container">
          <Child id="child-logo" />
          <Element id="child-name">{getPatientName(patient)}</Element>
          <img className="logo" src={Hvit} alt="Hvit NAV-logo" />
        </div>
        <div className="bandline"></div>
      </div>
    );
  } else {
    return (
      <div className="nav-header-container">
        <div></div>
        <div className="name-container">
          <Child id="child-logo" />
          <Element id="child-name">{getPatientName(patient)}</Element>
          <img className="logo" src={Hvit} alt="Hvit NAV-logo" />
        </div>
        <div className="bandline"></div>
      </div>
    );
  }
};
