import React, { FC, useState } from 'react';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { Checkbox, Radio, Textarea } from 'nav-frontend-skjema';
import Panel from 'nav-frontend-paneler';
import { AnswerInputPop } from './AnswerInputPop';
import './questionnaireStylesheet.css';

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
  const [inputStartDate, setStartDate] = useState('dd.mm.åååå');
  const [inputEndDate, setEndDate] = useState('dd.mm.åååå');

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

  const BasicDatepicker = () => {
    //    const [date, setDate] = useState('');
    const [inputStartDate, setStartDate] = useState('dd.mm.åååå');

    return <Datepicker onChange={setStartDate} value={inputStartDate} />;
  };

  //Method: fetch and save input dates to array
  const handleDateInput = (e: any) => {
    if (question === 'Start') {
      setStartDate(e);
      console.log(inputStartDate);
    } else if (question === 'Slutt') {
      setEndDate(e);
      console.log(inputEndDate);
    }
  };

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
          <BasicDatepicker /*onChange={handleDateInput}*/></BasicDatepicker>
        </div>
      ) : answerType === 'date' ? (
        <div>
          <BasicDatepicker /*onChange={handleDateInput}*/></BasicDatepicker>
        </div>
      ) : answerType === 'string' ? (
        <AnswerInputPop
          linkId={linkId}
          answers={answers}
          setAnswers={setAnswers}
        />
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
