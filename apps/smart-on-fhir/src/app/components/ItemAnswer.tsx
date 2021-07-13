import { Questionnaire_ItemTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4';
import React, { FC } from 'react';

interface IProps {
  linkId: string;
  answerType: string | undefined;
  answers: Map<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

/**
 * Renders an input field and handles changes in the field.
 * @param linkId: string, the linkId to the question
 * @param answers: a map containing the current answers in the input fields
 * @param setAnswers: the function to update answers
 * @returns an input field
 */
export const ItemAnswer: FC<IProps> = ({
  linkId,
  answerType,
  answers,
  setAnswers,
}) => {
  const handleOnChange = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, e.target.value);
    setAnswers(copiedAnswers);
  };

  const handleOnChecked = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, e.target.checked);
    setAnswers(copiedAnswers);
  };

  return (
    <>
      {answerType === 'boolean' ? (
        <input type="checkbox" onChange={handleOnChecked} />
      ) : answerType === 'date' ? (
        <input type="date" onChange={handleOnChange} />
      ) : answerType === 'string' ? (
        <input type="text" onChange={handleOnChange} />
      ) : answerType === 'text' ? (
        <textarea onChange={handleOnChange}></textarea>
      ) : answerType === 'integer' ? (
        <input type="number" onChange={handleOnChange} />
      ) : answerType === 'choice' ? (
        <input type="radio" onChange={handleOnChecked} />
      ) : (
        <></>
      )}
    </>
  );
};

//Få frem ulike input-typer:
//Itererer gjennom spørsmålene
//Finne "type"-defininsjon på hvert spm
//If type == kalender
//--> kalenderinuput
//if else type == checkbox
// --> chekcbox
//...

//OBSOBS! legge til "ype" som attributt i Questionnaire
