import React from 'react';
import { Link } from 'react-router-dom';
import { useFhirContext } from './context/fhirContext';

export const LandingPage = () => {
  const { patient } = useFhirContext();
  return (
    <>
      <h1>(Midlertidig) oversikt over utvalgte skjemaer</h1>
      <Link to="/skjema">Legeerklæring: pleiepengeskjema</Link>
      {/* Husk at "to=.." må matche "path=.." i main.tsx*/}
    </>
  );
};
