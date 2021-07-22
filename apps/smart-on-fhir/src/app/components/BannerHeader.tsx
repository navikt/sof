import React from 'react';
import Hvit from '../logos/Hvit.svg';
import { Child } from '@navikt/ds-icons';
import { Element } from 'nav-frontend-typografi';
import { useFhirContext } from '../context/fhirContext';
import { getPatientName } from '../utils/getPatientName';

export const BannerHeader = () => {
  const { patient } = useFhirContext();

  return (
    <div className="nav-header-container">
      <img className="logo" src={Hvit} alt="Hvit NAV-logo" />
      <div className="name-container">
        <table>
          <tr>
            <th>
              <Child id="child-logo" />
            </th>
            <th>
              <Element id="child-name">{getPatientName(patient)}</Element>
            </th>
          </tr>
        </table>
      </div>
      <div className="bandline"></div>
    </div>
  );
};
