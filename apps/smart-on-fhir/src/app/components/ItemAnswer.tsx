import React, { FC, useState, useEffect } from 'react';
import './questionnaireStylesheet.css';
<<<<<<< HEAD
import { Datepicker, isISODateString } from 'nav-datovelger';
import Panel from 'nav-frontend-paneler';
=======
import TextareaItem from './items/TextareaItem';
import InputItem from './items/InputItem';
import CheckboxItem from './items/CheckboxItem';
import DateItem from './items/DateItem';
import RadiobuttonItem from './items/RadiobuttonItem';
>>>>>>> main

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
<<<<<<< HEAD
  const [inputValue, setInputValue] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [inputStartDates, setStartDate] = useState<string[]>([]);
  const [inputEndDates, setEndDate] = useState<string[]>([]);
=======
  let itemHelptext = '';
  const arrayOfItems: Array<string> = [];
  const [enableWhen, setEnableWhen] = useState(true); // True as default, in order to render questions from Questionnaire
>>>>>>> main

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

<<<<<<< HEAD
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
=======
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
>>>>>>> main

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
<<<<<<< HEAD
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
=======
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
>>>>>>> main
      ) : (
        <></>
      )}
    </>
  );
};
