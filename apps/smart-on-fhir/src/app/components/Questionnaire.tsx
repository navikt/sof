import React, { useState, useEffect } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import { saveQuestionnaire } from '../utils/saveQuestionnaire';
import {
  IPatient,
  IQuestionnaireResponse,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { fhirclient } from 'fhirclient/lib/types';
import Client from 'fhirclient/lib/Client';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = () => {
  const questionnaire = questionnairePleiepenger;
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { patient, user, client } = useFhirContext();
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

  return (
    <>
      {questions.map((item: any) => {
        return item.linkId.includes('automatic') ? null : (
          <div key={item.linkId}>
            {item.linkId.includes('help') ? (
              <p>
                {/* Foreløpig håndtering av hjelpetekst*/}
                {item.linkId} {item.text}
              </p>
            ) : item.linkId.includes('.') ? (
              <p>
                {/*Foreløpig håndtering av underspørsmål*/}
                {item.linkId} {item.text}
              </p>
            ) : (
              <h1 className="typo-undertittel">
                {/* Foreløpig håndtering av hovedspørsmål*/}
                {item.linkId} {item.text}
              </h1>
            )}
            {/* Svartyper */}
            <ItemAnswer
              question={item.text}
              linkId={item.linkId}
              answerType={item.type}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>
        );
      })}
      <Hovedknapp
        button-general
        onClick={() => clickSave(answers, response, patient, user, client)}
      >
        Lagre
      </Hovedknapp>

      {/*This button is here temporarily to make it easy to save a questionnaire in the EHR launcer*/}
      <button onClick={() => saveQuestionnaire(client)}>Lagre et skjema</button>

      {console.log('A:', answers)}
    </>
  );
};
