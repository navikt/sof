import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Input, Label } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';

//Forventa argumenter:
//entity: object
//helptext: string

const InputItem = (props: any) => {
  const [inputValue, setInputValue] = useState('');
  const [tempValueList, setTempValueList] = useState<string[]>([]);
  const [anker, setAnker] = useState(undefined);

  const [exampleElements] = useState([
    'F41.9: Uspesifisert angstlidelse',
    'F50: Spiseforstyrrelser',
    'F50.0: Anorexia nervosa',
    'F50.2: Bulimia nervosa',
    'F84.0: Barneautisme',
    'F93.1: Fobisk angstlidelse i barndommen',
    'R53: Uvelhet og tretthet',
    'R63.0: Anoreksi',
    // Et utvalg av diagnoser fra https://finnkode.ehelse.no/#icd10/0/0/0/-1 (koder fra ICD-10)
  ]);
  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleOnFocus = (e: any) => {
    // Viser popovervinduet når inputfeltet er fokusert
    setAnker(e.currentTarget);
  };

  const handleAddElement = () => {
    // Legger til valgt element i listen over valgte elementer
    if (!tempValueList.includes(inputValue)) {
      setTempValueList((prevState) => [...prevState, inputValue]);
    }
  };

  const handleChooseElement = (e: any) => {
    // Setter valgt element som inputfelttekst
    setInputValue(e.target.innerHTML);
    setAnker(undefined);
  };

  const displayElements = (element: string) => {
    // Sammenligner elementene med inputfeltteksten && sjekker om elementet allerede er valgt
    const tempAnswer = props.answers.get(props.entity.linkId);
    if (
      element.toLowerCase().includes(inputValue.toLowerCase()) &&
      (tempAnswer === undefined ||
        (typeof tempAnswer === 'string' && !tempAnswer.includes(element)))
    ) {
      return (
        <Flatknapp
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
          }}
          mini
          onClick={handleChooseElement}
        >
          {element}
        </Flatknapp>
      );
    }
    return <></>;
  };

  useEffect(() => {
    // Formaterer listen slik at inputsvarene kan tolkes av answerToJson.ts
    const copiedAnswers = new Map(props.answers);
    if (tempValueList.length > 1) {
      copiedAnswers.set(
        props.entity.linkId,
        '[' + tempValueList.toString() + ']'
      );
    } else {
      copiedAnswers.set(props.entity.linkId, tempValueList.toString());
    }
    props.setAnswers(copiedAnswers);
    setInputValue(''); // Tømmer inputfeltet for tekst
  }, [tempValueList]);

  return (
    <>
      {props.helptext !== '' ? (
        <div className="componentItems">
          <Input
            bredde="fullbredde"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            value={inputValue}
            label={
              <div style={{ display: 'flex' }}>
                {props.entity.text}
                <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            }
          />
          <Popover
            ankerEl={anker}
            onRequestClose={() => setAnker(undefined)}
            orientering={PopoverOrientering.UnderVenstre}
            autoFokus={false}
            utenPil
          >
            {exampleElements.map((dataElem: string, index: number) => {
              return (
                <div key={props.entity.linkId + index}>
                  {displayElements(dataElem)}
                </div>
              );
            })}
          </Popover>
          <Knapp mini style={{ marginLeft: '10px' }} onClick={handleAddElement}>
            Legg til
          </Knapp>
        </div>
      ) : (
        <div className="componentItems">
          <Input
            label={props.entity.text}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            value={inputValue}
          />
          <Popover
            ankerEl={anker}
            onRequestClose={() => setAnker(undefined)}
            orientering={PopoverOrientering.UnderVenstre}
            autoFokus={false}
            utenPil
          >
            {exampleElements.map((dataElem: string, index: number) => {
              return (
                <div key={props.entity.linkId + index}>
                  {displayElements(dataElem)}
                </div>
              );
            })}
          </Popover>
          <Knapp mini style={{ marginLeft: '10px' }} onClick={handleAddElement}>
            Legg til
          </Knapp>
        </div>
      )}
      <p>
        <b>{props.answers.get(props.entity.linkId)}</b>
      </p>
    </>
  );
};

export default InputItem;