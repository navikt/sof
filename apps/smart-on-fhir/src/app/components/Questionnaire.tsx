import React, { useState } from 'react';
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

  const { patient, user } = useFhirContext();

  // TODO: flytte variablene til et annet komponent (QuestionnaireResponse)?
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(
    new Map()
  );
  const response = questionnaireResponse;

  // TODO: Rekursiv metode som itererer seg gjennom item-barna. FUNKER IKKE! :((
  const checkItemChildren = (result: any) => {
    if (!('item' in result)) {
      console.log('if', result.text, result.type);
      return;
    }
    console.log('CIC: ', result.item);
    return checkItemChildren(result.item);
  };

  //console.log('answers: ', answers);

  //checkItemChildren(questionnaire);

  return (
    <>
      {questionnaire.item.map((value) =>
        value.linkId.includes('automatic') ? null : (
          <div key={value.linkId}>
          {' '}
          {/*Hovedspørsmål*/}
          <p className="typo-undertittel">{value.text}</p>
          <p className="typo-element">{value.text}</p>
          {/* TODO: Trekke ut <ItemAnswer/> til flere komponenter basert på ønsket inputtype */}
          {value.item ? (
            <>
              {console.log('Children: ', value.item)}
              {value.item.map((data: any) => (
                <>
                  <p className="typo-normal">{}</p>{' '}
                  {/*Beskrivende/hjelpetekst/undergrupperte spm*/}
                  <p className="typo-normal">{data.text}</p>{' '}
                  {/*Beskrivende/hjelpetekst*/}
                  <ItemAnswer
                    question={data.text}
                    linkId={data.linkId}
                    answerType={data.type}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                </>
              ))}
            </>
          ) : null}
          {/*Svartyper*/}
          <ItemAnswer
            question={value.text}
            linkId={value.linkId}
            answerType={value.type}
            answers={answers}
            setAnswers={setAnswers}
          />
        </div>
        )
      )}
      {
        // TODO: Flytte metoden til et annet komponent (QuestionnaireResponse)?
        <Hovedknapp
          button-general
          onClick={() => saveAnswers(answers, response, patient, user)}
        >
          Lagre
        </Hovedknapp>
      }
      {/*console.log('A:', answers)*/}
    </>
  );
};
