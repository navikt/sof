import React, { useEffect, useState } from 'react';
import {
  IQuestionnaire,
  Questionnaire_ItemTypeKind,
  QuestionnaireStatusKind,
  IBundle,
} from '@ahryman40k/ts-fhir-types/lib/R4';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponse.json';
import { Hovedknapp } from 'nav-frontend-knapper';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire = () => {
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const response = questionnaireResponse;
  const [questionnaireResult, setQuestionnaireResult] =
    useState<IQuestionnaire[]>();

  useEffect(() => {
    fetch('/api/Questionnaire')
      .then((response) => response.json())
      .then((bundle: IBundle) => {
        const questionnaires: IQuestionnaire[] = [];
        bundle.entry?.forEach((entry: any) => {
          questionnaires.push(entry.resource as IQuestionnaire);
        });
        console.log(bundle);
        setQuestionnaireResult(questionnaires);
      });
  }, []);

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
    console.log(response); // Logs the json file
  };

  return (
    <>
      {questionnaireResult ? (
        <>
          <p>Found the following questionnaires:</p>
          <ol>
            {console.log('Q', questionnaireResult)}
            {questionnaireResult[0].item?.map((entry) => {
              if (entry.linkId) {
                return (
                  <div key={entry.linkId}>
                    <p>{JSON.stringify(entry.text)}</p>
                    <ItemAnswer
                      linkId={entry.linkId}
                      answers={answers}
                      setAnswers={setAnswers}
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </ol>
        </>
      ) : (
        <p>No questionnaire responses found</p>
      )}
      <Hovedknapp button-general onClick={saveAnswers}>
        Lagre
      </Hovedknapp>
      {console.log('A:', answers)}
    </>
  );
};
