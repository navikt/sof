import React, { useState } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp } from 'nav-frontend-knapper';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = () => {
  const questionnaire = questionnairePleiepenger;

  // TODO: flytte variablene til et annet komponent (QuestionnaireResponse)?
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const response = questionnaireResponse;

  /**
   * Function to save answers in the json file.
   * TODO: Flytte metoden til et annet komponent (QuestionnaireResponse)?
   */
  const saveAnswers = () => {
    answers.forEach((value, key) => {
      const item = response.item.find((e) => e.linkId === key)
        ? response.item.find((e) => e.linkId === key)
        : null;
      if (item) {
        item.answer[0].valueString = value;
      }
    });
    //console.log('R: ', response); // Logs the json file
  };

  const checkChildrenItems = (data: any) => {
    while ('item' in data) {
      console.log('Item: ', data.item);
    }
    console.log('Item end');
  };

  // Displaying helptext if exists
  const helptext = (item: any) => {
    let text = '';
    console.log('H', item);
    if ('item' in item) {
      console.log('H', true);
      item.item?.map((itemChild: any) => {
        console.log('H', itemChild.text);
        text = itemChild.text;
      });
    }
    console.log('H: end');
    return <h1>{text}</h1>;
  };

  return (
    <>
      {questionnaire.item.map((item) => (
        <div key={item.linkId}>
          <p>{item.text}</p>
          {helptext(item)}
          {/* TODO: Trekke ut <ItemAnswer/> til flere komponenter basert på ønsket inputtype */}
          <ItemAnswer
            linkId={item.linkId}
            answerType={item.type}
            answers={answers}
            setAnswers={setAnswers}
          />
        </div>
      ))}
      {/*console.log(checkChildrenItems(questionnaire))*/}
      {
        // TODO: Flytte metoden til et annet komponent (QuestionnaireResponse)?
        <Hovedknapp button-general onClick={saveAnswers}>
          Lagre
        </Hovedknapp>
      }
      {console.log('A:', answers)}
    </>
  );
};
