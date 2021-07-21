import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import questionnairePleiepenger from '../json-files/questionnairePleiepenger.json';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Undertittel } from 'nav-frontend-typografi';

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
              <div>
                {/* Foreløpig håndtering av hovedspørsmål*/}
                <span
                  className="typo-undertittel"
                  id="mitt-faguttrykk"
                  aria-describedby="min-hjelpetekst"
                >
                  {item.text}
                </span>
                <Hjelpetekst
                  id="min-hjelpetekst"
                  aria-labelledby="mitt-faguttrykk"
                  style={{ marginLeft: ' 10px' }}
                >
                  Mulighet til å jobbe litt eller delvis
                </Hjelpetekst>
              </div>
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
