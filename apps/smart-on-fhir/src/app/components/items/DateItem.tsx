import React, { FC, useState, useEffect } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { DatepickerItem } from './DatepickerItem';
import { string } from 'prop-types';

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
  const [dateList, setDateList] = useState<string[][]>([]);
  // ^^ A list containing the dates inputed. Is on the format
  // [[yyyy-mm-dd, yyyy-mm-dd], [...], ...] where the first element
  // in an inner list is typically a start date, and the last is an end date,
  // but there can be more elements as well. The end date is often optional.

  useEffect(() => {
    // Update answers with new date
    const copiedAnswers = new Map(answers);

    if (answeroptions && answeroptions.length > 0) {
      // if there are several date inputs (e.g. start, end etc in a group),
      // make one list for each input (because it should, for example, be possible
      // to add several start dates), and save it separatley in answers.
      for (let i = 0; i < answeroptions.length; i++) {
        let tempList: string[] = [];
        dateList.forEach((innerList) => {
          tempList.push(innerList[i]);
        });
        copiedAnswers.set(
          entity.linkId + '.' + (i + 1),
          JSON.stringify(tempList)
        );
      }
    } else {
      copiedAnswers.set(entity.linkId, JSON.stringify(dateList));
    }
    setAnswers(copiedAnswers);
  }, [dateList]);

  // When input is saved:
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
