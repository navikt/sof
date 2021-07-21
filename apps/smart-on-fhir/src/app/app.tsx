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

export const App = () => {
  const { patient } = useFhirContext();
  const [questionnareTitle, setTitle] = useState('');
  const [questionDescription, setDesc] = useState('');

  const createHeader = (title: string, description: string) => {
    setTitle(title);
    setDesc(description);
  };

  return (
    <div className="app-container">
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
        <Sidetittel className="tittel">{questionnareTitle}</Sidetittel>
      </div>
      <div className="main-body">
        <div className="ingress">
          {/*TODO: generisk henting av ingress fra spørreskjema*/}
          <Ingress>{questionDescription}</Ingress>
        </div>
        <Questionnaire createHeader={createHeader} />
      </div>
    </div>
  );
};

export default App;
