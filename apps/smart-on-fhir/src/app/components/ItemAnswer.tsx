import React, { FC, useState } from 'react';
import './questionnaireStylesheet.css';
import {
  Checkbox,
  FnrInput,
  Input,
  Radio,
  Textarea,
} from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import validator from '@navikt/fnrvalidator';
import { useEffect } from 'react';

interface IProps {
  question: string;
  linkId: string;
  answerType: string | undefined;
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

const fnr = validator.fnr('12345678910');
const dnr = validator.dnr('52345678910');
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
        <input type="date" onChange={handleOnChange} />
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
