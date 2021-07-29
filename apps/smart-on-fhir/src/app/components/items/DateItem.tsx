import React, { FC, useState, useEffect } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { DatepickerItem } from './DatepickerItem';

/**
 * Renders a question with type Date
 * @returns a calendar (DatepickerItem) for user input
 */

const DateItem: FC<IItemProps> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
}) => {
  const optionList: string[] | undefined = answeroptions;
  const [dateList, setDateList] = useState<string[]>([]); // A (temporarily) list of the dates from the calendar input

  const checkDate = (param: string) => {
    console.log(
      'LinkID:',
      entity.linkId,
      'Lengden til dateList:',
      dateList.length
    );
    if (dateList.length === 1) {
      console.log(entity.linkId, 'Det er EN ting i dateList');
      console.log(dateList[0]);
    } else if (dateList.length === 2) {
      console.log(entity.linkId, 'Det er TO ting i dateList');
      let firstDate = new Date('2021-07-01');
      let secondDate = new Date(dateList[1]);
      console.log(firstDate);
      console.log(dateList[0]);
      console.log(secondDate);
      console.log(dateList[1]);
    }
  };

  useEffect(() => {
    // Updates the array of answers, format defined in answerToJson.ts
    const copiedAnswers = new Map(answers);
    // console.log('Skriver ut noe fra datoklassen', answers);
    copiedAnswers.set(entity.linkId, JSON.stringify(dateList));
    setAnswers(copiedAnswers);
    // console.log('Skriver ut noe fra datoklassen etter set Answers', answers);

    checkDate('nå må det faen meg gå');
  }, [dateList]);

  // When rendering for the first time:
  // set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    if (
      dateList.length === 0 &&
      answers.get(entity.linkId) &&
      typeof answers.get(entity.linkId) === 'string'
    ) {
      const temp: string = answers.get(entity.linkId) as string;
      setDateList(JSON.parse(temp));
    }
  }, []);

  return (
    <div className="componentItems">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="typo-element">{entity.text}</p>
        {
          // Checks for helptext, and displays if any
          helptext !== '' ? (
            <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
              {helptext}
            </Hjelpetekst>
          ) : (
            <></>
          )
        }
      </div>
      <div style={{ display: 'flex' }}>
        {optionList?.map((option: string, index: number) => {
          return (
            <div
              key={entity.linkId + index}
              style={{ display: 'block', margin: '10px' }}
            >
              <DatepickerItem
                index={index}
                text={option}
                dateList={dateList}
                setDateList={setDateList}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateItem;
