import { Questionnaire } from './components/Questionnaire';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';

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
        <div className="titleContainer">
          <Veilederpanel
            type={'plakat'}
            kompakt
            svg={
              <div className="informationIcon">
                <svg
                  width="50px"
                  height="62px"
                  viewBox="0 0 50 62   "
                  version="1.1"
                  focusable={false}
                >
                  <title>Informasjon</title>
                  <defs>
                    <path
                      d="M-1.13686838e-13,8.16516634 L-1.13686838e-13,45.2231666 C-1.13686838e-13,46.5524398 1.06545967,47.630137 2.38031085,47.630137 L34.2506632,47.630137 C35.56417,47.630137 36.6296296,46.5524398 36.6296296,45.2231666 L36.6296296,2.40697042 C36.6296296,1.07769721 35.56417,0 34.2506632,0 L8.81824417,0 L-1.13686838e-13,8.16516634 Z"
                      id="infoIcon-path-1"
                    />
                  </defs>
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g transform="translate(2.000000, 0.000000)">
                      <g>
                        <g>
                          <path
                            d="M43.01,5.01369863 L2.9882963,5.01369863 C1.33655556,5.01369863 -3.55271368e-15,6.33971219 -3.55271368e-15,7.97802684 L-3.55271368e-15,58.0365158 C-3.55271368e-15,58.3420645 0.0468518519,58.6391725 0.133740741,58.9160232 C0.279407407,59.3810987 0.53837037,59.7955306 0.877407407,60.1323094 C0.943,60.1964577 1.01455556,60.2631382 1.09037037,60.3222222 C1.53077778,60.6851667 2.08107407,60.9215027 2.68162963,60.9839629 C2.78385185,60.9940916 2.88607407,61 2.9882963,61 L43.01,61 C44.6617407,61 46,59.6722983 46,58.0365158 L46,7.97802684 C46,6.33971219 44.6617407,5.01369863 43.01,5.01369863"
                            fill="#515658"
                          />
                          <g transform="translate(4.259259, 9.191781)">
                            <g>
                              <mask id="infoIconMask-2" fill="white">
                                <use xlinkHref="#infoIcon-path-1" />
                              </mask>
                              <g id="InfoIconMask" />
                              <g mask="url(#infoIconMask-2)" fill="#FFFFFF">
                                <g transform="translate(-5.426612, -6.804305)">
                                  <rect x="0" y="0" width="47" height="61" />
                                </g>
                              </g>
                            </g>
                            <path
                              d="M8.81824417,0 L8.81824417,5.68656763 C8.81824417,7.05571168 7.68403034,8.16516634 6.28433176,8.16516634 L0,8.16516634 L8.81824417,0 Z"
                              fill="#C9C9C9"
                            />
                            <g
                              transform="translate(1.356653, 6.804305)"
                              fill="#515658"
                            >
                              <g transform="translate(11.560000, 4.080000)">
                                <g>
                                  <polygon points="8.90953677 22.7047593 8.90953677 12.6552407 8.90953677 10.2 1.97114246 10.2 0 10.2 0 12.6552407 1.97114246 12.6552407 1.97114246 22.7047593 0 22.7047593 0 25.16 10.88 25.16 10.88 22.7047593" />
                                  <path d="M5.44,8.15933863 C7.6926309,8.15933863 9.52,6.3326309 9.52,4.08 C9.52,1.82670773 7.6926309,0 5.44,0 C3.18670773,0 1.36,1.82670773 1.36,4.08 C1.36,6.3326309 3.18670773,8.15933863 5.44,8.15933863" />
                                </g>
                              </g>
                            </g>
                          </g>
                          <path
                            d="M23.4271696,6.92906314 C22.9064641,6.92906314 22.4852564,6.50211404 22.4852564,5.97222466 C22.4852564,5.44233527 22.9064641,5.01285486 23.4271696,5.01285486 C23.9453878,5.01285486 24.3682537,5.44233527 24.3682537,5.97222466 C24.3682537,6.50211404 23.9453878,6.92906314 23.4271696,6.92906314 M29.2419913,3.01142552 L25.7380078,3.01142552 L25.7380078,2.35243887 C25.7380078,1.05302859 24.7024008,0 23.4271696,0 C22.1477928,0 21.1146732,1.05302859 21.1146732,2.35243887 L21.1146732,3.01142552 L17.6106897,3.01142552 C15.8835724,3.01142552 14.4814815,4.43824551 14.4814815,6.19666825 L14.4814815,10.0273973 L32.3703704,10.0273973 L32.3703704,6.19666825 C32.3703704,4.43824551 30.9691086,3.01142552 29.2419913,3.01142552"
                            fill="#2F3237"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            }
          >
            <Normaltekst>{questionDescription}</Normaltekst>
            <Normaltekst>
              <br />
              Vi spør stort sett bare om informasjon som er nødvendig for å
              behandle saken. Det vil si alle felt er i utgangspunktet påkrevde
              og må fylles ut. Frivillige felt er markert med "frivillig"
            </Normaltekst>
          </Veilederpanel>
        </div>
        <div className="main-body">
          <div className="ingress"></div>
          <Questionnaire createHeader={createHeader} />
        </div>
      </div>
    </div>
  );
};

export default App;
