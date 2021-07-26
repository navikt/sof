import React, { FC, useState } from 'react';
import './questionnaireStylesheet.css';
import TextareaItem from './items/TextareaItem';
import InputItem from './items/InputItem';
import CheckboxItem from './items/CheckboxItem';
import DatepickerItem from './items/DatepickerItem';
import RadiobuttonItem from './items/RadiobuttonItem';

interface IProps {
  entity: any;
  entityItems: any[];
  radioOptionItems: any[];
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
  radioOptionItems,
  answers,
  setAnswers,
}) => {
  const [inputValue, setInputValue] = useState('');

  let itemHelptext = '';
  const arrayOfItems: Array<string> = [];

  if (entityItems != undefined && entity.answerOption == undefined) {
    entityItems.forEach((element) => {
      if (element.linkId.includes('help')) {
        itemHelptext = element.text;
      } else if (element.linkId.includes('.')) {
        arrayOfItems.push(element.text);
      }
    });
  } else if (entity.answerOption != undefined) {
    radioOptionItems.forEach((element) => {
      arrayOfItems.push(element.valueCoding.display);
    });
  }

  const renderSwitch = () => {
    switch (entity.type) {
      case 'text':
        return 'text';
        break;
      case 'string':
        return 'string';
      case 'group':
        if (entityItems[1].type === 'boolean') {
          return 'boolean';
        } else if (entityItems[1].type === 'date') {
          return 'date';
        } else {
          return 'nothing';
        }
      case 'choice':
        return 'radio';
      default:
        return 'nothing';
        break;
    }
  };

  return {
    text: (
      <TextareaItem
        entity={entity}
        helptext={itemHelptext}
        answers={answers}
        setAnswers={setAnswers}
      ></TextareaItem>
    ),
    string: (
      <InputItem
        entity={entity}
        helptext={itemHelptext}
        answeroptions={arrayOfItems}
        answers={answers}
        setAnswers={setAnswers}
      ></InputItem>
    ),
    boolean: (
      <CheckboxItem
        entity={entity}
        helptext={itemHelptext}
        answeroptions={arrayOfItems}
        answers={answers}
        setAnswers={setAnswers}
      ></CheckboxItem>
    ),
    date: (
      <DatepickerItem
        entity={entity}
        helptext={itemHelptext}
        answeroptions={arrayOfItems}
        answers={answers}
        setAnswers={setAnswers}
      ></DatepickerItem>
    ),
    radio: (
      <RadiobuttonItem
        entity={entity}
        helptext={itemHelptext}
        answeroptions={arrayOfItems}
        answers={answers}
        setAnswers={setAnswers}
      ></RadiobuttonItem>
    ),
    nothing: <p></p>,
  }[renderSwitch()];
};
