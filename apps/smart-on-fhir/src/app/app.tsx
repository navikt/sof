import { Questionnaire } from './components/Questionnaire';
import Stegindikator from 'nav-frontend-stegindikator';
import { Knapp } from 'nav-frontend-knapper';
import { Close } from '@navikt/ds-icons';
import { Child } from '@navikt/ds-icons';
import Hvit from './logos/Hvit.svg';

export function App() {
  return (
    <>
      <div className="nav-header-container">
        <img className="logo" src={Hvit} alt="" />
        <div className="name-container">
          <Child id="child-logo" />
          <p className="child-name">Gry Telokk</p>
        </div>
        <div id="close-container">
          <Close id="close-knapp"></Close>
          <p id="lukk">Lukk</p>
        </div>
        <div className="bandline"></div>
      </div>
      <div className="titleContainer">
        <h1 className="tittel">Legeerklæring: pleiepenger for sykt barn</h1>
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
