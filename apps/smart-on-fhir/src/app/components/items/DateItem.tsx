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
  const [dateList, setDateList] = useState<string[]>([]);

  useEffect(() => {
    // Updates the array of answers, format defined in answerToJson.ts
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, '[' + dateList.toString() + ']');
    setAnswers(copiedAnswers);
  }, [dateList]);

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
                answers={answers}
                entity={entity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateItem;