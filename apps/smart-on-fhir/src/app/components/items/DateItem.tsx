import React, { FC, useState, useEffect } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { DatepickerItem } from './DatepickerItem';

/**
 * Renders a question with type Date
 * @returns a calendar (DatepickerItem) for user input
 */

const DateItem: FC<IItemProps & savedType> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
  saved,
}) => {
  const optionList: string[] | undefined = answeroptions;
  const [dateList, setDateList] = useState<string[]>([]); // A (temporarily) list of the dates from the calendar input

  useEffect(() => {
    // Updates the array of answers, format defined in answerToJson.ts
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, JSON.stringify(dateList));
    setAnswers(copiedAnswers);
    //checkDate('nå må det faen meg gå');
  }, [dateList]);

  // When input is saved:
  // set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    //console.log('date');
    if (
      dateList.length === 0 &&
      answers.get(entity.linkId) &&
      typeof answers.get(entity.linkId) === 'string'
    ) {
      const temp: string = answers.get(entity.linkId) as string;
      setDateList(JSON.parse(temp));
    }
  }, [saved]);

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
        {optionList?.length !== 0 ? (
          optionList?.map((option: string, index: number) => {
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
          })
        ) : (
          <DatepickerItem
            // Midltertidig løsning, antar datoene lagres i listeformat
            index={0}
            text={''}
            dateList={dateList}
            setDateList={setDateList}
          />
        )}
      </div>
    </div>
  );
};

export default DateItem;
