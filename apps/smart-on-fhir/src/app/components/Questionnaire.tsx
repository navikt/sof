import React, { useState, useEffect } from 'react';
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
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const response = questionnaireResponse;

  /**
   * Function to save answers in the json file.
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

  // Utkast til logikken for å hente hjelpetekst
  const getHelptext = (item: any) => {
    if (item.type === 'display') {
      if (item.linkId.includes('help')) {
        return <h1>{item.text}</h1>;
      }
    }
    return <></>;
  };

  // Get the items from the Questionnaire
  const getItemChildren = (q: any) => {
    q.item?.map((itemChild: any) => {
      console.log('C: ', itemChild);
      if (loading) {
        setQuestions((prevState) => [...prevState, itemChild]);
      }
      if (itemChild && typeof itemChild === 'object') {
        getItemChildren(itemChild);
      }
    });
  };

  // Laster spørsmålene fra Questionnaire til questions-listen
  useEffect(() => {
    getItemChildren(questionnaire);
    setLoading(false);
  }, [loading]);

  return (
    <>
      {questions.map((item: any) => {
        return (
          <div key={item.linkId}>
            {/* Foreløpig håndtering av hjelpetekst*/}
            {item.linkId.includes('help') ? (
              <h1>{item.text}</h1>
            ) : (
              <>
                <p>
                  {item.linkId} {item.text}
                </p>
                <ItemAnswer
                  linkId={item.linkId}
                  answerType={item.type}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </>
            )}
          </div>
        );
      })}

      <Hovedknapp button-general onClick={saveAnswers}>
        Lagre
      </Hovedknapp>

      {console.log('A:', answers)}
    </>
  );
};
