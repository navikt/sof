import React, { FC, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Radio } from 'nav-frontend-skjema';
import './questionnaireStylesheet.css';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4';

interface IProps {
  entity: any;
  entityItem: any;
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
  entityItem,
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
    if (entityItem.text === 'Start') {
      setStartDate(e);
      console.log(inputStartDate);
    } else if (entityItem.text === 'Slutt') {
      setEndDate(e);
      console.log(inputEndDate);
    }
  };

  // TODO: create a method that updates answers when a radio button is clicked

  const testArray: Array<string> = ['Ja', 'Nei'];
  /* 
if (entity != undefined) {
  console.log('Kommer fra ItemAnswer. LinkId:', entity.linkId);
  if (entityItem != undefined) {
    console.log(
      'ItemAnswer: Skriver ut entityItem for id:',
      entityItem.linkId
    );
  }
}
*/

  return (
    <>
      {entityItem != undefined && entityItem.linkId.includes('help') ? (
        <div>
          <span
            className="typo-undertittel"
            id="mitt-faguttrykk"
            aria-describedby="min-hjelpetekst"
          >
            {entity.text}
          </span>
          <Hjelpetekst
            id="min-hjelpetekst"
            aria-labelledby="mitt-faguttrykk"
            style={{ marginLeft: '10px' }}
          >
            {entityItem.text}
          </Hjelpetekst>
        </div>
      ) : entity ? (
        <p className="typo-undertittel">{entity.text}</p>
      ) : entityItem != undefined && entityItem.linkId.includes('.') ? (
        <div>
          <p className="typo-undertittel">{entityItem.text}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
