import { Questionnaire } from './components/Questionnaire';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import { BannerHeader } from './components/BannerHeader';

export const App = () => {
  const [questionnareTitle, setTitle] = useState('');
  const [questionDescription, setDesc] = useState('');

  const createHeader = (title: string, description: string) => {
    setTitle(title);
    setDesc(description);
  };

  return (
    <div className="app-container">
      <div>
        <div className="banner-container">
          <BannerHeader />
        </div>

        <div className="titleContainer">
          <Sidetittel className="tittel">{questionnareTitle}</Sidetittel>
        </div>
        <div className="main-body">
          <div className="ingress">
            <Ingress>{questionDescription}</Ingress>
          </div>
          <Questionnaire createHeader={createHeader} />
        </div>
      </div>
    </div>
  );
};

export default App;
