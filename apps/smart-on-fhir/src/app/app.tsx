import { Questionnaire } from './components/Questionnaire';
import Stegindikator from 'nav-frontend-stegindikator';
import { Knapp } from 'nav-frontend-knapper';
import { Child } from '@navikt/ds-icons';
import Hvit from './logos/Hvit.svg';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';
import { Element } from 'nav-frontend-typografi';
import { getPatientName } from './utils/getPatientName';
import { useFhirContext } from './context/fhirContext';
import { useEffect, useState } from 'react';
import { element } from 'prop-types';
import { TextareaControlled } from 'nav-frontend-skjema';

export function App() {
  const { patient } = useFhirContext();

  return (
    <>
      <div className="nav-header-container">
        <img className="logo" src={Hvit} alt="" />
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

      <div className="titleContainer">
        {/*TODO: generisk henting av tittel fra spørreskjema*/}
        <Sidetittel className="tittel">
          Legeerklæring: pleiepenger for sykt barn
        </Sidetittel>
      </div>
      <div className="main-body">
        <div className="ingress">
          {/*TODO: generisk henting av ingress fra spørreskjema*/}
          <Ingress>
            Legeerklæringen skal fylles ut av behandlende lege. Det er kun
            sykehusleger og leger i spesialisthelsetjenesten som kan skrive
            legeerklæring for pleiepenger for sykt barn.
            <br />
            <br /> NAV trenger tidsnære opplysninger for å behandle søknad om
            pleiepenger. Det innebærer at NAV trenger oppdaterte medisinske
            opplysninger for å vurdere om vilkårene for rett til pleiepenger er
            oppfylt.{' '}
          </Ingress>
        </div>
        <Questionnaire />
      </div>
    </>
  );
}

export default App;
