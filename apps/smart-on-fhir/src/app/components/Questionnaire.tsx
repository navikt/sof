import React, { useState, useEffect } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = () => {
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
          onClick={() => saveAnswers(answers, response, patient, user)}
        >
          Lagre
        </Hovedknapp>

      {console.log('A:', answers)}
    </>
  );
};
