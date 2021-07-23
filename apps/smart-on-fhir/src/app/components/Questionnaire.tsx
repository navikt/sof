import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';

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

  // Get the items from the Questionnaire
  const getItemChildren = (q: any) => {
    q.item?.map((itemChild: any) => {
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

  //Fetches the questionnaire's title and description
  useEffect(() => {
    props.createHeader(questionnaire.title, questionnaire.description);
    console.log(questionnaire.title);
    console.log(questionnaire.description);
  }, [questionnaire]);

  return (
    //Itererer gjennom alle spørsmålene (spørsmål = item) og filtrerer på spørsmålenes linkId.
    //Hovedspørsmålet legges som mainItem, og det tilhørende item-arrayet, eller answerOption,
    //pushes inn i subItems.
    <>
      {questions.map((item: any) => {
        let mainItem: any;
        let subItems: any[] = [];
        let radioOptions: string[] = [];
        if (
          !item.linkId.includes('automatic') &&
          !item.linkId.includes('help') &&
          !item.linkId.includes('.')
        ) {
          mainItem = item;
          //Hvis spørsmålet (item) har en item-array
          if (item.item !== undefined) {
            item.item.map((entityItem: any) => {
              subItems.push(entityItem);
            });
          } else if (item.answerOption) {
            item.answerOption.map((option: any) => {
              radioOptions.push(option);
            });
          }

          return (
            <ItemAnswer
              entity={mainItem}
              entityItems={subItems}
              radioOptionItems={radioOptions}
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
