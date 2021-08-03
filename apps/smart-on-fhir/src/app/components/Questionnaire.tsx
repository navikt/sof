import React, { useState, useEffect, FC } from 'react';
import { ItemAnswer } from './ItemAnswer';
import { Hovedknapp } from 'nav-frontend-knapper';
import { saveAnswers } from '../utils/answersToJson';
import { useFhirContext } from '../context/fhirContext';
import './questionnaireStylesheet.css';
import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4';
import { getAnswersFromServer } from '../utils/setAnswersFromServer';
import { useParams } from 'react-router-dom';
import { chooseQuestionnaire } from '../utils/setQuestionnaireContext';

type callFromApp = {
  createHeader: (title: string, description: string) => void;
  loadingQuestionnaire: boolean;
  setLoadingQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>;
};

type questionnaireTypeParams = {
  questionnaireType: string;
};

/**
 * Questionnaire is a component that renders a querstionnaire.
 * @returns The questionnaire containing all questions with input fields.
 */
export const Questionnaire: FC<callFromApp> = (props) => {
  const { questionnaireType } = useParams<questionnaireTypeParams>();
  const [questions, setQuestions] = useState<any[]>([]);
  const {
    patient,
    user,
    client,
    questionnaire,
    questionnaireResponse,
    setQuestionnaire,
    setQuestionnaireResponse,
  } = useFhirContext();
  const [answers, setAnswers] = useState<Map<string, string | boolean>>(
    new Map()
  );
  const [saved, setSaved] = useState(false);
  const [disableSendBtn, setDisableSendBtn] = useState(true);

  useEffect(() => {
    if (client) {
      props.setLoadingQuestionnaire(true);
      chooseQuestionnaire(
        questionnaireType,
        '1.0.0',
        setQuestionnaire,
        client,
        props.setLoadingQuestionnaire,
        setQuestionnaireResponse
      );
    }
  }, []);

  // This will be called when the questionnaire is opened, and sets
  // answers to the answers allready saved on the server (if there are any).
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
      if (!questions.includes(itemChild)) {
        setQuestions((prevState) => [...prevState, itemChild]);
        if (itemChild && typeof itemChild === 'object') {
          getItemChildren(itemChild);
        }
      }
    });
  };

  // Saves questions from Questionnaire to the questions list when questionnaire is updated
  useEffect(() => {
    if (questionnaire) {
      setQuestions([]); // Reset questions so that new ones can be added
      getItemChildren(questionnaire);
    }
  }, [questionnaire]);

  // Function to make sure all values sent to saveAnswers are defined.
  const handleOnClick = (e: any) => {
    if (
      answers &&
      questionnaireResponse &&
      patient &&
      user &&
      client &&
      questionnaire
    ) {
      saveAnswers(
        answers,
        questionnaireResponse,
        patient,
        user,
        client,
        questionnaire,
        e.target.id.toLowerCase() // Information about which button is clicked on
      );
    }
  };

  // Set header and description
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
      {!props.loadingQuestionnaire
        ? questions.map((item: any) => {
            return displayQuestion(item);
          })
        : null}
      {!props.loadingQuestionnaire ? (
        <>
          <Hovedknapp
            className="buttons"
            id="btnSave"
            onClick={(e: any) => {
              handleOnClick(e);
              setSaved(true);
              setDisableSendBtn(false);
            }}
          >
            Lagre
          </Hovedknapp>

          <Hovedknapp
            className="buttons"
            id="btnSend"
            onClick={(e: any) => {
              handleOnClick(e);
              setDisableSendBtn(true);
            }}
            disabled={disableSendBtn}
          >
            Send skjema
          </Hovedknapp>
        </>
      ) : null}
      {console.log('A', answers)}
    </>
  );
};
