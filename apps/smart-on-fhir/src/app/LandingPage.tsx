import React from 'react';
import { Link } from 'react-router-dom';
import { BannerHeader } from './components/BannerHeader';
import { Sidetittel } from 'nav-frontend-typografi';

export const LandingPage = () => {
  return (
    <div className="app-container">
      <BannerHeader />
      <Sidetittel>Skjemaer</Sidetittel>
      <div className="contentContainer"></div>
    </div>
  );
};
