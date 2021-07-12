import React, { FC } from 'react';

interface IProps {
  linkId: string;
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
export const ItemAnswer: FC<IProps> = ({ linkId, answers, setAnswers }) => {
  const handleOnChange = (e: any) => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, e.target.value);
    setAnswers(copiedAnswers);
  };

  return <input type="text" onChange={handleOnChange} />;
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
