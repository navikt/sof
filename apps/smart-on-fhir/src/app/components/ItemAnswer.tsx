import React, { FC, useState } from 'react';
import { FnrInput, Input, Textarea } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox, Radio } from 'nav-frontend-skjema';
import Popover from 'nav-frontend-popover';
import './questionnaireStylesheet.css';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

interface IProps {
  question: string;
  linkId: string;
  answerType: string | undefined;
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

/**
 * Renders an input field and handles changes in the field.
 * @param question: string, renders the question text
 * @param linkId: string, the linkId to the question
 * @param answers: a map containing the current answers in the input fields
 * @param setAnswers: the function to update answers
 * @returns an input field
 */
export const ItemAnswer: FC<IProps> = ({
  question,
  linkId,
  answerType,
  answers,
  setAnswers,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueList, setInputValueList] = useState<string[]>([]);
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
  const [answerOptions, setAnswerOptions] = useState([]);

  const handleOnClick = (e: any) => {
    //setInputValueList((prevState) => [...prevState, inputValue]);
    setInputValue(e.target.value);
    const copiedAnswers = new Map(answers);
    console.log('Handle: ', inputValueList);
    console.log('&&: ', inputValueList.includes(inputValue), inputValue);
    if (inputValueList.length > 1 && !inputValueList.includes(inputValue)) {
      copiedAnswers.set(linkId, '[' + inputValueList.toString() + ']');
    } else {
      copiedAnswers.set(linkId, inputValueList.toString());
    }
    setAnswers(copiedAnswers);
  };

  const handleOnChange = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, e.target.value);
    setAnswers(copiedAnswers);
    setInputValue(e.target.value);
  };

  const handleOnChecked = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, e.target.checked);
    setAnswers(copiedAnswers);
  };

  const handlePopoverInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log('W: ', e.target.value);
    if (e.target.value && !anker) {
      setAnker(e.currentTarget);
    } else if (!e.target.value) {
      setAnker(undefined);
    }
  };

  // TODO: make a method that updates answers when a radio button is clicked

  const testArray: Array<string> = ['Ja', 'Nei'];

  return (
    <>
      {answerType === 'boolean' ? (
        <div style={{ margin: '10px' }}>
          <Checkbox label={question}></Checkbox>
        </div>
      ) : answerType === 'choice' ? (
        <div>
          <Radio
            className="radio-button"
            label={testArray[0]}
            name="alternativ1"
          />
          <Radio
            className="radio-button"
            label={testArray[1]}
            name="alternativ2"
          />
        </div>
      ) : answerType === 'date' ? (
        <div>
          <DayPickerInput />
        </div>
      ) : answerType === 'integer' ? (
        <div>
          <FnrInput
            label="Fødselsnummer (11 siffer)"
            bredde="M"
            onValidate={(val) => setValid(val)}
          />
        </div>
      ) : answerType === 'string' ? (
        <div style={{ display: 'flex' }}>
          <Input
            style={{ maxWidth: '690px' }}
            onChange={handlePopoverInputChange}
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
              if (dataElem.toLowerCase().includes(inputValue.toLowerCase())) {
                return (
                  <button
                    onClick={() => {
                      setInputValue(dataElem);
                      if (!inputValueList.includes(dataElem)) {
                        setInputValueList((prevState) => [
                          ...prevState,
                          dataElem,
                        ]);
                      }
                      setAnker(undefined);
                    }}
                  >
                    {dataElem}
                  </button>
                );
              }
              return;
            })}
          </Popover>
          <Knapp mini style={{ marginLeft: '10px' }} onClick={handleOnClick}>
            Legg til
          </Knapp>
        </div>
      ) : answerType === 'text' ? (
        <Textarea
          label=""
          description={question}
          value={inputValue}
          style={{ maxWidth: '690px' }}
          onChange={handleOnChange}
        ></Textarea>
      ) : (
        <></>
      )}
    </>
  );
};

function setValid(val: boolean): void {
  throw new Error('Function not implemented.');
}
