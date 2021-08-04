import { Questionnaire } from './components/Questionnaire';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { InputErrorContextProvider } from './context/inputErrorContext';
import { InfoIcon } from './logos/InfoIcon';

export const App = () => {
  const [questionnareTitle, setTitle] = useState('');
  const [questionDescription, setDesc] = useState('');
  const [loadingQuestionnaire, setLoadingQuestionnaire] =
    useState<boolean>(true);

  const createHeader = (title: string, description: string) => {
    setTitle(title);
    setDesc(description);
  };

  return (
    <InputErrorContextProvider>
      <div className="app-container">
        <div className="content-container">
          {!loadingQuestionnaire ? (
            <div className="titleContainer">
              <Veilederpanel
                fargetema="info"
                type={'plakat'}
                kompakt
                svg={
                  <div className="informationIcon">
                    <InfoIcon />
                  </div>
                }
              >
                <Normaltekst>{questionDescription}</Normaltekst>
                <Normaltekst>
                  <br />
                  Vi spør stort sett bare om informasjon som er nødvendig for å
                  behandle saken. Det vil si alle felter er i utgangspunkt
                  påkrevde og må fylles ut. Frivillige felt er markert med
                  "frivillig".
                </Normaltekst>
              </Veilederpanel>
            </div>
          ) : null}
          <div className="main-body">
            <Questionnaire
              createHeader={createHeader}
              loadingQuestionnaire={loadingQuestionnaire}
              setLoadingQuestionnaire={setLoadingQuestionnaire}
            />
          </div>
        </div>
      </div>
    </InputErrorContextProvider>
  );
};

export default App;
