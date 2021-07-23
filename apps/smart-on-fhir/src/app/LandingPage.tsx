import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';
import '@navikt/ds-css';
import './landingpageStylesheet.css';
import { HoyreChevron } from 'nav-frontend-chevron';
import EtikettBase, { EtikettFokus, EtikettInfo } from 'nav-frontend-etiketter';

export const LandingPage = () => {
  return (
    <div className="app-container">
      <BannerHeader />
      <Sidetittel style={{ marginBottom: '50px' }}>Skjemaer</Sidetittel>
      <div className="contentContainer">
        <table>
          <thead>
            <tr>
              <th style={{ width: '600px', textAlign: 'left' }}>Skjemanavn</th>
              <th style={{ width: '100px', textAlign: 'left' }}>Status</th>
              <th style={{ width: '80px', textAlign: 'left' }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/skjema">Legeerklæring: pleiepengeskjema</Link>
                {/* Husk at "to=.." må matche "path=.." i main.tsx*/}
              </td>
              <td>
                <EtikettInfo className="etiketter">Åpne ny</EtikettInfo>
              </td>
              <td className="chevron_td">
                <HoyreChevron></HoyreChevron>
              </td>
            </tr>
            <tr>
              <td>Henvisning til fysioterapeut</td>
              <td>
                <EtikettInfo className="etiketter">Åpne ny</EtikettInfo>
              </td>
              <td className="chevron_td">
                <HoyreChevron></HoyreChevron>
              </td>
            </tr>
            <tr>
              <td>Søknad om grunnstønad</td>
              <td>
                <EtikettFokus className="etiketter">Utkast</EtikettFokus>
              </td>
              <td className="chevron_td">
                <HoyreChevron></HoyreChevron>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
