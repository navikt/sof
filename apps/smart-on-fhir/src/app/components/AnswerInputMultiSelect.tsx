import React, { useState, useEffect } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import Popover, { PopoverOrientering } from 'nav-frontend-popover';

interface IProps {
  linkId: string;
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

export const AnswerInputMultiSelect: React.FC<IProps> = ({
  linkId,
  answers,
  setAnswers,
}) => {
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
    // Sammenligner elementene med inputfeltteksten && sjekker om elementet allerede er valgt og at det er i tekstformat
    const tempAnswer = answers.get(linkId);
    if (
      element.toLowerCase().includes(inputValue.toLowerCase()) &&
      typeof tempAnswer === 'string' &&
      !tempAnswer.includes(element)
    ) {
      return (
        <Flatknapp
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
          }}
          mini
          onClick={(e: any) => {
            handleChooseElement(e);
          }}
        >
          {element}
        </Flatknapp>
      );
    }
    return <></>;
  };

  useEffect(() => {
    // Formaterer listen slik at inputsvarene kan tolkes av answerToJson.ts
    const copiedAnswers = new Map(answers);
    if (tempValueList.length > 1) {
      copiedAnswers.set(linkId, '[' + tempValueList.toString() + ']');
    } else {
      copiedAnswers.set(linkId, tempValueList.toString());
    }
    setAnswers(copiedAnswers);
    setInputValue(''); // Tømmer inputfeltet for tekst
  }, [tempValueList]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input
          style={{ maxWidth: '690px' }}
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
          {exampleElements.map((dataElem: string) => {
            return displayElements(dataElem);
          })}
        </Popover>
        <Knapp mini style={{ marginLeft: '10px' }} onClick={handleAddElement}>
          Legg til
        </Knapp>
      </div>
      {/* Midlertidig visning av de valgte elementene */}
      <p>
        <b>{answers.get(linkId)}</b>
      </p>
    </>
  );
};
