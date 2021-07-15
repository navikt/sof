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
    console.log('C: ', loading);
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

  useEffect(() => {
    getItemChildren(questionnaire);
    setLoading(false);
  }, [loading]);

  return (
    <>
      {questions.map((item: any) => {
        return (
          <div key={item.linkId}>
            <p>{item.text}</p>
            {/*helptext(item)*/}
            <ItemAnswer
              linkId={item.linkId}
              answerType={item.type}
              answers={answers}
              setAnswers={setAnswers}
            />
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
