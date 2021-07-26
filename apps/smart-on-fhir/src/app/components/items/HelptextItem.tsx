import React, { FC } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface IProps {
  text: string;
}

export const HelptextItem: FC<IProps> = ({ text }) => {
  // Viser hjelpetekst-ikonet hvis det er hjelpetekst tilgjengelig
  return text !== '' ? (
    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>{text}</Hjelpetekst>
  ) : (
    <></>
  );
};
