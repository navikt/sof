import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';

export const LandingPage = () => {
  return (
    <div className="app-container">
      <BannerHeader />
      <Sidetittel>(Midlertidig) oversikt over utvalgte skjemaer</Sidetittel>
      <ul>
        <li>
          <Link to="/skjema">Legeerklæring: pleiepengeskjema</Link>
          {/* Husk at "to=.." må matche "path=.." i main.tsx*/}
        </li>
      </ul>
    </div>
  );
};
