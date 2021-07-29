import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import questionnaireResponse from '../json-files/questionnaireResponsePleiepenger.json';
import { Hovedknapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import { IPatient, IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import { fhirclient } from 'fhirclient/lib/types';
import Client from 'fhirclient/lib/Client';
import { getAnswersFromServer } from '../utils/setAnswersFromServer';

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */

type callFromApp = {
  createHeader: (title: string, description: string) => void;
};

export const Questionnaire: FC<callFromApp> = (props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { patient, user, client, questionnaire } = useFhirContext();
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(
    new Map()
  );
  const response = questionnaireResponse;
  const [saved, setSaved] = useState(false);

  // This will be called when the questionnaire is opened, and sets
  // answers to the answers allready saved ont he server (if there are any).
  useEffect(() => {
    if (client && patient && questionnaire) {
      getAnswersFromServer(
        client,
        patient,
        setAnswers,
        questionnaire,
        setSaved
      );
    } else {
      null;
    }
  }, []);

  // Get the items from the Questionnaire
  const getItemChildren = (q: IQuestionnaire) => {
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
    questionnaire ? getItemChildren(questionnaire) : null;
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
    client: Client | undefined,
    questionnaire: IQuestionnaire | undefined
  ) => {
    if (answers && response && patient && user && client && questionnaire) {
      saveAnswers(answers, response, patient, user, client, questionnaire);
    }
  };

  useEffect(() => {
    if (questionnaire && questionnaire.description && questionnaire.title) {
      props.createHeader(questionnaire.title, questionnaire.description);
    }
  }, [questionnaire]);

  const displayQuestion = (item: any) => {
    let mainItem: any;
    let subItems: any[] = [];
    let options: answerOptionType[] = [];
    if (
      !item.linkId.includes('automatic') &&
      !item.linkId.includes('help') &&
      !item.linkId.includes('.')
    ) {
      mainItem = item;
      //If question (item) has an item-array
      if (item.item !== undefined) {
        item.item.map((entityItem: any) => {
          subItems.push(entityItem);
        });
      } else if (item.answerOption) {
        item.answerOption.map((option: any) => {
          options.push(option);
        });
      }

      return (
        <ItemAnswer
          entity={mainItem}
          entityItems={subItems}
          optionItems={options}
          answers={answers}
          setAnswers={setAnswers}
          saved={saved}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    //Itererer gjennom alle spørsmålene (spørsmål = item) og filtrerer på spørsmålenes linkId.
    //Hovedspørsmålet legges som mainItem, og det tilhørende item-arrayet, eller answerOption,
    //pushes inn i subItems.
    <>
      {questions.map((item: any) => {
        return displayQuestion(item);
      })}
      <Hovedknapp
        onClick={() => {
          clickSave(answers, response, patient, user, client, questionnaire);
          setSaved(true);
        }}
      >
        Lagre
      </Hovedknapp>

      <Hovedknapp
        className="buttons"
        onClick={() => console.log('Trykket på send')}
      >
        Send skjema
      </Hovedknapp>
      {console.log(answers)}
    </>
  );
};
