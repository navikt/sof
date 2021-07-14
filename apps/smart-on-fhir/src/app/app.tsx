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
import { Checkbox } from 'nav-frontend-skjema';

export function App() {
  const { patient } = useFhirContext();
  const [steps, setSteps] = useState([
    { label: 'Tilstandsvurdering', index: 1, aktiv: true },
    { label: 'Definer pleiebehov', index: 2, aktiv: false },
  ]);

  //function of "neste"-button. This section will be moved to another file later - annvp
  /*const nextPage = (index) => {
    const current = steps.find((element) => element.index === index)?.aktiv;
    const nyListe = [...steps];
    if (nyListe.find((element) => element.index === index)?.aktiv) {
     nyListe.find((element) => element.index === index).aktiv? = !(nyListe.find((element) => element.index === index)?.aktiv)
    } 
    
    */

  const nextPage = () => {
    let fromIndex: number | undefined;
    //const fromIndex =  steps.find((element) => element.aktiv === true).index;
    if (steps.find((element) => element.aktiv === true)) {
      console.log('funnet en aktiv', element);
      fromIndex = steps.find((element) => element.aktiv === true)?.index;
      console.log('Her er indeksen til den aktive: ', fromIndex);
      if (fromIndex != undefined) {
        toggleReminder(fromIndex);
      }
    } else {
      console.log('Kunne ikke finne aktiv');
    }
  };

  const toggleReminder = (index: number) => {
    console.log('AAAAAAAAAAAAAAAAA', steps, 'Innsendt indeks: ', index);
    setSteps(
      steps.map((step) =>
        step.index === index || step.index === index + 1
          ? { ...step, aktiv: !step.aktiv }
          : step
      )
    );
  };
  useEffect(() => {
    console.log(
      'Step 1 sin aktiv: ',
      steps[0].aktiv,
      'Step 2 sin aktiv: ',
      steps[1].aktiv
    );
    console.log('BBBBBBBBBBBBBBBBBBBB', steps);
  });

  //setSteps(nyListe => );

  //steps.forEach(step => step.index === index ? {...steps, aktiv: !step.aktiv })

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
        <Sidetittel className="tittel">
          Legeerklæring: pleiepenger for sykt barn
        </Sidetittel>
        <div className="stegindikator">
          <Stegindikator steg={steps} visLabel />
        </div>
      </div>
      <div className="main-body">
        <div className="ingress">
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
        <Knapp onClick={nextPage} className="button-general">
          {' '}
          Neste{' '}
        </Knapp>
      </div>
    </>
  );
}

export default App;
