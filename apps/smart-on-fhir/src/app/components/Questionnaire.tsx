import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponsePleiepenger.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import { saveQuestionnaire } from '../utils/saveQuestionnaire';
import { IPatient } from '@ahryman40k/ts-fhir-types/lib/R4';
import { fhirclient } from 'fhirclient/lib/types';
import Client from 'fhirclient/lib/Client';

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
  const { patient, user, client } = useFhirContext();
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

  // Saves questions from Questionnaire to the questions list
  useEffect(() => {
    getItemChildren(questionnaire);
    setLoading(false);
  }, [loading]);

  // Function to make sure all values sent to saveAnswers are defined.
  const clickSave = (
    answers: Map<string, string | boolean>,
    response: any,
    patient: IPatient | undefined,
    user:
      | fhirclient.FHIR.Patient
      | fhirclient.FHIR.Practitioner
      | fhirclient.FHIR.RelatedPerson
      | undefined,
    client: Client | undefined
  ) => {
    if (answers && response && patient && user && client) {
      saveAnswers(answers, response, patient, user, client);
    }
  };
  useEffect(() => {
    props.createHeader(questionnaire.title, questionnaire.description);
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
      <Hovedknapp
        onClick={() => clickSave(answers, response, patient, user, client)}
      >
        Lagre
      </Hovedknapp>

      <Hovedknapp
        className="buttons"
        onClick={() => console.log('Trykket på send')}
      >
        Send skjema
      </Hovedknapp>

      {/*This button is here temporarily to make it easy to save a questionnaire in the EHR launcer*/}
      <button onClick={() => saveQuestionnaire(client)}>Lagre et skjema</button>

      {console.log('A:', answers)}
    </>
  );
};
