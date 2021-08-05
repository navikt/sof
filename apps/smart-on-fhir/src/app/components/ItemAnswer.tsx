import React, { FC, useState, useEffect } from 'react';
import './questionnaireStylesheet.css';
import TextareaItem from './items/TextareaItem';
import CheckboxItem from './items/CheckboxItem';
import DateItem from './items/DateItem';
import InputItem from './items/InputItem';
import RadiobuttonItem from './items/RadiobuttonItem';
import { Undertittel } from 'nav-frontend-typografi';

interface IProps {
  entity: itemType;
  entityItems: itemType[];
  optionItems: answerOptionType[];
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
  saved: boolean;
}

/**
 * Renders an input field and handles changes in the field.
 * @param entity: of type itemType that includes all attributes of the question
 * @param entityItems: an array of itemType, used for items of helptext and subquestions
 * @param optionItems: array of answerOptionType, used for "answerOption" on questions of type Choice
 * @param setAnswers: the function to update answers
 * @returns an input field
 */
export const ItemAnswer: FC<IProps> = ({
  entity,
  entityItems,
  optionItems,
  answers,
  setAnswers,
  saved,
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
      case 'display':
        return 'header';
      case 'text':
        return 'text';
      case 'string':
        return 'string';
      case 'date':
        return 'date';
      case 'group':
        if (entityItems[0].type === 'boolean') {
          return 'boolean';
        } else if (entityItems[0].type === 'date') {
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
          text: <TextareaItem {...itemProps} saved={saved} />,
          string: <InputItem {...itemProps} saved={saved} />,
          boolean: (
            <CheckboxItem
              {...itemProps}
              answeroptions={arrayOfItems}
              saved={saved}
            />
          ),
          date: (
            <DateItem
              {...itemProps}
              answeroptions={arrayOfItems}
              saved={saved}
            />
          ),
          radio: (
            <RadiobuttonItem
              {...itemProps}
              answeroptions={arrayOfItems}
              saved={saved}
            />
          ),
          header: <Undertittel>{entity.text}</Undertittel>,
          nothing: <></>,
        }[renderSwitch()]
      ) : (
        <></>
      )}
    </>
  );
};
