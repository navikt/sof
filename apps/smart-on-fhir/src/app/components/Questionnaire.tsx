import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */

type callFromApp = {
  createHeader: (title: string, description: string) => void;
};

export const Questionnaire: FC<callFromApp> = (props) => {
  const questionnaire = questionnairePleiepenger;
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { patient, user } = useFhirContext();
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(
    new Map()
  );
  const response = questionnaireResponse;

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
      //console.log('C: ', itemChild);
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

  useEffect(() => {
    props.createHeader(questionnaire.title, questionnaire.description);
    console.log(questionnaire.title);
    console.log(questionnaire.description);
  }, [questionnaire]);

  return (
    <>
      {questions.map((item: any) => {
        let mainItem: any;
        let subItems: any[] = [];
        //console.log(item.linkId, item.item);
        if (
          !item.linkId.includes('automatic') &&
          !item.linkId.includes('help') &&
          !item.linkId.includes('.')
        ) {
          mainItem = item;
          if (item.item !== undefined) {
            item.item.map((entityItem: any) => {
              subItems.push(entityItem);
              //console.log('Questionnaire: Item:', item.linkId);
              //console.log('Questionnaire: entityItem:', entityItem.linkId);
            });
          } else if (item.answerOption) {
            mainItem = item;
          }

          /*
          console.log(
            'Kommet gjennom første if-testen:',
            item.linkId,
            item.item,
            item.answerOption
          );
          */
          return (
            <ItemAnswer
              entity={mainItem}
              entityItems={subItems}
              answers={answers}
              setAnswers={setAnswers}
            />
          );
        }
        return;
      })}
      <Knapp
        className="buttons"
        onClick={() => saveAnswers(answers, response, patient, user)}
      >
        Lagre skjema
      </Knapp>
      <Hovedknapp
        className="buttons"
        onClick={() => console.log('Trykket på send')}
      >
        Send skjema
      </Hovedknapp>

      {console.log('A:', answers)}
    </>
  );
};
