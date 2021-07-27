import React, { FC, useState, useEffect } from 'react';
import './questionnaireStylesheet.css';
import TextareaItem from './items/TextareaItem';
import CheckboxItem from './items/CheckboxItem';
import DateItem from './items/DateItem';
import InputItem from './items/InputItem';
import RadiobuttonItem from './items/RadiobuttonItem';

interface IProps {
  entity: itemType;
  entityItems: itemType[];
  optionItems: answerOptionType[];
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
  optionItems,
  answers,
  setAnswers,
}) => {
  let itemHelptext = '';
  const arrayOfItems: Array<string> = [];
  const [enableWhen, setEnableWhen] = useState(true); // True as default, in order to render questions from Questionnaire

  if (entityItems != undefined && entity.answerOption == undefined) {
    // If there is a help text or subquestions, set these
    entityItems.forEach((element) => {
      if (element.linkId.includes('help')) {
        itemHelptext = element.text;
      } else if (element.linkId.includes('.')) {
        arrayOfItems.push(element.text);
      }
    });
  } else if (entity.answerOption != undefined) {
    // Set the values for the radio buttons
    optionItems.forEach((element) => {
      arrayOfItems.push(element.valueCoding.display);
    });
  }

  const itemProps = {
    entity: entity,
    helptext: itemHelptext,
    answers: answers,
    setAnswers: setAnswers,
  };

  const renderSwitch = () => {
    switch (entity.type) {
      case 'text':
        return 'text';
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
    }
  };

  useEffect(() => {
    // Check if displaying enableWhen-items from Questionnaire
    if (entity.enableWhen) {
      if (
        answers.get(entity.enableWhen[0].question) ===
        entity.enableWhen[0].answerCoding.code
      ) {
        setEnableWhen(true);
      } else {
        setEnableWhen(false);
      }
    }
  }, [answers]);

  return (
    <>
      {/* Displays the items in the same order as in Questionnaire.json */}
      {enableWhen ? (
        {
          text: <TextareaItem {...itemProps} />,
          string: <InputItem {...itemProps} />,
          boolean: <CheckboxItem {...itemProps} answeroptions={arrayOfItems} />,
          date: <DateItem {...itemProps} answeroptions={arrayOfItems} />,
          radio: (
            <RadiobuttonItem {...itemProps} answeroptions={arrayOfItems} />
          ),
          nothing: <></>,
        }[renderSwitch()]
      ) : (
        <></>
      )}
    </>
  );
};
