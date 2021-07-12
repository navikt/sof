import styles from './app.module.css';
import { Questionnaire } from './components/Questionnaire';
import Stegindikator from 'nav-frontend-stegindikator';
import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <>
      <header className="nav-header"></header>
      <div className="titleContainer">
        <h1 className="tittel">Legeerklæring: pleiepenger for sykt barn</h1>
        <div className="stegindikator">
          <Stegindikator
            steg={[
              { label: 'Tilstandsvurdering', index: 1 },
              { label: 'Definer pleiebehov', index: 2, aktiv: true },
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
      </div>
    </>
  );
}

export default App;
