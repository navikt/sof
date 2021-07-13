import { Questionnaire } from './components/Questionnaire';
import Stegindikator from 'nav-frontend-stegindikator';
import { Knapp } from 'nav-frontend-knapper';
import { Close } from '@navikt/ds-icons';
import { Child } from '@navikt/ds-icons';
import Hvit from './logos/Hvit.svg';
import { Sidetittel } from 'nav-frontend-typografi';
import { Element } from 'nav-frontend-typografi';
import { oauth2 as SMART } from 'fhirclient';
import { useEffect, useState } from 'react';
import { getPatientName } from './utils/getPatientName';

export function App() {
  const [patientName, setPatientName] = useState<string>('');
  useEffect(() => {
    // Launch Page
    SMART.init({
      redirectUri: 'test.html',
      clientId: 'whatever',
      scope: 'launch/patient offline_access openid fhirUser',
      // WARNING: completeInTarget=true is needed to make this work in the codesandbox
      // frame. It is otherwise not needed if the target is not another frame or window
      // but since the entire example works in a frame here, it gets confused without
      // setting this!
      completeInTarget: true,
    }).then((client) => {
      console.log(
        'patient: ',
        client.patient
          .read()
          .then((patient) => setPatientName(getPatientName(patient)))
      );
      console.log(patientName);
      console.log(client.getState().serverUrl);
      console.log('patient id: ', client.getPatientId());
      console.log(client.getAuthorizationHeader());
    });
  });

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
                <Element id="child-name">{patientName}</Element>
              </th>
            </tr>
          </table>
        </div>
        <div id="close-container">
          <Close id="close-knapp"></Close>
          <p id="lukk">Lukk</p>
        </div>
        <div className="bandline"></div>
      </div>

      <div className="titleContainer">
        <Sidetittel className="tittel">
          Legeerklæring: pleiepenger for sykt barn
        </Sidetittel>
        <div className="stegindikator">
          <Stegindikator
            steg={[
              { label: 'Tilstandsvurdering', index: 1, aktiv: true },
              { label: 'Definer pleiebehov', index: 2, aktiv: false },
            ]}
            visLabel
          />
        </div>
      </div>
      <div className="main-body">
        <p>
          Legeerklæringen skal fylles ut av behandlende lege. Det er kun
          sykehusleger og leger i spesialisthelsetjenesten som kan skrive
          legeerklæring for pleiepenger for sykt barn.
          <br />
          <br /> NAV trenger tidsnære opplysninger for å behandle søknad om
          pleiepenger. Det innebærer at NAV trenger oppdaterte medisinske
          opplysninger for å vurdere om vilkårene for rett til pleiepenger er
          oppfylt.{' '}
        </p>
        <Questionnaire />
        <Knapp className="button-general"> Neste </Knapp>
      </div>
    </>
  );
}

export default App;
