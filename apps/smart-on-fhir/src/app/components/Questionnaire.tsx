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

  return (
    <>
      {questionnaire.item.map((value) => (
        <div key={value.linkId}>
          <p>{value.text}</p>
          {/* TODO: Trekke ut <ItemAnswer/> til flere komponenter basert på ønsket inputtype */}
          <ItemAnswer
            linkId={value.linkId}
            answerType={value.type}
            answers={answers}
            setAnswers={setAnswers}
          />
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
