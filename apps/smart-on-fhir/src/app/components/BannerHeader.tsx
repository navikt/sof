import React from 'react';
import Hvit from '../logos/Hvit.svg';
import Person from '../logos/Person.svg';
import { Child } from '@navikt/ds-icons';
import { Element, Ingress } from 'nav-frontend-typografi';
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
          <div className="patientNameContainer">
            <img id="person-logo" src={Person} alt="Person" />
            <Ingress id="patient-name">{getPatientName(patient)}</Ingress>
          </div>
          <img className="nav-logo" src={Hvit} alt="Hvit NAV-logo" />
        </div>
        <div className="bandline"></div>
      </div>
    );
  } else {
    return (
      <div className="nav-header-container">
        <div></div>
        <div className="name-container">
          <div className="patientNameContainer">
            <img id="person-logo" src={Person} alt="Person" />
            <Ingress id="patient-name">{getPatientName(patient)}</Ingress>
          </div>
          <img className="nav-logo" src={Hvit} alt="Hvit NAV-logo" />
        </div>
        <div className="bandline"></div>
      </div>
    );
  }
};
