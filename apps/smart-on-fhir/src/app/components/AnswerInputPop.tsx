import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import Popover from 'nav-frontend-popover';

interface IProps {
  linkId: string;
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

export const AnswerInputPop: React.FC<IProps> = ({
  linkId,
  answers,
  setAnswers,
}) => {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [valueList, setValueList] = useState<string[]>([]);
  const [anker, setAnker] = useState(undefined);

  const [dataElements] = useState([
    'F41.9: Uspesifisert angstlidelse',
    'F50: Spiseforstyrrelser',
    'F84.0: Barneautisme',
    'F93.1: Fobisk angstlidelse i barndommen',
    'R53: Uvelhet og tretthet',
    'R63.0: Anoreksi',
    // Et utvalg av diagnoser fra https://finnkode.ehelse.no/#icd10/0/0/0/-1 (koder fra ICD-10)
  ]);

  const handleOnChange = (e: any) => {
    console.log('Input: ', e.target.value);
    setInputValue(e.target.value);
  };

  const handleOnFocus = (e: any) => {
    setAnker(e.currentTarget);
  };

  const handleAddElement = (e: any) => {
    const copiedAnswers = new Map(answers);
    if (valueList.length > 1) {
      copiedAnswers.set(linkId, '[' + valueList.toString() + ']');
    } else {
      copiedAnswers.set(linkId, valueList.toString());
    }
    setAnswers(copiedAnswers);
    setInputValue(''); // Tømmer inputfeltet for tekst
  };

  const handleChooseElement = (e: any, element: string) => {
    if (!valueList.includes(element)) {
      setValueList((prevState) => [...prevState, element]);
    }
    console.log('Ch: ', e.target.innerHTML);
    setInputValue(e.target.innerHTML);
    setAnker(undefined);
  };

  const displayElement = (element: string) => {
    console.log('Display E: ', element);
    console.log('Display I: ', inputValue);
    if (
      element.toLowerCase().includes(inputValue.toLowerCase()) &&
      !valueList.includes(element)
    ) {
      return (
        <Flatknapp
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
          }}
          onClick={(e: any) => {
            handleChooseElement(e, element);
          }}
        >
          {element}
        </Flatknapp>
      );
    }
    return <></>;
  };

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
          orientering="under-venstre"
          autoFokus={false}
          utenPil
        >
          {dataElements.map((dataElem: string) => {
            return displayElement(dataElem);
          })}
        </Popover>
        <Knapp mini style={{ marginLeft: '10px' }} onClick={handleAddElement}>
          Legg til
        </Knapp>
      </div>
    </>
  );
};
