import React, { FC, useState, useEffect } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { DatepickerItem } from './DatepickerItem';

interface IProps {
  entity: any;
  helptext: string;
  answeroptions: string[];
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

const DateItem: FC<IProps> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
}) => {
  const optionList: string[] = answeroptions;
  const [dateList, setDateList] = useState<string[]>([]);

  useEffect(() => {
    // // Formaterer listen slik at inputsvarene kan tolkes av answerToJson.ts
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, '[' + dateList.toString() + ']');
    setAnswers(copiedAnswers);
  }, [dateList]);

  return (
    <div className="componentItems">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="typo-element">{entity.text}</p>
        {
          // Håndterer hjelpetekst ved behov
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
