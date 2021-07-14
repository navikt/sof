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

  // Checking if item has more items. FUNKER IKKE å skrive ut på nettsiden :((
  const isItemChild = (item: any) => {
    console.log('C: ', item);
    if ('item' in item) {
      item.item?.map((itemChild: any) => {
        isItemChild(itemChild);
      });
    }
    console.log('C: end');
    return false;
  };

  // Displaying helptext if exists. Antar at hjelpetekst er i nivå 2 i Questionnaire
  const helptext = (item: any) => {
    let text: string = '';
    if ('item' in item) {
      item.item?.map((itemChild: any) => {
        // Sjekker at ønsket tekst er en hjelpetekst ved å sjekke linkId
        if (itemChild.linkId.includes('help')) {
          text = itemChild.text;
        }
      });
      return <h1>{text}</h1>;
    }
    return <></>;
  };

  return (
    <>
      {questionnaire.item.map((item) => (
        <div key={item.linkId}>
          <p>{item.text}</p>
          {/*helptext(item)*/}
          <ItemAnswer
            linkId={item.linkId}
            answerType={item.type}
            answers={answers}
            setAnswers={setAnswers}
          />
          {isItemChild(item)}
        </div>
      ))}
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
