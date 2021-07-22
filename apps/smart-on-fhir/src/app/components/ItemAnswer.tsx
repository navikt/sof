import React, { FC, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Radio } from 'nav-frontend-skjema';
import './questionnaireStylesheet.css';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import TextareaItem from '../items/TextareaItem';
import InputItem from '../items/InputItem';

interface IProps {
  entity: any;
  entityItems: any[];
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
  entity,
  entityItems,
  answers,
  setAnswers,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [inputStartDate, setStartDate] = useState('dd.mm.åååå');
  const [inputEndDate, setEndDate] = useState('dd.mm.åååå');

  const handleOnChange = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, e.target.value);
    setAnswers(copiedAnswers);
    setInputValue(e.target.value);
  };

  const handleOnChecked = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, e.target.checked);
    setAnswers(copiedAnswers);
  };

  const BasicDatepicker = () => {
    //    const [date, setDate] = useState('');
    const [inputStartDate, setStartDate] = useState('dd.mm.åååå');

    return <Datepicker onChange={setStartDate} value={inputStartDate} />;
  };

  //Method: fetch and save input dates to array
  const handleDateInput = (e: any) => {
    if (entityItems[0].text === 'Start') {
      setStartDate(e);
      console.log(inputStartDate);
    } else if (entityItems[1].text === 'Slutt') {
      setEndDate(e);
      console.log(inputEndDate);
    }
  };

  // TODO: create a method that updates answers when a radio button is clicked

  const testArray: Array<string> = ['Ja', 'Nei'];

  if (entity != undefined) {
    console.log(
      'Kommer fra ItemAnswer. LinkId:',
      entity.linkId,
      'type til hoved:',
      entity.type
    );
    if (entityItems != undefined) {
      entityItems.forEach((item) =>
        console.log('Hver item:', item.linkId, 'type: ', item.type)
      );
    }
  }

  return (
    <>
      {entityItems[0] != undefined && entityItems[0].linkId.includes('help') ? (
        <div>
          <TextareaItem
            question={entity.text}
            helptext={entityItems[0].text}
          ></TextareaItem>
        </div>
      ) : entityItems[0] != undefined && entityItems[0].linkId.includes('.') ? (
        <>
          {' '}
          <div>
            <Undertittel> {entity.text} </Undertittel>
            {entityItems.map((item, id) => (
              <TextareaItem question={item.text}></TextareaItem>
            ))}
          </div>
        </>
      ) : (
        <>
          {' '}
          <InputItem question={entity.text}></InputItem>{' '}
        </>
      )}
    </>
  );
};
