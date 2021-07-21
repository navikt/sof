import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './app/app';
import { FhirContextProvider } from './app/context/fhirContext';
import { LandingPage } from './app/LandingPage';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <FhirContextProvider>
        {/*<App />*/}
        <Route path="/skjema" component={App} exact />
      </FhirContextProvider>
      <Route path="/" component={LandingPage} exact />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
