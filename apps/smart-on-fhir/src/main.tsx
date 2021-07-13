import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { FhirContextProvider } from './app/context/fhirContext';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <FhirContextProvider>
        <App />
      </FhirContextProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
