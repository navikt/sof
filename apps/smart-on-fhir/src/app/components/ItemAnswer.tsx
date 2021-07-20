import React, { FC, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Radio } from 'nav-frontend-skjema';
import './questionnaireStylesheet.css';
import { Datepicker, isISODateString } from 'nav-datovelger';
import Panel from 'nav-frontend-paneler';

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
  const [answerOptions, setAnswerOptions] = useState([]);
  const [inputStartDates, setStartDate] = useState<string[]>([]);
  const [inputEndDates, setEndDate] = useState<string[]>([]);

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

  //Method: fetch and save input dates to array
  const handleDateInput = (e: any) => {
    if (question === 'Start') {
      setStartDate([...inputStartDates, e]);
      console.log(inputEndDates);
    } else if (question === 'Slutt') {
      setEndDate([...inputEndDates, e]);
    }
  };

  // TODO: create a method that updates answers when a radio button is clicked

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
      ) : answerType === 'date' && question === 'Slutt' ? (
        <div>
          <Datepicker value={'dd.mm.åååå'} onChange={handleDateInput} />
          <Panel style={{ maxWidth: '690px', marginTop: '20px' }}>
            Her kommer en liste med innleggelser
          </Panel>
        </div>
      ) : answerType === 'date' ? (
        <div>
          <Datepicker value={'dd.mm.åååå'} onChange={handleDateInput} />
        </div>
      ) : answerType === 'string' ? (
        <div style={{ display: 'flex' }}>
          <Input style={{ maxWidth: '690px' }} onChange={handleOnChange} />
          <Knapp mini style={{ marginLeft: '10px' }}>
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
          maxLength={0}
        ></Textarea>
      ) : (
        <></>
      )}
    </>
  );
};
